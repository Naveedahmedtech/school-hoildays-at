const express = require("express");
const zonesController = require("../../controllers/zonesController");

const router = express.Router();

router.get("/", zonesController.zoneB2024);


// **** ZONE A ********************************
router.get("/a-year-2024", zonesController.zoneA2024);
router.get("/a-year-2025", zonesController.zoneA2025);
// **** ZONE A END ********************************



// **** ZONE B ********************************

router.get("/b-year-2024", zonesController.zoneB2024);
router.get("/b-year-2025", zonesController.zoneB2025);
// **** ZONE B END ********************************



// **** ZONE C ********************************
router.get("/c-year-2024", zonesController.zoneC2024);
router.get("/c-year-2025", zonesController.zoneC2025);
// **** ZONE C END ********************************



// **** ZONE Corse ********************************
router.get("/corse-year-2024", zonesController.zoneCorse2024);
router.get("/corse-year-2025", zonesController.zoneCorse2025);
// **** ZONE C END ********************************



// **** ZONE Guadeloupe ********************************
router.get("/guadeloupe-year-2024", zonesController.zoneGuadeloupe2024);
router.get("/guadeloupe-year-2025", zonesController.zoneGuadeloupe2025);
// **** ZONE C END ********************************



// **** ZONE Guyane ********************************
router.get("/guyane-year-2024", zonesController.zoneGuyane2024);
router.get("/guyane-year-2025", zonesController.zoneGuyane2025);
// **** ZONE C END ********************************



// **** ZONE Guyane ********************************
router.get("/martinique-year-2024", zonesController.zoneMartinique2024);
router.get("/martinique-year-2025", zonesController.zoneMartinique2025);
// **** ZONE C END ********************************



// **** ZONE Guyane ********************************
router.get("/mayotte-year-2024", zonesController.zoneMayotte2024);
router.get("/mayotte-year-2025", zonesController.zoneMayotte2025);
// **** ZONE C END ********************************



// **** ZONE Guyane ********************************
router.get("/reunion-year-2024", zonesController.zoneRéunion2024);
router.get("/reunion-year-2025", zonesController.zoneRéunion2025);
// **** ZONE C END ********************************


module.exports = router;
