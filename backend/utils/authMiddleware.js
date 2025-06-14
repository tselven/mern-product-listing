// utils/authMiddleware.js
import jwt from 'jsonwebtoken';

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Expect: "Bearer TOKEN"

  if (!token) return res.status(401).json({ message: 'Access denied' });

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret', (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    req.user = user; // you can use this in protected routes
    next();
  });
}