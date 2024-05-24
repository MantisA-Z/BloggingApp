const jwt = require('jsonwebtoken');

function generateToken(user){
    const payload = {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        profileImageURL: user.profileImageURL,
        role: user.role
    };
    const token = jwt.sign(payload, process.env.JWTSECRET)
    return token
};

function verifyToken(token){
    const payload = jwt.verify(token, process.env.JWTSECRET);
    return payload;
};

module.exports = { generateToken, verifyToken };