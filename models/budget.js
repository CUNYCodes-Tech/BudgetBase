const mongoose = require('mongoose');


const budgetSchema = new mongoose.Schema({
    name: String, 
    amount: Number, 
    user: {type: mongoose.Schema.Types.ObjectId, ref : 'User'}
});


const Budget = mongoose.model('Budget', budgetSchema);

module.exports = Budget;