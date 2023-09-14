const mongoose = require('mongoose');

/// fees Schema


const feeSchema = mongoose.Schema({
    amount: { type: Number},
    dueDate: {type: String}
});
module.exports = mongoose.model('fees', feeSchema);