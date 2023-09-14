const mongoose = require('mongoose');

/// books schema

const bookCategorySchema = mongoose.Schema({
    _id: {type: String, unique: true},
    catName :{ type:String }
});

module.exports = mongoose.model('bookCategory', bookCategorySchema);