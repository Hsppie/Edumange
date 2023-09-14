const mongoose = require("mongoose");

const studentSchema = mongoose.Schema(
    {
        firstname:{type: String, required: true},
        lastname: {type: String, required: true},
        birthDate:{type: String, required: true},
        gender:{ type: String },
        admision: { type: String },
        semester: { type: String},
        course: {type: Schema.Types.ObjectId, ref: 'courses'},
        fees: {type: Schema.Types.ObjectId, ref: 'fees'},
        address:{
            contact:{type:String, required: true},
            email:{type: String, unique:true, required: true},
        }
    }
);

const Student = mongoose.model('students', studentSchema);
module.exports = Student;