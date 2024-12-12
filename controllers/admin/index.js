const axios = require("axios");
const apiUtil = async (keys) => {
  try {
    const response = await axios.get(
      `${process.env.baseUrl}/api/dashboard/translations`,
      {
        params: {
          keys: keys.join(","),
        },
      },
    );
    return response.data.translations.reduce((acc, item) => {
      const { key, translations: langTranslations } = item;
      for (const lang in langTranslations) {
        if (!acc[lang]) acc[lang] = {};
        acc[lang][key] = langTranslations[lang];
      }
      return acc;
    }, {});
  } catch (error) {
    console.error("Error fetching translations with axios:", error.message);
    throw new Error("Failed to fetch translations.");
  }
};

const dashboard = async (req, res, next) => {
  const translationKeys = [
    "school_holidays",
    "corsica_calendar",
    "academies_by_zone",
  ]; 

  try {
    const translations = await apiUtil(translationKeys);
    res.render("admin/layout", {
      content: "./dashboard",
      translations,
    });
  } catch (error) {
    console.error("Error fetching translations with axios:", error.message);
    next(error);
  }
};

const regions = async (req, res, next) => {
  const translationKeys = [
    "regions_zone_france",
  ]; 

  try {
    const translations = await apiUtil(translationKeys);
    res.render("admin/layout", {
      content: "./regions",
      translations,
    });
  } catch (error) {
    console.error("Error fetching translations with axios:", error.message);
    next(error);
  }
};

const academies = async (req, res, next) => {
  const translationKeys = [
    "academies_zone_france",
  ]; 

  try {
    const translations = await apiUtil(translationKeys);
    res.render("admin/layout", {
      content: "./academie",
      translations,
    });
  } catch (error) {
    console.error("Error fetching translations with axios:", error.message);
    next(error);
  }
};

const signin = async (req, res, next) => {
  try {
    res.render("admin/signin");
  } catch (error) {
    console.error("Error fetching translations with axios:", error.message);
    next(error);
  }
};


module.exports = { dashboard, regions, academies, signin };
