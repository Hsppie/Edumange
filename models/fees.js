const mongoose = require('mongoose');

/// fees Schema


const feeSchema = new mongoose.Schema({
    amount: { type: Number },
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'courses' },
});


const Fees = mongoose.model('fees', feeSchema);
module.exports = Fees;