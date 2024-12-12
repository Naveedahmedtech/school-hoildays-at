const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.cookies.jwt; 

  if (!token) {
    // return res.status(401).json({ message: "Access denied, no token provided" });
    return res.redirect("/");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
