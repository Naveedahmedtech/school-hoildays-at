const express = require("express");
const vacationController = require("../../controllers/vacationController");

const router = express.Router();


router.get("/vacances-d-hiver-vacances-de-fevrier", vacationController.winterFebVacation);
router.get("/vacances-de-printemps-vacances-de-paques", vacationController.springVacation);
router.get("/noel", vacationController.christmasVacation);
router.get("/toussaint", vacationController.allSaintsDayVacation);
router.get("/ascension", vacationController.ascensionVacation);
router.get("/grandes", vacationController.longVacation);


module.exports = router;
