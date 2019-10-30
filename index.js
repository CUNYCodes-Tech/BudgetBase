// -----------------------------------------------------------------------------------------
// External Dependencies
// -----------------------------------------------------------------------------------------
const express       = require('express');
const app           = express();
const bodyParser    = require('body-parser');
const mongoose      = require('mongoose');
const jwt           = require('jwt-simple');
const cors          = require('cors');
const passport      = require('passport');
const JwtStrategy   = require('passport-jwt').Strategy;
const ExtractJwt    = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const https         = require('https');

// -----------------------------------------------------------------------------------------
// Internal Dependencies
// -----------------------------------------------------------------------------------------
const User        = require('./models/user');
const Transaction = require('./models/transaction');
const Budget      = require('./models/budget');
if(process.env.NODE_ENV !== 'production') require('dotenv/config');
const keys = require('./config/keys');

// -----------------------------------------------------------------------------------------
// Middlewares
// -----------------------------------------------------------------------------------------
app.use(bodyParser.json());
app.use(cors());

const requireAuth   = passport.authenticate('jwt', { session: false});
const requireSignin = passport.authenticate('local', { session: false });

// -----------------------------------------------------------------------------------------
// MongoDB Setup
// -----------------------------------------------------------------------------------------
mongoose.connect(keys.mongoURI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true
});

mongoose.set('useFindAndModify', false); // Must add this to fix deprecation warning

// -----------------------------------------------------------------------------------------
// Authentication API
// -----------------------------------------------------------------------------------------
app.get('/api', (req, res, next) => {
  res.send('Welcome to the Budgetbase API.');
});

app.post('/api/signup', (req, res, next) => {
  const firstName   = req.body.firstName;
  const lastName    = req.body.lastName;
  const email       = req.body.email;
  const password    = req.body.password;
  const dateOfBirth = req.body.dateOfBirth;
  const balance     = req.body.balance;

  if (!firstName || !lastName || !email || !password || !dateOfBirth || !balance) {
    return res.status(422).send({ error: 'Please fill all fields!' });
  }

  User.findOne({ email: email }, (err, existingUser) => {
    if (err) return next(err);
    if (existingUser) return res.status(422).send({ error: 'Email is in use!' });

    const newUser = new User({
      firstName  : firstName,
      lastName   : lastName,
      email      : email,
      password   : password,
      dateOfBirth: dateOfBirth,
      balance    : balance
    });

    newUser.save(err => {
      if (err) return next(err);
      res.json({ token: tokenForUser(newUser) });
    });
  });
});

app.post('/api/signin', requireSignin, (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
});
// -----------------------------------------------------------------------------------------
// Budget API
// -----------------------------------------------------------------------------------------
app.post('/api/budget/create', requireAuth, (req, res, next) => {
  const name = req.body.name;
  const amount = req.body.cost;

  const newBudget = new Budget({
    name: name,
    amount: amount,
    user: req.user._id
  });

  const userUpdate = { ...req.user._doc , balance: req.user.balance - amount };

  newBudget.save(err => {
    if (err) next(err);
    User.findOneAndUpdate({ _id: req.user.id }, userUpdate, (err2, results) => {
      if (err2) next(err2);
      res.json({ success: true });
    })
  }); 

})

app.get('/api/budget/', requireAuth, (req, res, next) => {
    Budget.find({ user: req.user._id }, (err, results) => {
      if (err) next(err);
      res.json(results);
      // res.json( {success: true });
    });
})

// -----------------------------------------------------------------------------------------
// Transaction API
// -----------------------------------------------------------------------------------------
app.post('/api/transaction/create', requireAuth, (req, res, next) => {
  const createdAt   = req.body.createdAt;
  const cost        = req.body.cost;
  const category    = req.body.category;
  const name        = req.body.name;
  const paymentType = req.body.paymentType;
  const budgetType  = req.body.budgetType;
  const budgetId    = req.body.budgetId;

  const newTransaction = new Transaction({
    name: name,
    createdAt: createdAt,
    cost: cost,
    category: category,
    user: req.user._id,
    paymentType: paymentType,
    budgetType: budgetType,
    budgetId: budgetId
  });

  const userUpdate = { ...req.user._doc, balance: req.user.balance - cost };
  newTransaction.save(err => {
    if (err) next(err);
    User.findOneAndUpdate({ _id: req.user._id }, userUpdate, (err2, results) => {
      if (err2) next(err2);
      res.json({ success: true });
    })
  });
});

app.get('/api/transaction/all', requireAuth, (req, res, next) => {
  Transaction.find({ user: req.user._id }, (err, results) => {
    if (err) next(err);
    res.json(results);
  });
});

app.delete('/api/transaction/delete/:id', requireAuth, (req, res, next) => {
  const userUpdate = { ...req.user._doc, balance: req.user.balance + req.body.cost };

  Transaction.deleteOne({ _id: req.params.id }, (err, results) => {
    if (err) next(err);

    User.findOneAndUpdate({ _id: req.user._id }, userUpdate, (err2) => {
      if (err2) next(err2);
      res.json({ success: true });
    });
  });
});

app.put('/api/transaction/update/:id', requireAuth, (req, res, next) => {
  Transaction.findOneAndUpdate({ _id: req.params.id }, req.body, (err, results) => {
    if (err) next(err);

    const originalCost = results.cost;
    const updatedCost  = req.body.cost;
    const userUpdate   = { ...req.user._doc, balance: req.user.balance + (originalCost - updatedCost) }

    User.findOneAndUpdate({ _id: req.user._id }, userUpdate, err2 => {
      if (err2) next(err2);

      res.json({ success: true });
    })
  });
});

// -----------------------------------------------------------------------------------------
// User API
// -----------------------------------------------------------------------------------------
app.get('/api/user', requireAuth, (req, res) => {
  res.send({ user: req.user.firstName });
})

app.get('/api/user/balance', requireAuth, (req, res) => {
  res.json(req.user.balance);
})

app.put('/api/user/update', requireAuth, (req, res, next) => {
  const update = { ...req.user._doc, ...req.body };

  User.findOneAndUpdate({_id: req.user._id}, update, (err, results) => {
    if (err) next(err);

    res.json({ success: true });
  });
});


app.put('/api/user/addbalance', requireAuth, (req, res, next) => {
  const newBalance = req.user.balance + parseInt(req.body.balance, 10);
  const userUpdate = { ...req.user._doc, balance: newBalance };

  const newTransaction = new Transaction({
    name: "Balance addition",
    createdAt: new Date,
    cost: req.body.balance,
    category: req.body.category,
    user: req.user._id,
    paymentType: null,
    budgetType: null,
    budgetId: null
  })

  console.log(req.body.category);
  
  // User.findOneAndUpdate({ _id: req.user.id }, userUpdate, (err, obj) => {
  //   if (err) next(err);
  //   res.json({ success: true });
  // });
  
  // const userUpdate = { ...req.user._doc, balance: newBalance }; 

  newTransaction.save(err => {
    if (err) next(err);
    User.findOneAndUpdate({ _id: req.user._id }, userUpdate, (err2, results) => {
      if (err2) next(err2);
      res.json({ success: true });
    })
  }); 
 
  // User.findOneAndUpdate({ _id: req.user.id }, userUpdate, (err, obj) => {
  //   if (err) next(err);
  //   res.json({ success: true });
  // });
});


// -----------------------------------------------------------------------------------------
// budget
// -----------------------------------------------------------------------------------------
app.post('/api/budget/create', requireAuth, (req, res, next) => {
  const name = req.body.name;
  const amount = req.body.amount;
  const userId = req.user.id;

  if(!name || !amount || !userId) {
    return res.status(422).send({error: 'Please fill all fields'});
  }

  Budget.findOne({name: name}, (err, existingBudget) =>{
    if(err) next(err);
    if(existingBudget) return res.status(422).send({error: 'You already have a budget under this name'});
    const userUpdate = {...req.user._doc, balance: req.user.balance - amount};

    newBudget = new Budget({
      name: name,
      amount: amount,
      userId: userId
    });

    newBudget.save(err =>{
      if(err) next(err);
      User.findOneAndUpdate({_id: req.user._id}, userUpdate, (err2) => {
        if(err2) next(err2);
        res.json({success:true});
      });
    });
  });

  
});

// -----------------------------------------------------------------------------------------
// JWT Strategy
// -----------------------------------------------------------------------------------------
function tokenForUser(user) {
  const timestamp = new Date().getTime();

  return jwt.encode({ sub: user.id, iat: timestamp }, keys.jwtSecret);
}

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: keys.jwtSecret   
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload.sub, (err, user) => {
    if (err) return done(err, false);

    if (user) done(null, user);
    else      done(null, false);
  });
});

passport.use(jwtLogin);

// -----------------------------------------------------------------------------------------
// Local Strategy
// -----------------------------------------------------------------------------------------
const localOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  User.findOne({ email: email }, (err, user) => {
    if (err)   return done(err);
    if (!user) return done(null, false);

    user.comparePassword(password, (err, isMatch) => {
      if (err)      return done(err);
      if (!isMatch) return done(null, false);
      return done(null, user);
    });
  });
});

passport.use(localLogin);

// -----------------------------------------------------------------------------------------
// Heroku Setup
// -----------------------------------------------------------------------------------------
if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets. (e.g. main.js, or main.css)
  app.use(express.static('client/build'));

  // Express will serve up the index.html if it doesn't recognize the route.
  const path = require('path');

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

setInterval(function() {
  https.get("https://budgetbase.herokuapp.com");
}, 300000);

// -----------------------------------------------------------------------------------------
// Port Setup
// -----------------------------------------------------------------------------------------
const port = process.env.PORT || 5000;
app.listen(port);
console.log('Server is up and listening on port:', port);