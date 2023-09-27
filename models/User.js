const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: { type: mongoose.Schema.Types.ObjectId, ref: 'staff' },
    username: { type: String },
    password: { type: String },
    role: { type: String }
});

const User = mongoose.model('user', userSchema);
module.exports = User;