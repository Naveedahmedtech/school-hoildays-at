const express = require("express");
const homeController = require("../../controllers/homeController");
const { I18n } = require("../../config/i18n-config");

const router = express.Router();

router.get("/", homeController.home2024);
router.get("/annee-2025-2026", homeController.home2025);
router.get("/recherche", homeController.search);
router.get("/carte", homeController.map);
router.get("/change-lang/:lang", (req, res) => {
  const lang = req.params.lang;
  if (I18n.getLocales().includes(lang)) {
    res.cookie("locale", lang); 
    i18n.setLocale(lang);
  }
  res.redirect("/");
});

module.exports = router;
