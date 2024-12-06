const express = require("express");
const regionController = require("../../controllers/region/regionController");

const router = express.Router();


router.get("/", regionController.region);
router.get("/year", regionController.commonRegion2024);


module.exports = router;
