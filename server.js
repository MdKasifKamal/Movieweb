const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const bookRoutes = require('./routes/bookRoutes');
const bodyParser = require('body-parser');

dotenv.config();
connectDB();

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', bookRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
