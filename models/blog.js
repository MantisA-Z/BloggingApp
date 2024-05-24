const mongoose = require('mongoose');
const blogShcema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    title: {
        type: String,
        required: true
    },
    comment: {
        type: String
    },
    coverImageURL: {
        type: String,
        required: true
    }
}, {timestamps: true})

const blogModel = mongoose.model('blogs', blogShcema);

module.exports = blogModel;

