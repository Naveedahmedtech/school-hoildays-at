const express = require("express");
const i18next  = require("i18next");
const dashboardRoutes = require("./dashboard");
const authRoutes = require("./auth");
const adsRoutes = require("./ads");

const router = express.Router();

router.post("/change-language", (req, res) => {
    const { lng } = req.body; 
  
    if (!lng) {
      return res.status(400).json({ error: 'Language code is required' });
    }
  
    if (!i18next.options.supportedLngs.includes(lng)) {
        return res.status(400).json({ error: "Unsupported language" });
      }
  
    // Set the language in the response cookie
    res.cookie('i18next', lng, { maxAge: 365 * 24 * 60 * 60 * 1000 }); // 1 year
    res.json({ message: 'Language changed successfully', language: lng });
  });

  router.use("/dashboard", dashboardRoutes);
  router.use("/auth", authRoutes);
  router.use("/ads", adsRoutes);



module.exports = router;
