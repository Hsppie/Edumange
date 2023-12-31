const mongoose = require("mongoose");


// staff table or schema
const StaffSchema = new mongoose.Schema(
    {
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        birthDate: { type: Date },
        gender: { type: String },
        //image: { type: String, required: true },
        Status: { type: String, required: true },
        job: {
            title: { type: String, require: true },
            supervisor: { type: String },
            department: { type: String },
            WorkLocation: { type: String },
            StartDate: { type: Date },

        },
        address: {
            streetAddress: { type: String },
            city: { type: String },
            Country: { type: String },
            emailAddress: { type: String, unique: true },
            contact: { type: String }
        },
        role_id: { type: mongoose.Schema.Types.ObjectId, ref: 'role' }
    },
    { timestamps: true }
);

const Staff = mongoose.model('staff', StaffSchema);
module.exports = Staff;