import jwt from 'jsonwebtoken';

function authMiddleware(req, res, next) {
  // 1. Get the Authorization header from the request
  const authHeader = req.headers['authorization'];
  
  // 2. Extract token from format: "Bearer <token>"
  const token = authHeader && authHeader.split(' ')[1];

  // 3. If no token provided, reject request immediately
  if (!token) {
    return res.status(401).json({ message: "Access Denied: No token provided!" });
  }

  // 4. Verify token with your secret key
  try {
    const verifiedUser = jwt.verify(token, "MY_SUPER_SECRET_KEY_123");
    req.user = verifiedUser; // Attach verified payload ({ userId, email }) to request
    next(); // Proceed to the protected route handler
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token!" });
  }
}

export default authMiddleware;