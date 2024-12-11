require("dotenv").config();
const express = require("express");
const path = require("path");

const webRoutes = require("./routes/web");
const fetchHolidayDataMiddleware = require("./middlewares/counterData");
const i18nextMiddleware = require("i18next-http-middleware");
const { i18next } = require("./middlewares/i18n");

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
    "/": "Vacances Scolaires",
    "/annee-2025-2026": "Vacances Scolaires 2025-2026 - Zone B",
    "/carte": "Carte des Zones de Vacances Scolaires - Calendrier Officiel",
    "/recherche": "Recherche - Vacances Scolaires en France",
    "/academie": "Académies - Vacances Scolaires Officielles",
    "/regions": "Régions - Vacances Scolaires Officielles",
  };

  res.locals.title = titles[req.path] || titles["/"];
  next();
});



//  handle i18next
app.use(i18nextMiddleware.handle(i18next));


app.use((req, res, next) => {
  res.locals.t = req.t;
  console.log(req.t("school_holidays"));
  next();
});

// get counter data for all routes to access in the layout
app.use(fetchHolidayDataMiddleware);
// Routes
app.use("/", webRoutes);

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
