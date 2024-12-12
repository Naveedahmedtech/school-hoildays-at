const i18next  = require("i18next");
const { prisma } = require("../../../lib/prisma");
const {
  generateTranslationFiles,
} = require("../../../utils/generateTranslationFiles");

const translationController = {
  getTranslations: async (req, res) => {
    const { lang, namespace, keys } = req.query;

    try {
      // Build a dynamic filter object
      const filter = {};
      if (lang) {
        filter.translations = {
          hasKey: lang, // Assumes translations is a JSON object and lang corresponds to keys in that object
        };
      }
      if (namespace) {
        filter.namespace = namespace;
      }
      if (keys) {
        const keyArray = keys.split(","); // Split keys into an array
        filter.key = {
          in: keyArray, // Use Prisma's "in" filter for multiple keys
        };
      }

      // Fetch translations based on the filter
      const findTranslations = await prisma.dynamicContent.findMany({
        where: filter,
      });

      res.status(200).json({
        message: "Translations retrieved successfully",
        translations: findTranslations,
      });
    } catch (error) {
      console.error("Error fetching translations:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  updateTranslation: async (req, res) => {
    const { translations } = req.body;

    try {
      if (!translations || typeof translations !== "object") {
        return res.status(400).json({ message: "Invalid payload." });
      }

      const updatePromises = Object.entries(translations).map(
        async ([key, langTranslations]) => {
          const existingRecord = await prisma.dynamicContent.findUnique({
            where: { key },
          });

          if (!existingRecord) {
            throw new Error(`Translation key '${key}' not found.`);
          }

          return prisma.dynamicContent.update({
            where: { key },
            data: {
              translations: {
                ...existingRecord.translations,
                ...langTranslations, // Merge new translations with existing ones
              },
            },
          });
        }
      );

      const updatedTranslations = await Promise.all(updatePromises);
      await generateTranslationFiles();

      // Reload resources in i18next dynamically
      i18next.reloadResources(["en", "fr"], () => {
        console.log("Translation files reloaded into i18next.");
      });

      res.status(200).json({
        message: "Translations updated successfully",
        translations: updatedTranslations,
      });
    } catch (error) {
      console.error("Error updating translations:", error);
      if (error.message.includes("not found")) {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = translationController;
