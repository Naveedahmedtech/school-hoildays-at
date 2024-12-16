const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.cookies.jwt;
  // Define private routes that require authentication
  const privateRoutes = [
    "/admin/dashboard",
    "/admin/map",
    "/admin/create-user",
    "/admin/update-user",
    "/admin/regions",
    "/admin/academies",
  ];

  if (!token) {
    // return res.status(401).json({ message: "Access denied, no token provided" });
    return res.redirect("/");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "_secret_key_");
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      console.warn("Token expired. Redirecting to sign-in.");

      // Redirect to sign-in only if the route is private
      if (privateRoutes.includes(req.path)) {
        return res.redirect("/admin/auth/signin");
      }
    }
    next(error);
  }
};

module.exports = authMiddleware;
