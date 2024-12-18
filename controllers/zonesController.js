const { BASE_URL, descriptionApiParams } = require("../constants");
const {
  buildHolidayAPIs,
  fetchHolidayData,
  mapHolidayDataToRanges,
  updateVacationsWithHolidays,
} = require("../utils/common");
const { getOverallDateRange } = require("../utils/home.util");
const { zonesVacationData } = require("../utils/zones.util");

// *** ZONE A *********
const zoneA2024 = async (req, res, next) => {
  const zones = ["Zone A"];
  const year = "2024";
  const countdownData = req?.holidayData?.countdownData;

  try {
    console.log("Fetching data using axios...");

    // Build API URLs
    const holidayAPIs = buildHolidayAPIs({
      baseURL: BASE_URL,
      zones,
      year,
      descriptions: descriptionApiParams,
    });

    // Fetch holiday data
    const holidayData = await fetchHolidayData(holidayAPIs);

    // Map holiday data to date ranges
    const holidayRanges = mapHolidayDataToRanges(
      holidayData,
      getOverallDateRange
    );
    // Update vacations dynamically
    const updatedVacations = updateVacationsWithHolidays(
      zonesVacationData,
      holidayRanges,
      descriptionApiParams
    );
    res.render("layouts/layout", {
      //title: "Home - School and Public Holidays",
      description:
        "Bienvenue sur le calendrier officiel des vacances scolaires.",
      content: "../pages/zones/a/year2024",
      vacations: updatedVacations,
      countdownData,
      selectedYear: year
    });
  } catch (error) {
    console.error("Error fetching data with axios:", error.message);
    // res.status(500).send("Error fetching data");
    next(error);
  }
};

const zoneA2025 = async (req, res, next) => {
  const zones = ["Zone A"];
  const year = "2025";
  const countdownData = req?.holidayData?.countdownData;

  try {
    console.log("Fetching data using axios...");

    // Build API URLs
    const holidayAPIs = buildHolidayAPIs({
      baseURL: BASE_URL,
      zones,
      year,
      descriptions: descriptionApiParams,
    });

    // Fetch holiday data
    const holidayData = await fetchHolidayData(holidayAPIs);

    // Map holiday data to date ranges
    const holidayRanges = mapHolidayDataToRanges(
      holidayData,
      getOverallDateRange
    );
    // Update vacations dynamically
    const updatedVacations = updateVacationsWithHolidays(
      zonesVacationData,
      holidayRanges,
      descriptionApiParams
    );
    res.render("layouts/layout", {
      //title: "Home - School and Public Holidays",
      description:
        "Bienvenue sur le calendrier officiel des vacances scolaires.",
      content: "../pages/zones/a/year2025",
      vacations: updatedVacations,
      countdownData,
    });
  } catch (error) {
    console.error("Error fetching data with axios:", error.message);
    // res.status(500).send("Error fetching data");
    next(error);
  }
};

// *** ZONE A END *********

// *** ZONE B START ********************************
const zoneB2024 = async (req, res, next) => {
  const { year = "2024", zone = "Zone B" } = req.query;
  const zones = [zone];
  const countdownData = req?.holidayData?.countdownData;

  try {
    // Build API URLs
    const holidayAPIs = buildHolidayAPIs({
      baseURL: BASE_URL,
      zones,
      year,
      descriptions: descriptionApiParams,
    });

    // Fetch holiday data
    const holidayData = await fetchHolidayData(holidayAPIs);

    // Map holiday data to date ranges
    const holidayRanges = mapHolidayDataToRanges(
      holidayData,
      getOverallDateRange
    );
    // Update vacations dynamically
    const updatedVacations = updateVacationsWithHolidays(
      zonesVacationData,
      holidayRanges,
      descriptionApiParams
    );
    res.render("layouts/layout", {
      //title: "Home - School and Public Holidays",
      description:
        "Bienvenue sur le calendrier officiel des vacances scolaires.",
      content: "../pages/zones/b/year2024",
      vacations: updatedVacations,
      countdownData,
      selectedYear: parseInt(year),
      zone
    });
  } catch (error) {
    console.error("Error fetching data with axios:", error.message);
    // res.status(500).send("Error fetching data");
    next(error);
  }
};

const zoneB2025 = async (req, res, next) => {
  const zones = ["Zone B"];
  const year = "2025";
  const countdownData = req?.holidayData?.countdownData;

  try {
    console.log("Fetching data using axios...");

    // Build API URLs
    const holidayAPIs = buildHolidayAPIs({
      baseURL: BASE_URL,
      zones,
      year,
      descriptions: descriptionApiParams,
    });

    // Fetch holiday data
    const holidayData = await fetchHolidayData(holidayAPIs);

    // Map holiday data to date ranges
    const holidayRanges = mapHolidayDataToRanges(
      holidayData,
      getOverallDateRange
    );
    // Update vacations dynamically
    const updatedVacations = updateVacationsWithHolidays(
      zonesVacationData,
      holidayRanges,
      descriptionApiParams
    );
    res.render("layouts/layout", {
      //title: "Home - School and Public Holidays",
      description:
        "Bienvenue sur le calendrier officiel des vacances scolaires.",
      content: "../pages/zones/b/year2025",
      vacations: updatedVacations,
      countdownData,
    });
  } catch (error) {
    console.error("Error fetching data with axios:", error.message);
    // res.status(500).send("Error fetching data");
    next(error);
  }
};

// **** ZONE B END ********************************

// *** ZONE C START ********************************
const zoneC2024 = async (req, res, next) => {
  const zones = ["Zone C"];
  const year = "2024";
  const countdownData = req?.holidayData?.countdownData;

  try {
    console.log("Fetching data using axios...");

    // Build API URLs
    const holidayAPIs = buildHolidayAPIs({
      baseURL: BASE_URL,
      zones,
      year,
      descriptions: descriptionApiParams,
    });

    // Fetch holiday data
    const holidayData = await fetchHolidayData(holidayAPIs);

    // Map holiday data to date ranges
    const holidayRanges = mapHolidayDataToRanges(
      holidayData,
      getOverallDateRange
    );
    // Update vacations dynamically
    const updatedVacations = updateVacationsWithHolidays(
      zonesVacationData,
      holidayRanges,
      descriptionApiParams
    );
    res.render("layouts/layout", {
      //title: "Home - School and Public Holidays",
      description:
        "Bienvenue sur le calendrier officiel des vacances scolaires.",
      content: "../pages/zones/c/year2024",
      vacations: updatedVacations,
      countdownData,
    });
  } catch (error) {
    console.error("Error fetching data with axios:", error.message);
    // res.status(500).send("Error fetching data");
    next(error);
  }
};

const zoneC2025 = async (req, res, next) => {
  const zones = ["Zone C"];
  const year = "2025";
  const countdownData = req?.holidayData?.countdownData;

  try {
    console.log("Fetching data using axios...");

    // Build API URLs
    const holidayAPIs = buildHolidayAPIs({
      baseURL: BASE_URL,
      zones,
      year,
      descriptions: descriptionApiParams,
    });

    // Fetch holiday data
    const holidayData = await fetchHolidayData(holidayAPIs);

    // Map holiday data to date ranges
    const holidayRanges = mapHolidayDataToRanges(
      holidayData,
      getOverallDateRange
    );
    // Update vacations dynamically
    const updatedVacations = updateVacationsWithHolidays(
      zonesVacationData,
      holidayRanges,
      descriptionApiParams
    );
    res.render("layouts/layout", {
      //title: "Home - School and Public Holidays",
      description:
        "Bienvenue sur le calendrier officiel des vacances scolaires.",
      content: "../pages/zones/c/year2025",
      vacations: updatedVacations,
      countdownData,
    });
  } catch (error) {
    console.error("Error fetching data with axios:", error.message);
    // res.status(500).send("Error fetching data");
    next(error);
  }
};

// **** ZONE C END ********************************

// *** ZONE Corse START ********************************
const zoneCorse2024 = async (req, res, next) => {
  const zones = ["Corse"];
  const year = "2024";
  const countdownData = req?.holidayData?.countdownData;

  try {
    console.log("Fetching data using axios...");

    // Build API URLs
    const holidayAPIs = buildHolidayAPIs({
      baseURL: BASE_URL,
      zones,
      year,
      descriptions: descriptionApiParams,
    });

    // Fetch holiday data
    const holidayData = await fetchHolidayData(holidayAPIs);

    // Map holiday data to date ranges
    const holidayRanges = mapHolidayDataToRanges(
      holidayData,
      getOverallDateRange
    );
    // Update vacations dynamically
    const updatedVacations = updateVacationsWithHolidays(
      zonesVacationData,
      holidayRanges,
      descriptionApiParams
    );
    res.render("layouts/layout", {
      //title: "Home - School and Public Holidays",
      description:
        "Bienvenue sur le calendrier officiel des vacances scolaires.",
      content: "../pages/zones/corse/year2024",
      vacations: updatedVacations,
      countdownData,
    });
  } catch (error) {
    console.error("Error fetching data with axios:", error.message);
    // res.status(500).send("Error fetching data");
    next(error);
  }
};

const zoneCorse2025 = async (req, res, next) => {
  const zones = ["Corse"];
  const year = "2025";
  const countdownData = req?.holidayData?.countdownData;

  try {
    console.log("Fetching data using axios...");

    // Build API URLs
    const holidayAPIs = buildHolidayAPIs({
      baseURL: BASE_URL,
      zones,
      year,
      descriptions: descriptionApiParams,
    });

    // Fetch holiday data
    const holidayData = await fetchHolidayData(holidayAPIs);

    // Map holiday data to date ranges
    const holidayRanges = mapHolidayDataToRanges(
      holidayData,
      getOverallDateRange
    );
    // Update vacations dynamically
    const updatedVacations = updateVacationsWithHolidays(
      zonesVacationData,
      holidayRanges,
      descriptionApiParams
    );
    res.render("layouts/layout", {
      //title: "Home - School and Public Holidays",
      description:
        "Bienvenue sur le calendrier officiel des vacances scolaires.",
      content: "../pages/zones/corse/year2025",
      vacations: updatedVacations,
      countdownData,
    });
  } catch (error) {
    console.error("Error fetching data with axios:", error.message);
    // res.status(500).send("Error fetching data");
    next(error);
  }
};

// **** ZONE C END ********************************

// *** ZONE Guadeloupe START ********************************
const zoneGuadeloupe2024 = async (req, res, next) => {
  const zones = ["Guadeloupe"];
  const year = "2024";
  const countdownData = req?.holidayData?.countdownData;

  try {
    console.log("Fetching data using axios...");

    // Build API URLs
    const holidayAPIs = buildHolidayAPIs({
      baseURL: BASE_URL,
      zones,
      year,
      descriptions: descriptionApiParams,
    });

    // Fetch holiday data
    const holidayData = await fetchHolidayData(holidayAPIs);

    // Map holiday data to date ranges
    const holidayRanges = mapHolidayDataToRanges(
      holidayData,
      getOverallDateRange
    );
    // Update vacations dynamically
    const updatedVacations = updateVacationsWithHolidays(
      zonesVacationData,
      holidayRanges,
      descriptionApiParams
    );
    res.render("layouts/layout", {
      //title: "Home - School and Public Holidays",
      description:
        "Bienvenue sur le calendrier officiel des vacances scolaires.",
      content: "../pages/zones/guadeloupe/year2024",
      vacations: updatedVacations,
      countdownData,
    });
  } catch (error) {
    console.error("Error fetching data with axios:", error.message);
    // res.status(500).send("Error fetching data");
    next(error);
  }
};

const zoneGuadeloupe2025 = async (req, res, next) => {
  const zones = ["Guadeloupe"];
  const year = "2025";
  const countdownData = req?.holidayData?.countdownData;

  try {
    console.log("Fetching data using axios...");

    // Build API URLs
    const holidayAPIs = buildHolidayAPIs({
      baseURL: BASE_URL,
      zones,
      year,
      descriptions: descriptionApiParams,
    });

    // Fetch holiday data
    const holidayData = await fetchHolidayData(holidayAPIs);

    // Map holiday data to date ranges
    const holidayRanges = mapHolidayDataToRanges(
      holidayData,
      getOverallDateRange
    );
    // Update vacations dynamically
    const updatedVacations = updateVacationsWithHolidays(
      zonesVacationData,
      holidayRanges,
      descriptionApiParams
    );
    res.render("layouts/layout", {
      //title: "Home - School and Public Holidays",
      description:
        "Bienvenue sur le calendrier officiel des vacances scolaires.",
      content: "../pages/zones/guadeloupe/year2025",
      vacations: updatedVacations,
      countdownData,
    });
  } catch (error) {
    console.error("Error fetching data with axios:", error.message);
    // res.status(500).send("Error fetching data");
    next(error);
  }
};

// **** ZONE C END ********************************

// *** ZONE Guyane START ********************************
const zoneGuyane2024 = async (req, res, next) => {
  const zones = ["Guyane"];
  const year = "2024";
  const countdownData = req?.holidayData?.countdownData;

  try {
    console.log("Fetching data using axios...");

    // Build API URLs
    const holidayAPIs = buildHolidayAPIs({
      baseURL: BASE_URL,
      zones,
      year,
      descriptions: descriptionApiParams,
    });

    // Fetch holiday data
    const holidayData = await fetchHolidayData(holidayAPIs);

    // Map holiday data to date ranges
    const holidayRanges = mapHolidayDataToRanges(
      holidayData,
      getOverallDateRange
    );
    // Update vacations dynamically
    const updatedVacations = updateVacationsWithHolidays(
      zonesVacationData,
      holidayRanges,
      descriptionApiParams
    );
    res.render("layouts/layout", {
      //title: "Home - School and Public Holidays",
      description:
        "Bienvenue sur le calendrier officiel des vacances scolaires.",
      content: "../pages/zones/guyane/year2024",
      vacations: updatedVacations,
      countdownData,
    });
  } catch (error) {
    console.error("Error fetching data with axios:", error.message);
    // res.status(500).send("Error fetching data");
    next(error);
  }
};

const zoneGuyane2025 = async (req, res, next) => {
  const zones = ["Guyane"];
  const year = "2025";
  const countdownData = req?.holidayData?.countdownData;

  try {
    console.log("Fetching data using axios...");

    // Build API URLs
    const holidayAPIs = buildHolidayAPIs({
      baseURL: BASE_URL,
      zones,
      year,
      descriptions: descriptionApiParams,
    });

    // Fetch holiday data
    const holidayData = await fetchHolidayData(holidayAPIs);

    // Map holiday data to date ranges
    const holidayRanges = mapHolidayDataToRanges(
      holidayData,
      getOverallDateRange
    );
    // Update vacations dynamically
    const updatedVacations = updateVacationsWithHolidays(
      zonesVacationData,
      holidayRanges,
      descriptionApiParams
    );
    res.render("layouts/layout", {
      //title: "Home - School and Public Holidays",
      description:
        "Bienvenue sur le calendrier officiel des vacances scolaires.",
      content: "../pages/zones/guyane/year2025",
      vacations: updatedVacations,
      countdownData,
    });
  } catch (error) {
    console.error("Error fetching data with axios:", error.message);
    // res.status(500).send("Error fetching data");
    next(error);
  }
};

// **** ZONE C END ********************************

// *** ZONE Martinique START ********************************
const zoneMartinique2024 = async (req, res, next) => {
  const zones = ["Martinique"];
  const year = "2024";
  const countdownData = req?.holidayData?.countdownData;

  try {
    console.log("Fetching data using axios...");

    // Build API URLs
    const holidayAPIs = buildHolidayAPIs({
      baseURL: BASE_URL,
      zones,
      year,
      descriptions: descriptionApiParams,
    });

    // Fetch holiday data
    const holidayData = await fetchHolidayData(holidayAPIs);

    // Map holiday data to date ranges
    const holidayRanges = mapHolidayDataToRanges(
      holidayData,
      getOverallDateRange
    );
    // Update vacations dynamically
    const updatedVacations = updateVacationsWithHolidays(
      zonesVacationData,
      holidayRanges,
      descriptionApiParams
    );
    res.render("layouts/layout", {
      //title: "Home - School and Public Holidays",
      description:
        "Bienvenue sur le calendrier officiel des vacances scolaires.",
      content: "../pages/zones/martinique/year2024",
      vacations: updatedVacations,
      countdownData,
    });
  } catch (error) {
    console.error("Error fetching data with axios:", error.message);
    // res.status(500).send("Error fetching data");
    next(error);
  }
};

const zoneMartinique2025 = async (req, res, next) => {
  const zones = ["Martinique"];
  const year = "2025";
  const countdownData = req?.holidayData?.countdownData;

  try {
    console.log("Fetching data using axios...");

    // Build API URLs
    const holidayAPIs = buildHolidayAPIs({
      baseURL: BASE_URL,
      zones,
      year,
      descriptions: descriptionApiParams,
    });

    // Fetch holiday data
    const holidayData = await fetchHolidayData(holidayAPIs);

    // Map holiday data to date ranges
    const holidayRanges = mapHolidayDataToRanges(
      holidayData,
      getOverallDateRange
    );
    // Update vacations dynamically
    const updatedVacations = updateVacationsWithHolidays(
      zonesVacationData,
      holidayRanges,
      descriptionApiParams
    );
    res.render("layouts/layout", {
      //title: "Home - School and Public Holidays",
      description:
        "Bienvenue sur le calendrier officiel des vacances scolaires.",
      content: "../pages/zones/martinique/year2025",
      vacations: updatedVacations,
      countdownData,
    });
  } catch (error) {
    console.error("Error fetching data with axios:", error.message);
    // res.status(500).send("Error fetching data");
    next(error);
  }
};

// **** ZONE Martinique END ********************************

// *** ZONE Mayotte START ********************************
const zoneMayotte2024 = async (req, res, next) => {
  const zones = ["Mayotte"];
  const year = "2024";
  const countdownData = req?.holidayData?.countdownData;

  try {
    console.log("Fetching data using axios...");

    // Build API URLs
    const holidayAPIs = buildHolidayAPIs({
      baseURL: BASE_URL,
      zones,
      year,
      descriptions: descriptionApiParams,
    });

    // Fetch holiday data
    const holidayData = await fetchHolidayData(holidayAPIs);

    // Map holiday data to date ranges
    const holidayRanges = mapHolidayDataToRanges(
      holidayData,
      getOverallDateRange
    );
    // Update vacations dynamically
    const updatedVacations = updateVacationsWithHolidays(
      zonesVacationData,
      holidayRanges,
      descriptionApiParams
    );
    res.render("layouts/layout", {
      //title: "Home - School and Public Holidays",
      description:
        "Bienvenue sur le calendrier officiel des vacances scolaires.",
      content: "../pages/zones/mayotte/year2024",
      vacations: updatedVacations,
      countdownData,
    });
  } catch (error) {
    console.error("Error fetching data with axios:", error.message);
    // res.status(500).send("Error fetching data");
    next(error);
  }
};

const zoneMayotte2025 = async (req, res, next) => {
  const zones = ["Mayotte"];
  const year = "2025";
  const countdownData = req?.holidayData?.countdownData;

  try {
    console.log("Fetching data using axios...");

    // Build API URLs
    const holidayAPIs = buildHolidayAPIs({
      baseURL: BASE_URL,
      zones,
      year,
      descriptions: descriptionApiParams,
    });

    // Fetch holiday data
    const holidayData = await fetchHolidayData(holidayAPIs);

    // Map holiday data to date ranges
    const holidayRanges = mapHolidayDataToRanges(
      holidayData,
      getOverallDateRange
    );
    // Update vacations dynamically
    const updatedVacations = updateVacationsWithHolidays(
      zonesVacationData,
      holidayRanges,
      descriptionApiParams
    );
    res.render("layouts/layout", {
      //title: "Home - School and Public Holidays",
      description:
        "Bienvenue sur le calendrier officiel des vacances scolaires.",
      content: "../pages/zones/mayotte/year2025",
      vacations: updatedVacations,
      countdownData,
    });
  } catch (error) {
    console.error("Error fetching data with axios:", error.message);
    // res.status(500).send("Error fetching data");
    next(error);
  }
};

// **** ZONE Mayotte END ********************************

// *** ZONE Réunion START ********************************
const zoneRéunion2024 = async (req, res, next) => {
  const zones = ["Réunion"];
  const year = "2024";
  const countdownData = req?.holidayData?.countdownData;

  try {
    console.log("Fetching data using axios...");

    // Build API URLs
    const holidayAPIs = buildHolidayAPIs({
      baseURL: BASE_URL,
      zones,
      year,
      descriptions: descriptionApiParams,
    });

    // Fetch holiday data
    const holidayData = await fetchHolidayData(holidayAPIs);

    // Map holiday data to date ranges
    const holidayRanges = mapHolidayDataToRanges(
      holidayData,
      getOverallDateRange
    );
    // Update vacations dynamically
    const updatedVacations = updateVacationsWithHolidays(
      zonesVacationData,
      holidayRanges,
      descriptionApiParams
    );
    res.render("layouts/layout", {
      //title: "Home - School and Public Holidays",
      description:
        "Bienvenue sur le calendrier officiel des vacances scolaires.",
      content: "../pages/zones/réunion/year2024",
      vacations: updatedVacations,
      countdownData,
    });
  } catch (error) {
    console.error("Error fetching data with axios:", error.message);
    // res.status(500).send("Error fetching data");
    next(error);
  }
};

const zoneRéunion2025 = async (req, res, next) => {
  const zones = ["Réunion"];
  const year = "2025";
  const countdownData = req?.holidayData?.countdownData;

  try {
    console.log("Fetching data using axios...");

    // Build API URLs
    const holidayAPIs = buildHolidayAPIs({
      baseURL: BASE_URL,
      zones,
      year,
      descriptions: descriptionApiParams,
    });

    // Fetch holiday data
    const holidayData = await fetchHolidayData(holidayAPIs);

    // Map holiday data to date ranges
    const holidayRanges = mapHolidayDataToRanges(
      holidayData,
      getOverallDateRange
    );
    // Update vacations dynamically
    const updatedVacations = updateVacationsWithHolidays(
      zonesVacationData,
      holidayRanges,
      descriptionApiParams
    );
    res.render("layouts/layout", {
      //title: "Home - School and Public Holidays",
      description:
        "Bienvenue sur le calendrier officiel des vacances scolaires.",
      content: "../pages/zones/réunion/year2025",
      vacations: updatedVacations,
      countdownData,
    });
  } catch (error) {
    console.error("Error fetching data with axios:", error.message);
    // res.status(500).send("Error fetching data");
    next(error);
  }
};

// **** ZONE Mayotte END ********************************

module.exports = {
  zoneA2024,
  zoneA2025,
  zoneB2024,
  zoneB2025,
  zoneC2024,
  zoneC2025,
  zoneCorse2024,
  zoneCorse2025,
  zoneGuadeloupe2024,
  zoneGuadeloupe2025,
  zoneGuyane2024,
  zoneGuyane2025,
  zoneMartinique2024,
  zoneMartinique2025,
  zoneMayotte2024,
  zoneMayotte2025,
  zoneRéunion2024,
  zoneRéunion2025,
};
