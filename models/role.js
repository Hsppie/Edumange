const mongoose = require('mongoose');

//// roles schema


const roleSchema = mongoose.Schema({
    _id: {type: String, unique: true},
    roleName: { type: String}
});

const Role = mongoose.model('role', roleSchema);
module.exports = Role;