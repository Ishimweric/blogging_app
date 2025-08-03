export const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ 
      success: false,
      error: 'Access denied. No token provided' 
    });
  }

  try {
    // Demo auth - just attach a user ID
    req.user = { id: 'demo-user-id' };
    next();
  } catch (err) {
    res.status(401).json({ 
      success: false,
      error: 'Invalid token' 
    });
  }
};