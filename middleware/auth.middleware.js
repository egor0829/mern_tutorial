const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  if (req.method === 'options') {
    return next();
  } 
  
  try {
    const token = req.headers.authorization.split(" ")[1]; // "Bearer TOKEN"

    if (!token) {
      res.status(401).json({messgae: 'Unauthorized'});
    }

    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded;
    next();
  } catch (error) {
    console.log('auth error:', error.message);
    res.status(401).json({message: 'Unauthorized'});
  }
}