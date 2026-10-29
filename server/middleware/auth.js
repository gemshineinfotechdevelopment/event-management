import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route. No token provided.'
    });
  }

  try {
    const secret = process.env.JWT_SECRET || 'eventora_jwt_secret_key_2026_luxury_atelier_token';
    const decoded = jwt.verify(token, secret);

    // Attach decoded user data
    req.user = decoded;
    next();
  } catch (err) {
    console.warn('JWT Verification failed:', err.message);
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired authentication token.'
    });
  }
};
