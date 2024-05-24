const mongoose = require('mongoose');

function connectMongodb(){
    mongoose.connect('mongodb://localhost:27017/blogify')
    .then(() => { console.log('Mongodb connected...') })
    .catch((err) => {console.log(`Mongodb connection Error: ${err}`)})
};

module.exports = connectMongodb;