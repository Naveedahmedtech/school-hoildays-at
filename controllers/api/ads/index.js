const { prisma } = require("../../../lib/prisma");

const adsController = {
  // Get all ads
  getAds: async (req, res) => {
    try {
      const ads = await prisma.ad.findMany(); // Fetch all ads
      res.status(200).json({
        message: "Ads retrieved successfully",
        ads,
      });
    } catch (error) {
      console.error("Error fetching ads:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Create a new ad
  createAds: async (req, res) => {
    const { type } = req.params;
    const { script } = req.body;

    if (!type || !script) {
      return res.status(400).json({ message: "Type and script are required" });
    }

    try {
      const ad = await prisma.ad.upsert({
        where: { type },
        update: { script }, 
        create: { type, script }, 
      });

      res.status(200).json({
        message: "Ad created successfully",
        ad,
      });
    } catch (error) {
      console.error("Error creating ad:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Update an existing ad
  updateAds: async (req, res) => {
    const { type, script } = req.body;

    if (!type || !script) {
      return res.status(400).json({ message: "Type and script are required" });
    }

    try {
      const ad = await prisma.ad.update({
        where: { type },
        data: { script },
      });

      res.status(200).json({
        message: "Ad updated successfully",
        ad,
      });
    } catch (error) {
      console.error("Error updating ad:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Delete an ad
  deleteAds: async (req, res) => {
    const { type } = req.params;

    if (!type) {
      return res.status(400).json({ message: "Type is required" });
    }

    try {
      await prisma.ad.delete({
        where: { type },
      });

      res.status(200).json({
        message: "Ad deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting ad:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = adsController;
