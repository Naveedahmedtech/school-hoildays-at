const express = require("express");
const router = express.Router();
const authController = require("../controllers/api/auth");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", authController.register);
router.post("/signin", authController.signin);
// router.get("/users", authMiddleware, authController.getUsers);
router.get("/users", authController.getUsers);
router.get("/users/:id", authController.getUser);
router.put("/users/:id", authController.updateUser);
router.delete("/users/:id", authController.deleteUser);



router.post("/signout", authController.logout);

module.exports = router;
