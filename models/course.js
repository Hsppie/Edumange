const { Schema, Model, default: mongoose } = require("mongoose");


// courses

const courseSchema = new Schema({
    _id: {type: String, unique: true},
    name: {type: String},
    description: { type: String},
    creditHours: { type: Number},
    courseUnits_id: [{type: mongoose.Schema.Types.ObjectId, ref: 'courseUnits'}]
});

module.exports = mongoose.model('courses', courseSchema)