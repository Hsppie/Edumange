const mongoose = require('mongoose');

// Library Transaction schema
const liTtransactionSchema = new Schema({
    studentId: {type: mongoose.Schema.Types.ObjectId, ref: 'student'},
    bookId:{type: mongoose.Schema.Types.ObjectId, ref: 'book'},
    checkOutDate: {type: String},
    returnDate:  { type: String}
});


const LibraryTransaction = mongoose.model('lib', liTtransactionSchema);
module.exports = LibraryTransaction;