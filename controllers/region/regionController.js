const { BASE_URL, descriptionApiParams } = require("../../constants");
const {
  buildHolidayAPIs,
  fetchHolidayData,
  mapHolidayDataToRanges,
  updateVacationsWithHolidays,
} = require("../../utils/common");
const { getOverallDateRange } = require("../../utils/home.util");
const { zonesVacationData } = require("../../utils/zones.util");

const region = async (req, res) => {
  const countdownData = req?.holidayData?.countdownData;
  try {
    // Render the page with the holiday ranges and structured data
    res.render("layouts/layout", {
      title: "Home - School and Public Holidays",
      countdownData,
      description:
        "Bienvenue sur le calendrier officiel des vacances scolaires.",
      content: "../pages/regions/regions",
    });
  } catch (error) {
    console.error("Error fetching data with axios:", error.message);
    res.status(500).send("Error fetching data");
  }
};

const commonRegion2024 = async (req, res) => {
  const countdownData = req?.holidayData?.countdownData;
  const { region_name, of, department, zone, page, error } = req.query;
  let zones = [];
  zones.push(zone);
  try {
    // Build API URLs
    const holidayAPIs = buildHolidayAPIs({
      baseURL: BASE_URL,
      zones,
      of,
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
    const pageURL24 = `/regions/year?of=2024&region_name=${region_name}&department=${department}&zone=${zone}`;
    const pageURL25 = `/regions/year?of=2025&region_name=${region_name}&department=${department}&zone=${zone}`;
    const isActiveURL24 = of === "2024";
    const isActiveURL25 = of === "2025";
    const mainHeading = `Vacances scolaires ${
      page == "academie" ? "académie" : ""
    } ${region_name} ${of}-${parseInt(of) + 1}`;
    const subHeading = department && department !== "undefined" ? `${department} se trouve en ${zone}` : null;
    res.render("layouts/layout", {
      title: "Home - School and Public Holidays",
      countdownData,
      description:
        "Bienvenue sur le calendrier officiel des vacances scolaires.",
      content: `../pages/regions/year${of}`,
      vacations: updatedVacations,
      department,
      year: of,
      region_name,
      zone,
      pageURL24,
      pageURL25,
      isActiveURL24,
      isActiveURL25,
      mainHeading,
      subHeading,
      error: error ? error : null,
    });
  } catch (error) {
    console.error("Error fetching data with axios:", error.message);
    res.status(500).send("Error fetching data");
  }
};

module.exports = {
  region,
  commonRegion2024,
};
