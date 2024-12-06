const express = require("express");
const homeController = require("../../controllers/homeController");

const router = express.Router();


router.get("/", homeController.home2024);
router.get("/annee-2025-2026", homeController.home2025);
router.get("/recherche", homeController.search);
router.get("/carte", homeController.map);


module.exports = router;
