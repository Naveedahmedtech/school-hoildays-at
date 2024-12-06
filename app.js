require("dotenv").config();
const express = require("express");
const path = require("path");

const webRoutes = require("./routes/web");

const app = express();

// Middleware to parse incoming requests
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Set view engine and views directory
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Routes
app.use("/", webRoutes);

// 404 Not Found Handler
app.use((req, res, next) => {
    res.render("layouts/layout", {
        title: "Home - School and Public Holidays",
        description:
          "Bienvenue sur le calendrier officiel des vacances scolaires.",
        content: `../pages/common/not-found`,
      });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.render("layouts/layout", {
    title: "Home - School and Public Holidays",
    description:
      "Bienvenue sur le calendrier officiel des vacances scolaires.",
    content: `../pages/common/error`,
  });
});

module.exports = app;
