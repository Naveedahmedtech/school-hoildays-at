require("dotenv").config();
const express = require("express");
const path = require("path");

const webRoutes = require("./routes/web");
const apiRoutes = require("./routes/api");
const fetchHolidayDataMiddleware = require("./middlewares/counterData");
const i18next = require("i18next");
const middleware = require("i18next-http-middleware");
const backend = require("i18next-fs-backend");

const app = express();

// Middleware to parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Set view engine and views directory
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use((req, res, next) => {
  res.locals.route = req.path; 
  const titles = {
    '/': 'Vacances Scolaires',
    '/annee-2025-2026': 'Vacances Scolaires 2025-2026 - Zone B',
    '/carte': 'Carte des Zones de Vacances Scolaires - Calendrier Officiel',
    '/recherche': 'Recherche - Vacances Scolaires en France',
    '/academie': 'Académies - Vacances Scolaires Officielles',
    '/regions': 'Régions - Vacances Scolaires Officielles'
  };

  res.locals.title = titles[req.path] || titles['/'];
  next();
});

i18next
  .use(backend)
  .use(middleware.LanguageDetector)
  .init({
    backend: {
      loadPath: "./locales/{{lng}}/translation.json", // Path to translation files
    },
    fallbackLng: "en",
    preload: ["en", "fr"],
    saveMissing: true,
    detection: {
      order: ["cookie", "querystring", "header"],
      caches: ["cookie"],
      cookieSecure: false,
      lookupCookie: "i18next",
    },
    supportedLngs: ["en", "fr"],
    nonExplicitSupportedLngs: true,
  });



//  handle i18next
app.use(middleware.handle(i18next));

app.use((req, res, next) => {
  res.locals.t = req.t; 

  next();
});

// get counter data for all routes to access in the layout
app.use(fetchHolidayDataMiddleware);
// Routes
app.use("/", webRoutes);
app.use("/api", apiRoutes);

 
// 404 Not Found Handler
app.use((req, res, next) => {
  res.render("layouts/layout", {
    description: "Bienvenue sur le calendrier officiel des vacances scolaires.",
    content: `../pages/common/not-found`,
    countdownData: [],
  });
});
 
// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.render("layouts/layout", {
    description: "Bienvenue sur le calendrier officiel des vacances scolaires.",
    content: `../pages/common/error`,
    countdownData: [],
  });
});

module.exports = app;
