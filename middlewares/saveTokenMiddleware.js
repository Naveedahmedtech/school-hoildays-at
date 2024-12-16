const jwt = require("jsonwebtoken");

const saveTokenMiddleware = (req, res, next) => {
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

  try {
    res.locals.route = req.path;
    res.locals.scriptContent = "alert('hello world')";


    const titles = {
      "/": "Vacances Scolaires",
      "/annee-2025-2026": "Vacances Scolaires 2025-2026 - Zone B",
      "/carte": "Carte des Zones de Vacances Scolaires - Calendrier Officiel",
      "/recherche": "Recherche - Vacances Scolaires en France",
      "/academie": "Académies - Vacances Scolaires Officielles",
      "/regions": "Régions - Vacances Scolaires Officielles",
    };
    res.locals.title = titles[req.path] || titles["/"];
    res.locals.t = req.t;

    let decoded = {};
    if (token) {
      try {
        // Verify and decode the token
        decoded = jwt.verify(token, process.env.JWT_SECRET);
      } catch (error) {
        if (error.name === "TokenExpiredError") {
          console.warn("Token expired. Redirecting to sign-in.");

          // Redirect to sign-in only if the route is private
          if (privateRoutes.includes(req.path)) {
            return res.redirect("/admin/auth/signin");
          }
        }
        console.warn("Invalid token:", error.message);
      }
    } else {
      // No token: redirect only if the route is private
      if (privateRoutes.includes(req.path)) {
        return res.redirect("/admin/auth/signin");
      }
    }

    res.locals.user = decoded || {};
    next();
  } catch (error) {
    console.error("Error in saveTokenMiddleware:", error.message);
    next(error);
  }
};

module.exports = saveTokenMiddleware;
