const i18next  = require("i18next");
const {
  generateTranslationFiles,
} = require("../utils/generateTranslationFiles");

const generateTranslationsMiddleware = async (req, res, next) => {
  try {
    await generateTranslationFiles();
    console.log("Translations generated successfully.");
    next();
  } catch (error) {
    console.error("Error generating translations:", error);
    res.status(500).send("Error generating translations.");
  }
};

module.exports = generateTranslationsMiddleware;
