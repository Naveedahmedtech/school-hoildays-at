const express = require("express");
const router = express.Router();
const authController = require("../../controllers/api/auth");

router.post("/register", authController.register);
router.post("/signin", authController.signin);
router.post("/signout", authController.logout);

module.exports = router;
