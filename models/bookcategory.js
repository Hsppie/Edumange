const mongoose = require('mongoose');

/// books schema

const bookCategorySchema = new mongoose.Schema({
    //_id: { type: String, unique: true },
    catName: { type: String }
    //book_id: [ { type: mongoose.Schema.Types.ObjectId, ref: 'book' } ]
});

module.exports = mongoose.model('bookCategory', bookCategorySchema);