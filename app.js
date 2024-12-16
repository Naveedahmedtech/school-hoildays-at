require("dotenv").config();
const express = require("express");
const path = require("path");

const webRoutes = require("./routes/web");
const apiRoutes = require("./api");
const fetchHolidayDataMiddleware = require("./middlewares/counterData");
const i18next = require("i18next");
const middleware = require("i18next-http-middleware");
const backend = require("i18next-fs-backend");
const cookieParser = require("cookie-parser");
const generateTranslationsMiddleware = require("./middlewares/generateTranslationsMiddleware");
const saveTokenMiddleware = require("./middlewares/saveTokenMiddleware");
const axios = require("axios");
const cors = require("cors");


const app = express();

// Middleware to parse incoming requests
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors('*'))

// app.use(generateTranslationsMiddleware);

// Set view engine and views directory
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

i18next
  .use(backend)
  .use(middleware.LanguageDetector)
  .init({
    backend: {
      loadPath: "./locales/{{lng}}/translation.json", // Path to translation files
      cache: false,
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

app.use(middleware.handle(i18next));
app.use(saveTokenMiddleware);


// get counter data for all routes to access in the layout
app.use(fetchHolidayDataMiddleware);

// Routes
app.use("/", webRoutes);
app.use("/api", apiRoutes)


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
  console.error("Global ERROR----> ",err.stack);
  res.render("layouts/layout", {
    description: "Bienvenue sur le calendrier officiel des vacances scolaires.",
    content: `../pages/common/error`,
    countdownData: [],
    scriptContent: null,
  });
});

module.exports = app;
