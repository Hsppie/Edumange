const mongoose = require('mongoose');

/// fees Schema


const feeSchema = new mongoose.Schema({
    amount: { type: Number},
    dueDate: {type: String}
});


const Fees = mongoose.model('fees', feeSchema);
module.exports = Fees;