const { Schema, Model, default: mongoose } = require("mongoose");


// courses

const courseSchema = new mongoose.Schema({
    //_id: {type: String, unique: true},
    courseName: { type: String },
    description: { type: String },
    creditHours: { type: String },
    courseUnits_id: [ { type: mongoose.Schema.Types.ObjectId, ref: 'courseUnits' } ]
});

const Course = mongoose.model('courses', courseSchema);
module.exports = Course;