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
const moment        = require("moment");
const plaid         = require("plaid");

// -----------------------------------------------------------------------------------------
// Internal Dependencies
// -----------------------------------------------------------------------------------------
const User        = require('./models/user');
const Transaction = require('./models/transaction');
const Budget      = require('./models/budget');
const Account     = require('./models/account');
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
// Plaid Setup
// -----------------------------------------------------------------------------------------

const PLAID_CLIENT_ID = "5dc5aac7f546b50014c19ade";
const PLAID_SECRET = "5741237b7f9875a0d01bfd42b261ed";
const PLAID_PUBLIC_KEY = "838c02e0848a46a9b525b5e2d658e6";

const client = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  plaid.environments.sandbox,
  { version: "2018-05-22" }
);

let PUBLIC_TOKEN = null;
let ACCESS_TOKEN = null;
let ITEM_ID      = null;

// -----------------------------------------------------------------------------------------
// Plaid API
// -----------------------------------------------------------------------------------------

// @route POST api/plaid/accounts/add
// @desc Trades public token for access token and stores credentials in database
// @access Private
app.post('/api/plaid/accounts/add', requireAuth, (req, res) => {
  PUBLIC_TOKEN      = req.body.public_token;
  const userId      = req.user.id;
  const institution = req.body.metadata.institution;
  
  const { name, institution_id } = institution;
  if (PUBLIC_TOKEN) {
    client.exchangePublicToken(PUBLIC_TOKEN)
      .then(exchangeResponse => {
        ACCESS_TOKEN = exchangeResponse.access_token;
        ITEM_ID = exchangeResponse.item_id;
        Account.findOne({ userId: req.user.id, institutionId: institution_id })
          .then(account => {
            if (account) { console.log("Account already exists"); }
            else {
              const newAccount = new Account({
                userId: userId,
                accessToken: ACCESS_TOKEN,
                itemId: ITEM_ID,
                institutionId: institution_id,
                institutionName: name
              });
              newAccount.save().then(account => res.json(account));
            }
          })
          .catch(err => console.log(err)); // Mongo Error
      })
      .catch(err => console.log(err)); // Plaid Error
  }
});


app.get('/api/plaid/accounts/', requireAuth, (req, res) => {
  Account.find({ userId: req.user.id})
  .then(accounts => res.json(accounts))
  .catch(err => console.log(err));
})

app.post('/api/plaid/accounts/transactions', requireAuth, (req, res) => {
  const now = moment();
  const today = now.format("YYYY-MM-DD");
  const thirtyDaysAgo = now.subtract(30, "days").format("YYYY-MM-DD"); // Change this if you want more transactions
  
  let transactions = [];

  const accounts = req.body.accounts;
  if (accounts) {
    accounts.forEach(function(account) {
      ACCESS_TOKEN = account.accessToken;
      const institutionName = account.institutionName;

      client.getTransactions(ACCESS_TOKEN, thirtyDaysAgo, today)
        .then(response => {
          transactions.push({
            accountName: institutionName,
            transactions: response.transactions
          });

          if (transactions.length === accounts.length) {
            res.json(transactions);
          }
        })
        .catch(err => console.log(err));
    });
  }
});



app.delete('/api/plaid/accounts/delete/:id', requireAuth, (req, res) => {
  Account.findById({ _id: req.params.id})
  .then(accounts => {
    Account.remove().then(() => res.json({success: true}));
  })
  .catch(err => console.log(err));
})


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
// Transaction API
// -----------------------------------------------------------------------------------------
app.post('/api/transaction/create', requireAuth, (req, res, next) => {
  const createdAt   = req.body.createdAt;
  const cost        = parseInt(req.body.cost, 10);
  const category    = req.body.category;
  const name        = req.body.name;
  const paymentType = req.body.paymentType;
  const budgetId    = req.body.budgetId;

  const newTransaction = new Transaction({
    name: name,
    createdAt: createdAt,
    cost: cost,
    category: category,
    user: req.user._id,
    paymentType: paymentType,
    budgetId: budgetId
  });

  if (req.body.budgetId === null){
    const userUpdate = { ...req.user._doc, balance: req.user.balance - cost};
    newTransaction.save(err => {
      if (err) next(err);
      User.findOneAndUpdate({ _id: req.user._id }, userUpdate, (err2, results) => {
        if (err2) next(err2);
        res.json({ success: true });
      })
    });
  } else {
    Budget.findOne({_id: budgetId}, (err, results) => {
      if (err) next (err);
      Budget.findOneAndUpdate({_id: budgetId}, { currentAmount : results.currentAmount - cost} , err2 =>{
        if (err2) next(err2);
        newTransaction.save(err3 => {
          if (err3) next(err3);
          res.json({ success: true })
        });
      })
    })
  }
});

app.get('/api/transaction/all', requireAuth, (req, res, next) => {
  Transaction.find({ user: req.user._id }, null, {sort: "-createdAt"}, (err, results) => {
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

app.get('/api/transactions/filter/:budgetId', requireAuth, (req, res, next) => {
  Transaction.find({ budgetId: req.params.budgetId }, (err, results) => {
    if (err) next(err);
    res.json(results);
  });
})

// -----------------------------------------------------------------------------------------
// User API
// -----------------------------------------------------------------------------------------
app.get('/api/user', requireAuth, (req, res) => {
  res.send(req.user);
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
  const userUpdate = { ...req.user._doc, balance: newBalance , name: req.body.name};

  const newTransaction = new Transaction({
    name: req.body.name,
    createdAt: new Date,
    cost: req.body.balance,
    category: req.body.category,
    user: req.user._id,
    paymentType: null,
    budgetType: "Balance Addition",
    budgetId: null
  })

  newTransaction.save(err => {
    if (err) next(err);
    User.findOneAndUpdate({ _id: req.user._id }, userUpdate, (err2, results) => {
      if (err2) next(err2);
      res.json({ success: true });
    })
  });
});


// -----------------------------------------------------------------------------------------
// Budget API
// -----------------------------------------------------------------------------------------
app.post('/api/budget/create', requireAuth, (req, res, next) => {
  const name = req.body.name;
  const amount = parseInt(req.body.amount, 10);

  Budget.find({ user: req.user.id }, (err, result) => {
    if (result.length >= 3) { 
      res.status(422).send({error: "Max budget limit reached."});
    }
  });

  Budget.findOne({ name: name, _id: req.user.id }, (foundErr, existingBudget)=>{
    if(foundErr) next(foundErr);
    if(existingBudget) return res.status(422).send({error: "you already had a budget under this name"});
    const newBudget = new Budget({
      name: name,
      amount: amount,
      currentAmount: amount,
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
  });
})

app.get('/api/budget/', requireAuth, (req, res, next) => {
    Budget.find({ user: req.user._id }, (err, results) => {
      if (err) next(err);
      res.json(results);
    });
})

app.delete('/api/budget/delete/:id', requireAuth, (req, res, next) => {
  Budget.find({_id: req.params.id}, (err,results) => {
    if (err) next (err);
    const userUpdate = { ...req.user._doc, balance: req.user.balance + results[0].currentAmount};
    Budget.deleteOne({_id: req.params.id}, err2 => {
      if (err2) next (err2);
      User.findOneAndUpdate({ _id: req.user._id }, userUpdate, (err3) => {
        if (err3) next(err3);
        res.json({ success: true });
      });
    })
  })
});
app.put('/api/budget/update/:id', requireAuth, (req, res, next) => {
  Budget.find({_id: req.params.id}, (err1, results) => {
    if (err1) next (err1);
    const originalCurrentAmount  = results[0].currentAmount;
    Budget.findByIdAndUpdate({_id: req.params.id}, req.body, err2 => {
      if (err2) next (err2);

      const newName = req.body.name;
      const newAmount = req.body.amount;
      
      Budget.findOneAndUpdate({_id: req.params.id}, {currentAmount: newAmount}, {amount : newAmount} , err3 =>{
          if (err3) next(err3);
          
      })
      const userUpdate = {...req.user._doc, balance: req.user.balance + (originalCurrentAmount - newAmount), name: newName}
      User.findOneAndUpdate({ _id: req.user._id}, userUpdate, err4 => {
        if (err4) next(err4);
      })
    })
    res.json({ success: true })
  })
  
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

// setInterval(function() {
//   https.get("https://budgetbase.herokuapp.com");
// }, 300000);

// -----------------------------------------------------------------------------------------
// Port Setup
// -----------------------------------------------------------------------------------------
const port = process.env.PORT || 5000;
app.listen(port);
console.log('Server is up and listening on port:', port);