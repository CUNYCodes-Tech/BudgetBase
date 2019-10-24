const mongoose = require('mongoose');


const budgetSchema = new mongoose.Schema({
    name: String, 
    amount: Number, 
    userId: mongoose.Schema.Types.ObjectId
});


const Budget = mongoose.model('Budget', budgetSchema);

module.exports = Budget;