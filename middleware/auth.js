const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {

    //Getting secret key from config

    const secretKey = config.get('jwtSecret');

    //Get the token from the header

    const token = req.header('x-auth-token');

    //check if no token
    if (!token) {
        return res.status(400).json({ mgs: 'No token provided, Authorization denied' })
    }

    //Verify token

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ mgs: 'Token is no valid' })
    }
}
