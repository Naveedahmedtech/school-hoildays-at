const express = require("express");
const { title, description, zones, zonesData } = require("../../mock");
const {
  menuData,
  myZones,
  pageTitle,
  dates,
  vacation,
  vacation2,
} = require("../../utils/home.util");
const router = express.Router();
const axios = require("axios");
const { descriptionApiParams } = require("../../constants");
const homeRoutes = require("./home");
const vacationRoutes = require("./vacation");
const zonesRoutes = require("./zones");
const academieRoutes = require("./academie");
const regionRoutes = require("./regions");
const adminRoutes = require("./admin");


// TODO: include ERROR page NOT FOUND
// TODO: Page titles need to change

router.use("/", homeRoutes);
router.use("/regions", regionRoutes);
router.use("/vacances", vacationRoutes);
router.use("/zones", zonesRoutes);
router.use("/academie", academieRoutes);
router.use("/admin", adminRoutes);


module.exports = router;
