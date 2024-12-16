const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const adsController = require("../controllers/api/ads");


router.get("/scripts",  adsController.getAds);
router.post("/scripts/:type", authMiddleware, adsController.createAds); 
router.put("/scripts", authMiddleware, adsController.updateAds); 
router.delete("/scripts/:type", authMiddleware, adsController.deleteAds); 


module.exports = router;
