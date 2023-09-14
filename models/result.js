const mongoose = require('mongoose');

// marks schema

const  markSchema = mongoose.Schema({
    marks: {type: number},
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'courses'},
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'courses'},
    courseUnitsId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'courseUnits'}],

});

module.exports = mongoose.model('marks', markSchema);