const mongoose = require('mongoose');

/// books schema

const bookSchema = mongoose.Schema({
    _id: {type: String, unique: true},
    title :{ type:String },
    author:{ type: String},
    isbn: { type: String },
    categoryId: {type: mongoose.Schema.Types.ObjectId, ref: 'bookCategory'}
});

module.exports = mongoose.model('book', bookSchema);