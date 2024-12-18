const { descriptionApiParams, BASE_URL } = require("../constants");
const {
  menuData24,
  myZones,
  pageTitle,
  vacation,
  vacation2,
  getOverallDateRange,
  firstThreeVacations,
  lastTwoVacations,
  menuData25,
  regions,
  academies,
  departments
} = require("../utils/home.util");
const {
  fetchHolidayData,
  buildHolidayAPIs,
  mapHolidayDataToRanges,
  updateVacationsWithHolidays,
  updateVacationZones,
  findLatestDateFromAll,
  setLatestDateToRentrée,
} = require("../utils/common");
const Fuse = require("fuse.js");
const axios = require("axios");

const home2024 = async (req, res, next) => {
  const { year = "2024" } = req.query;
  const zones = ["Zone A", "Zone B", "Zone C"];
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

    // Update firstThreeVacations dynamically
    const updatedFirstThreeVacations = updateVacationsWithHolidays(
      firstThreeVacations,
      holidayRanges,
      descriptionApiParams
    );
    const updatedLastTwoVacations = updateVacationsWithHolidays(
      lastTwoVacations,
      holidayRanges,
      descriptionApiParams
    );

    // Update vacation zones dynamically
    const updatedVacation = updateVacationZones(vacation, holidayData);
    const updatedVacation2 = updateVacationZones(vacation2, holidayData);
    
    const allData = [
      updatedFirstThreeVacations,
      updatedLastTwoVacations,
      updatedVacation,
      updatedVacation2,
    ];

    const latestDate = findLatestDateFromAll(allData);
    const updatedWithReturnSchool = setLatestDateToRentrée(
      updatedFirstThreeVacations,
      latestDate
    );
    let scriptContent;
    const response = await axios.get(
      `https://holi-three.vercel.app/api/ads/scripts`
    );
    response.data.ads.forEach((ad) => {
      if (ad.type === "background") {
        scriptContent = ad.script || "";
      }
      //  else if (ad.type === "aside") {
      //   const asideScriptContent = ad.script || "";
      // }
    });
    // Render the page with the holiday ranges and structured data
    res.render("layouts/layout", {
      ////title: "Home - School and Public Holidays",
      description:
        "Bienvenue sur le calendrier officiel des vacances scolaires.",
      content: "../pages/home/home2024",
      menuData: menuData24 || [],
      zones: myZones || [],
      pageTitle: pageTitle || "Default Page Title",
      firstThreeVacations: updatedWithReturnSchool,
      vacation: updatedVacation,
      vacation2: updatedVacation2 || [],
      lastTwoVacations: updatedLastTwoVacations || [],
      countdownData,
      scriptContent: scriptContent || null,
      selectedYear: parseInt(year),
    });
  } catch (error) {
    console.error("Error fetching data with axios:", error);
    // res.status(500).send("Error fetching data");
    next(error);
  }
};

const home2025 = async (req, res, next) => {
  const zones = ["Zone A", "Zone B", "Zone C"];
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

    // console.log("Holiday Date Ranges:", holidayData);

    // Update firstThreeVacations dynamically
    const updatedFirstThreeVacations = updateVacationsWithHolidays(
      firstThreeVacations,
      holidayRanges,
      descriptionApiParams
    );
    const updatedLastTwoVacations = updateVacationsWithHolidays(
      lastTwoVacations,
      holidayRanges,
      descriptionApiParams
    );

    // Update vacation zones dynamically
    const updatedVacation = updateVacationZones(vacation, holidayData);
    const updatedVacation2 = updateVacationZones(vacation2, holidayData);

    const allData = [
      updatedFirstThreeVacations,
      updatedLastTwoVacations,
      updatedVacation,
      updatedVacation2,
    ];

    console.log("allData0", allData);

    const latestDate = findLatestDateFromAll(allData);
    const updatedWithReturnSchool = setLatestDateToRentrée(
      updatedFirstThreeVacations,
      latestDate
    );

    // Render the page with the holiday ranges and structured data
    res.render("layouts/layout", {
      ////title: "Home - School and Public Holidays",
      description:
        "Bienvenue sur le calendrier officiel des vacances scolaires.",
      content: "../pages/home/home2025",
      menuData: menuData25 || [],
      zones: myZones || [],
      pageTitle: pageTitle || "Default Page Title",
      firstThreeVacations: updatedWithReturnSchool,
      vacation: updatedVacation,
      vacation2: updatedVacation2 || [],
      lastTwoVacations: updatedLastTwoVacations || [],
      countdownData,
    });
  } catch (error) {
    console.error("Error fetching data with axios:", error.message);
    // res.status(500).send("Error fetching data");
    next(error);
  }
};


const prioritizeSearchResults = (resultDepartments, resultRegion, resultAcademy) => {
  const allResults = [
    ...resultDepartments.map(result => ({ ...result, type: 'department' })),
    ...resultRegion.map(result => ({ ...result, type: 'region' })),
    ...resultAcademy.map(result => ({ ...result, type: 'academy' })),
  ];

  // Sort by score (ascending)
  const sortedResults = allResults.sort((a, b) => a.score - b.score);

  if (sortedResults.length > 0) {
    const bestResult = sortedResults[0];

    if (bestResult.type === 'department') {
      return `/regions/year?of=2024&page=department&region_name=${encodeURIComponent(
        bestResult.item
      )}&zone=Zone A`;
    } else if (bestResult.type === 'region') {
      return `/regions/year?of=2024&region_name=${encodeURIComponent(
        bestResult.item
      )}&zone=Zone A`;
    } else if (bestResult.type === 'academy') {
      return `/regions/year?of=2024&page=academie&region_name=${encodeURIComponent(
        bestResult.item
      )}&zone=Zone A`;
    }
  }

  // Fallback if no results
  return `/regions/year?error="gAAAAABnUq1ClRQ8UBJpcyCGc8RggQjudGnJeliT65OESiGM-_Q2hKwPP5yFPKSkdprREHpdJuyUtUef47dN9HBWHfzmV8HglaP6FLjirMPnN2xQqj0LAkg="&of=2024&zone=Zone A`;
};

const search = async (req, res, next) => {
  const query = req.query.q;

  const fuseOptions = {
    includeScore: true, // Provides relevance score
    threshold: 0.4, // Lower values mean stricter matching
  };

  try {
    const fuseDepartments = new Fuse(departments, fuseOptions);
    const fuseRegions = new Fuse(regions, fuseOptions);
    const fuseAcademies = new Fuse(academies, fuseOptions);

    const resultDepartments = fuseDepartments.search(query);
    const resultRegion = fuseRegions.search(query);
    const resultAcademy = fuseAcademies.search(query);

    // Use the prioritizeSearchResults function to determine redirection
    const redirectUrl = prioritizeSearchResults(resultDepartments, resultRegion, resultAcademy);
    res.redirect(redirectUrl);
  } catch (error) {
    console.error("Error processing search:", error.message);
    next(error);
  }
};


const map = async (req, res, next) => {
  const countdownData = req?.holidayData?.countdownData;

  try {
    // Render the page with the holiday ranges and structured data
    res.render("layouts/layout", {
      //title: "Home - School and Public Holidays",
      description:
        "Bienvenue sur le calendrier officiel des vacances scolaires.",
      content: "../pages/map/map",
      countdownData,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  home2024,
  home2025,
  search,
  map,
};
