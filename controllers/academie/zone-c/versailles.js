const { BASE_URL, descriptionApiParams } = require("../../../constants");
const {
  buildHolidayAPIs,
  fetchHolidayData,
  mapHolidayDataToRanges,
  updateVacationsWithHolidays,
} = require("../../../utils/common");
const { getOverallDateRange } = require("../../../utils/home.util");
const { zonesVacationData } = require("../../../utils/zones.util");

const zones = ["Zone C"];
const location = "Versailles";
const versailles2024 = async (req, res) => {
  const year = "2024";

  try {
    console.log("Fetching data using axios...");

    // Build API URLs
    const holidayAPIs = buildHolidayAPIs({
      baseURL: BASE_URL,
      zones,
      year,
      descriptions: descriptionApiParams,
      location,
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
      title: "Home - School and Public Holidays",
      description:
        "Bienvenue sur le calendrier officiel des vacances scolaires.",
      content: "../pages/zones/c/academie/versailles/year2024",
      vacations: updatedVacations,
    });
  } catch (error) {
    console.error("Error fetching data with axios:", error.message);
    res.status(500).send("Error fetching data");
  }
};

const versailles2025 = async (req, res) => {
  const year = "2025";

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
      title: "Home - School and Public Holidays",
      description:
        "Bienvenue sur le calendrier officiel des vacances scolaires.",
      content: "../pages/zones/c/academie/versailles/year2025",
      vacations: updatedVacations,
    });
  } catch (error) {
    console.error("Error fetching data with axios:", error.message);
    res.status(500).send("Error fetching data");
  }
};

module.exports = {
  versailles2024,
  versailles2025,
};
