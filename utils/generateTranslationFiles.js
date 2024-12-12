const { prisma } = require("../lib/prisma");
const path = require("path");
const fs = require("fs");

exports.generateTranslationFiles = async () => {
  try {
    const languages = ["en", "fr"];

    for (const lng of languages) {
      const translations = await prisma.dynamicContent.findMany();
      const translationData = translations.reduce((acc, item) => {
        acc[item.key] = item.translations[lng] || item.key;
        return acc;
      }, {});

      const filePath = path.join(
        __dirname,
        `../locales/${lng}/translation.json`
      );
      console.log(`Writing file: ${filePath}`);
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, JSON.stringify(translationData, null, 2));

      console.log(`File written: ${filePath}`);
    }

    console.log("Translation file generation completed.");
  } catch (error) {
    console.error("Error generating translation files:", error);
  }
};
