// Imports
const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const { authUser } = require('./middlewares/auth');
const connectDb = require('./mongodb/blogify_db');
const blogs = require('./models/blog');

// Routers
const accountRouter = require('./routes/account');
const blogRouter = require('./routes/addBlog');

// Variables
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8000;

// MongoDB connection
connectDb();

// Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authUser('token'));

// Set the view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/', accountRouter);
app.use('/blog', blogRouter);

app.get('/', async (req, res) => {
    try {
        const allBlogs = await blogs.find();
        res.render('home', {
            user: req.user,
            blogs: allBlogs
        });
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
