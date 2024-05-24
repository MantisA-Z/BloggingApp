const { verifyToken } = require('../services/token');

function authUser(cookieName) {
    return function(req, res, next) {
        try {
            const user = req.cookies[cookieName];
            if (!user) return next();
            const payload = verifyToken(user);
            req.user = payload;
            console.log(user)
        } catch (err) {

        }
        next();
    };
}

module.exports = {authUser};
