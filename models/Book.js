const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  image: String,
  year: Number
});

module.exports = mongoose.model('Book', BookSchema);
