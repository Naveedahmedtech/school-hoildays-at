const express = require("express");
const homeController = require("../../controllers/homeController");
const { i18next } = require("../../config/i18n-config");

const router = express.Router();

router.get("/", homeController.home2024);
router.get("/annee-2025-2026", homeController.home2025);
router.get("/recherche", homeController.search);
router.get("/carte", homeController.map);
router.post("/change-language", (req, res) => {
  const { lng } = req.body;
  console.log(req.body, "i18next.languages", i18next.languages);
  if (!lng) {
    return res.status(400).json({ error: "Language code is required" });
  }

  if (!i18next.options.supportedLngs.includes(lng)) {
    return res.status(400).json({ error: "Unsupported language" });
  }

  // Set the language in the response cookie
  res.cookie("i18next", lng, { maxAge: 365 * 24 * 60 * 60 * 1000 }); // 1 year
  res.json({ message: "Language changed successfully", language: lng });
});

router.get("/access-denied", (req, res) => {
  try {
    res.render("admin/access-denied");
  } catch (error) {
    next(error);
  }
});


module.exports = router;
