const mongoose = require('mongoose');

//// roles schema


const roleSchema = mongoose.Schema({
    _id: {type: String, unique: true},
    roleName: { type: String}
});
module.exports= mongoose.model('role', roleSchema);