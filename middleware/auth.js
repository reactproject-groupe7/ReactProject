const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    //get token fron header
    const token = req.header('x-auth-token');

    //Check id no token
    if (!token) {
        return res.status(401).json({
            msg: 'no token, no authorization  '
        });
    }

    //verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        //set request to the user
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({
            msg: 'Token not valid'
        });
    }
};