const mongoose = require('mongoose');
const crypto = require('node:crypto')
const usesrSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    profileImageURL: {
        type: String,
        default: '/public/image.png'
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"]
    }
}, {timestamps: true})

usesrSchema.pre("save", function(next) {
    let user = this;
    let hashedPassword = crypto.createHmac('sha256', process.env.SECRET)
                                .update(user.password)
                                .digest('hex');
    user.password = hashedPassword;
    user.salt = process.env.SECRET;
    next();
});

usesrSchema.static("matchPasword", async(email, password) => {
    const user = await User.findOne({email});
    if(!user) throw new Error('User not found');
    let salt = user.salt;
    let savedHashedPassword = user.password;

    let hashedPassword = crypto.createHmac('sha256', salt)
                                .update(password)
                                .digest('hex');

    if(hashedPassword === savedHashedPassword){
        return user;
    }else{
         throw new Error('Incorrect Password');
    };
});

const User = mongoose.model('user', usesrSchema);

module.exports = User;