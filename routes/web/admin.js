const express = require("express");
const adminController = require("../../controllers/admin");
const authMiddleware = require("../../middlewares/authMiddleware");
const checkAccess = require("../../middlewares/checkAccess");

const router = express.Router();

router.get(
  "/dashboard",
  authMiddleware,
  checkAccess("manage content"),
  adminController.dashboard
);
router.get(
  "/regions",
  authMiddleware,
  checkAccess("manage content"),
  adminController.regions
);
router.get(
  "/academie",
  authMiddleware,
  checkAccess("manage content"),
  adminController.academies
);
router.get(
  "/map",
  authMiddleware,
  checkAccess("manage content"),
  adminController.map
);
router.get(
  "/users",
  authMiddleware,
  checkAccess(null, "ADMIN"),
  adminController.users
);
router.get(
  "/create-user",
  authMiddleware,
  checkAccess(null, "ADMIN"),
  adminController.createUser
);
router.get(
  "/update-user",
  authMiddleware,
  checkAccess(null, "ADMIN"),
  adminController.updateUser
);


router.get(
    "/manage-ads",
    authMiddleware,
    checkAccess('manage ads'),
    adminController.manageAds
  );


router.get("/auth/signin", adminController.signin);

module.exports = router;
