const mongoose = require("mongoose");

/// course units

const courseUnitsSchema = new mongoose.Schema({
    _id: { type: String, unique: true },
    unitname: {type: String},
    academicYear: {type: String},
    semster: {type: Number, default: 0},
    courseId: [ { type: mongoose.Schema.Types.ObjectId, ref: 'courses'}]
});

const CourseUnits = mongoose.model('courseUnits', courseUnitsSchema);
module.exports = CourseUnits;