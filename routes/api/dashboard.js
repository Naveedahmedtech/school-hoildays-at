const express = require("express");
const router = express.Router();
const translationsController = require("../../controllers/api/dashboard/translations");
const authMiddleware = require("../../middlewares/authMiddleware");

router.get("/translations", translationsController.getTranslations);
router.put("/translations/update", authMiddleware, translationsController.updateTranslation);


module.exports = router;
