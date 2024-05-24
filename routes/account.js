const express= require('express');
const { generateToken, verifyToken } = require('../services/token')
const Router = express.Router();
const User = require('../models/user')

Router.get('/signup', (req, res) => {
    res.render('signup');
});

Router.get('/signin', (req, res) => {
    res.render('signin');
})

Router.get('/logout', (req, res) => {
    res.clearCookie('token').redirect('/')
})

Router.post('/signup', async(req, res) => {
    let { fullname, email, password } = req.body
    await User.create({
        fullname,
        email,
        password
    });

    res.redirect('/')
})

Router.post('/signin', async(req, res) => {
   try{ 
        let { email, password } = req.body;
        let isMatched = await User.matchPasword(email, password);
        if(isMatched){
            const token = generateToken(isMatched);
            res.cookie('token', token).redirect('/');
        }else{
            throw new Error('wrong password')
        }
    }
    catch (err) {
        res.render('signin', {error: err.message});
      };
});

module.exports = Router;