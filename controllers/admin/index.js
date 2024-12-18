const axios = require("axios");
const apiUtil = async (keys) => {
  try {
    const response = await axios.get(
      `https://holi-three.vercel.app/api/dashboard/translations`,
      {
        params: {
          keys: keys.join(","),
        },
      }
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

const getUsers = async () => {
  try {
    const response = await axios.get(`https://holi-three.vercel.app/api/auth/users`);
    return response.data.users;
  } catch (error) {
    console.error("Error fetching translations with axios:", error.message);
    throw new Error("Failed to fetch translations.");
  }
};

const getUserById = async (userId) => {
  try {
    const response = await axios.get(
      `https://holi-three.vercel.app/api/auth/users/${userId}`
    );
    return response.data.user;
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
    "search_placeholder",
    "regions",
    "academies",
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
  const translationKeys = ["regions_zone_france"];

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
  const translationKeys = ["academies_zone_france"];

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

const map = async (req, res, next) => {
  const translationKeys = ["map_school_holiday_zones", "map_holiday_zones_abc"];

  try {
    const translations = await apiUtil(translationKeys);
    res.render("admin/layout", {
      content: "./map",
      translations,
    });
  } catch (error) {
    console.error("Error fetching translations with axios:", error.message);
    next(error);
  }
};

const createUser = async (req, res) => {
  try {
    res.render("admin/layout", {
      content: "./create-user",
    });
  } catch (error) {
    console.error("Error fetching translations with axios:", error.message);
    throw new Error("Failed to fetch translations.");
  }
};

const updateUser = async (req, res) => {
  const { user_id } = req.query;
  const user = await getUserById(user_id);
  console.log("Single User: ", user);
  try {
    res.render("admin/layout", {
      content: "./update-user",
      user,
    });
  } catch (error) {
    console.error("Error fetching translations with axios:", error.message);
    throw new Error("Failed to fetch translations.");
  }
};

const users = async (req, res, next) => {
  const users = await getUsers();
  try {
    res.render("admin/layout", {
      content: "./users",
    });
  } catch (error) {
    console.error("Error fetching translations with axios:", error.message);
    next(error);
  }
};
const manageAds = async (req, res, next) => {
  const users = await getUsers();
  try {
    res.render("admin/layout", {
      content: "./manage-ads",
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

module.exports = {
  dashboard,
  regions,
  academies,
  map,
  users,
  createUser,
  updateUser,
  manageAds,
  signin,
};
