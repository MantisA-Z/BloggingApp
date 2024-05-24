const express = require('express');
const Router = express.Router();
const blogModel = require('../models/blog');
const upload = require('../services/multer')

Router.get('/upload', (req, res) => {
    res.render('blog.ejs', {
        user: req.user
    });
});

Router.post('/upload', upload.single('coverImageURL'), async(req, res) => {
    const {title, comment, coverImageURL} = req.body;
    const blog = await blogModel.create({
        title,
        comment,
        coverImageURL: `/uploads/${req.file.filename}`,
        createdBy: req.user._id
    });
    console.log(req.file)
    console.log(blog)
    res.redirect(`/`)
})

module.exports = Router;