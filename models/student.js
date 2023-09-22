const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
    {
        //_id: { type: String },
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        birthDate: { type: String, required: true },
        gender: { type: String },
        admision: { type: String },
        semester: { type: String },
        //photo: { type: String, required: true},
        course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'courses' },
        fees_id: { type: mongoose.Schema.Types.ObjectId, ref: 'fees' },
        address: {
            contact: { type: String },
            email: { type: String, unique: true },
        }
    }
);

const Student = mongoose.model('students', studentSchema);
module.exports = Student;