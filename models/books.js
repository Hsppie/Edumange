const mongoose = require('mongoose');

/// books schema

const bookSchema = new mongoose.Schema({
    // _id: {type: String, unique: true},
    title: { type: String },
    publishedyear: { type: Date },
    author: { type: String },
    isbn: { type: String },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'bookCategory' }
});

const Book = mongoose.model('book', bookSchema);
module.exports = Book;