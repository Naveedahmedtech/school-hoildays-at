const express = require("express");
const router = express.Router();
const homeRoutes = require("./home");
const vacationRoutes = require("./vacation");
const zonesRoutes = require("./zones");
const academieRoutes = require("./academie");
const regionRoutes = require("./regions");
const adminRoutes = require("./admin");
const regionController = require("../../controllers/region/regionController");


router.use("/", homeRoutes);
router.use("/regions", regionRoutes);
router.get("/departments", regionController.departments);
router.use("/vacances", vacationRoutes);
router.use("/zones", zonesRoutes);
router.use("/academie", academieRoutes);
router.use("/admin", adminRoutes);


module.exports = router;
