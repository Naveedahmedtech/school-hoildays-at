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

const home2024 = async (req, res) => {
  const zones = ["Zone A", "Zone B", "Zone C"];
  const year = "2024";

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

    const latestDate = findLatestDateFromAll(allData);
    const updatedWithReturnSchool = setLatestDateToRentrée(
      updatedFirstThreeVacations,
      latestDate
    );

    // Render the page with the holiday ranges and structured data
    res.render("layouts/layout", {
      title: "Home - School and Public Holidays",
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
    });
  } catch (error) {
    console.error("Error fetching data with axios:", error.message);
    res.status(500).send("Error fetching data");
  }
};

const home2025 = async (req, res) => {
  const zones = ["Zone A", "Zone B", "Zone C"];
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

    const latestDate = findLatestDateFromAll(allData);
    const updatedWithReturnSchool = setLatestDateToRentrée(
      updatedFirstThreeVacations,
      latestDate
    );

    // Render the page with the holiday ranges and structured data
    res.render("layouts/layout", {
      title: "Home - School and Public Holidays",
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
    });
  } catch (error) {
    console.error("Error fetching data with axios:", error.message);
    res.status(500).send("Error fetching data");
  }
};

const regions = [
  "Auvergne-Rhône-Alpes",
  "Bourgogne-Franche-Comté",
  "Nouvelle-Aquitaine",
  "Grand Est",
  "Hauts-de-France",
  "Normandie",
  "Pays de la Loire",
  "Bretagne",
  "Centre-Val de Loire",
  "Île-de-France",
  "Occitanie",
  "Provence-Alpes-Côte d'Azur",
  "Guadeloupe",
  "Guyane",
  "Martinique",
  "La Réunion",
  "Mayotte",
];

const academies = [
  "Aix-Marseille",
  "Amiens",
  "Besançon",
  "Bordeaux",
  "Caen",
  "Clermont-Ferrand",
  "Corse",
  "Créteil",
  "Dijon",
  "Grenoble",
  "Guadeloupe",
  "Guyane",
  "Lille",
  "Limoges",
  "Lyon",
  "Martinique",
  "Mayotte",
  "Montpellier",
  "Nancy-Metz",
  "Nantes",
  "Nice",
  "Normandie",
  "Nouvelle Calédonie",
  "Orléans-Tours",
  "Paris",
  "Poitiers",
  "Polynésie",
  "Reims",
  "Rennes",
  "Réunion",
  "Rouen",
  "Saint Pierre et Miquelon",
  "Strasbourg",
  "Toulouse",
  "Versailles",
  "Wallis et Futuna",
];

const search = async (req, res) => {
  const query = req.query.q;
  const fuseOptions = {
    includeScore: true, // Provides relevance score
    threshold: 0.4, // Lower values mean stricter matching
  };
  try {
    // Check if the query matches a region
    const fuseRegions = new Fuse(regions, fuseOptions);
    const fuseAcademies = new Fuse(academies, fuseOptions);

    const resultRegion = fuseRegions.search(query);
    const resultAcademy = fuseAcademies.search(query);

    if (resultRegion.length > 0) {
      res.redirect(
        `/regions/year?of=2024&region_name=${encodeURIComponent(
          resultRegion[0].item
        )}`
      );
    } else if (resultAcademy.length > 0) {
      res.redirect(
        `/regions/year?of=2024&page=academie&region_name=${encodeURIComponent(
          resultAcademy[0].item
        )}`
      );
    } else {
      res.redirect(
        `/regions/year?error="gAAAAABnUq1ClRQ8UBJpcyCGc8RggQjudGnJeliT65OESiGM-_Q2hKwPP5yFPKSkdprREHpdJuyUtUef47dN9HBWHfzmV8HglaP6FLjirMPnN2xQqj0LAkg="&of=2024`
      );
    }
  } catch (error) {
    console.error("Error processing search:", error.message);
    res.status(500).send("Internal server error");
  }
};

const map = async (req, res, next) => {
  try {
    // Render the page with the holiday ranges and structured data
    res.render("layouts/layout", {
      title: "Home - School and Public Holidays",
      description:
        "Bienvenue sur le calendrier officiel des vacances scolaires.",
      content: "../pages/map/map",
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
