// Middleware to check roles and permissions
const checkAccess = (requiredPermission, requiredRole) => {
    return (req, res, next) => {
      const user = req.user; 
  
      if (requiredRole && user.role !== requiredRole) {
        return res.status(403).redirect('/access-denied');
      }
  
      if (requiredPermission && !user.permissions.includes(requiredPermission)) {
        return res.status(403).redirect('/access-denied');
      }
  
      next();
    };
  };
  
  module.exports = checkAccess;
  