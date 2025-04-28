const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// GET all books through browser
router.get('/', async (req, res) => {
  const books = await Book.find();
  res.render('books', { books });
});

// GET all books through Postman API
router.get('/api', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// Add through Postman API
router.post('/api', async (req, res) => {
  const { title, author, image, year } = req.body;
  const newBook = new Book({ title, author, image, year });
  await newBook.save();
  res.json(newBook);
});

// Update through Postman API
router.put('/api/:id', async (req, res) => {
  const { title, author, image, year } = req.body;
  const updatedBook = await Book.findByIdAndUpdate(req.params.id, {
    title, author, image, year
  }, { new: true });
  res.json(updatedBook);
});

// Delete through Postman API
router.delete('/api/:id', async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: 'Book deleted' });
});

// Add through browser (form)
router.get('/add', (req, res) => {
  res.render('addBook'); // renders views/addBook.ejs
});

// Add through browser (form POST)
router.post('/add', async (req, res) => {
  const { title, author, image, year } = req.body;
  const newBook = new Book({ title, author, image, year });
  await newBook.save();
  res.redirect('/');
});

// Load update form (with book pre-filled)
router.get('/update/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.render('updateBook', { book }); // create views/updateBook.ejs
  } catch (error) {
    res.status(500).send('Error loading update form');
  }
});

// Update the book after form submit
router.post('/update/:id', async (req, res) => {
  const { title, author, image, year } = req.body;
  await Book.findByIdAndUpdate(req.params.id, { title, author, image, year });
  res.redirect('/');
});


// Delete a book (browser GET request)
router.get('/delete/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (error) {
    res.status(500).send('Error deleting book');
  }
});

module.exports = router;
