const mongoose = require('mongoose');

/// books schema

const bookCategorySchema = mongoose.Schema({
    _id: {type: String, unique: true},
    catName :{ type:String }
});

const BookCategory =  mongoose.model('bookCategory', bookCategorySchema);
module.exports = BookCategory;