const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const authenticate = async (req, res, next) => {
  const token = req.headers['authorization'];
  console.log(213123, token)
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    const bearer = token.split(' ')[1];
    console.log(bearer)
    const decoded = jwt.verify(bearer, process.env.JWT_SECRET);
    const user = await pool.query('SELECT * FROM users WHERE id = $1', [decoded.user_id]);

    if (user.rows.length > 0) {
      req.user = user.rows[0];
      next();
    } else {
      return res.status(401).json({ message: 'Invalid token' });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Failed to authenticate token' });
  }
};

const authorize = (role) => {
  return (req, res, next) => {
    if (req.user.role_id !== role) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }
    next();
  };
};

module.exports = { authenticate, authorize };
