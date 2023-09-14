const mongoose = require("mongoose");

/// course units

const courseUnitsSchema = mongoose.Schema({
    _id: { type: String, unique: true },
    unitname: {type: String},
    academicYear: {type: String},
    semster: {type: Number, default: 0},
    courseId: [ { type: mongoose.Schema.Types.ObjectId, ref: 'courses'}]
});

module.exports = mongoose.model('courseUnits', courseUnitsSchema);
