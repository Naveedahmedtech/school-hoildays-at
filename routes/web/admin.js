const express = require("express");
const adminController = require("../../controllers/admin");
const authMiddleware = require("../../middlewares/authMiddleware");

const router = express.Router();

router.get("/dashboard", authMiddleware, adminController.dashboard);
router.get("/regions", authMiddleware, adminController.regions);
router.get("/academie", authMiddleware, adminController.academies);
router.get("/auth/signin", adminController.signin);

module.exports = router;
