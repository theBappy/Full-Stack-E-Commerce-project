const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.isAuthenticatedUser = async (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Please log in to access this resource' });
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed!' });
  }
};

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: `Role (${req.user.role}) is not allowed to access this resource` });
      }
      next();
    };
  };
  
