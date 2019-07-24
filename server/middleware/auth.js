const jwt = require('jsonwebtoken');

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
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //set request to the user
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({
            msg: 'Token not valid'
        });
    }
};
