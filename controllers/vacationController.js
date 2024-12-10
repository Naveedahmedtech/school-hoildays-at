const { descriptionApiParams, BASE_URL } = require("../constants");
const axios = require("axios");
const {
  vacation,
  vacation2,
  christmasVacationData,
  getOverallDateRange,
  allSaintsDayVacationData,
  longVacationData,
  ascensionVacationData,
  myZones,
} = require("../utils/home.util");
const {
  updateVacationZones,
  fetchHolidayData,
  updateVacationsWithHolidays,
  mapHolidayDataToRanges,
  transformToEarliestAndLatestDate,
} = require("../utils/common");

const winterFebVacation = async (req, res, next) => {
  const zones = ["Zone A", "Zone B", "Zone C"];
  const year = { 2024: "2024", 2025: "2025", 2026: "2026" };
  const countdownData = req?.holidayData?.countdownData;


  try {
    console.log("Fetching data using axios w...");
    const API_URL_2024 = `${BASE_URL}/?refine=zones:${zones.join(
      "&refine=zones:"
    )}&refine=description:${
      descriptionApiParams.Winter_Holidays
    }&refine=start_date:${year["2024"]}&order_by=end_date DESC&limit=1`;
    const API_URL_2025 = `${BASE_URL}/?refine=zones:${zones.join(
      "&refine=zones:"
    )}&refine=description:${
      descriptionApiParams.Winter_Holidays
    }&refine=start_date:${year["2025"]}&order_by=end_date DESC&limit=1`;
    const API_URL_2026 = `${BASE_URL}/?refine=zones:${zones.join(
      "&refine=zones:"
    )}&refine=description:${
      descriptionApiParams.Winter_Holidays
    }&refine=start_date:${year["2026"]}&order_by=end_date DESC&limit=1`;

    const response24 = await axios(API_URL_2024);
    const response25 = await axios(API_URL_2025);
    const response26 = await axios(API_URL_2026);
    const updatedVacation2024 = updateVacationZones(
      vacation,
      response24?.data.results
    );
    const updatedVacation2025 = updateVacationZones(
      vacation,
      response25?.data.results
    );
    const updatedVacation2026 = updateVacationZones(
      vacation,
      response26?.data.results
    );

    console.log("response", updatedVacation2024);

    res.render("layouts/layout", {
      title: "Home - School and Public Holidays",
      description:
        "Bienvenue sur le calendrier officiel des vacances scolaires.",
      content: "../pages/vacation/winter-vacation-february-vacation",
      vacation2024: updatedVacation2024,
      vacation2025: updatedVacation2025,
      vacation2026: updatedVacation2026,
      zones: myZones,
      countdownData
    });
  } catch (error) {
    console.error("Error fetching data with axios:", error.message);
    // res.status(500).send("Error fetching data");
    next(error)
  }
};
const springVacation = async (req, res, next) => {
  const zones = ["Zone A", "Zone B", "Zone C"];
  const year = { 2024: "2024", 2025: "2025", 2026: "2026" };
  const countdownData = req?.holidayData?.countdownData;


  try {
    console.log("Fetching data using axios w...");
    const API_URL_2024 = `${BASE_URL}/?refine=zones:${zones.join(
      "&refine=zones:"
    )}&refine=description:${
      descriptionApiParams.Spring_Holidays
    }&refine=start_date:${year["2024"]}&order_by=end_date DESC&limit=1`;
    const API_URL_2025 = `${BASE_URL}/?refine=zones:${zones.join(
      "&refine=zones:"
    )}&refine=description:${
      descriptionApiParams.Spring_Holidays
    }&refine=start_date:${year["2025"]}&order_by=end_date DESC&limit=1`;
    const API_URL_2026 = `${BASE_URL}/?refine=zones:${zones.join(
      "&refine=zones:"
    )}&refine=description:${
      descriptionApiParams.Spring_Holidays
    }&refine=start_date:${year["2026"]}&order_by=end_date DESC&limit=1`;

    const response24 = await axios(API_URL_2024);
    const response25 = await axios(API_URL_2025);
    const response26 = await axios(API_URL_2026);
    const updatedVacation2024 = updateVacationZones(
      vacation2,
      response24?.data.results
    );
    const updatedVacation2025 = updateVacationZones(
      vacation2,
      response25?.data.results
    );
    const updatedVacation2026 = updateVacationZones(
      vacation2,
      response26?.data.results
    );

    console.log("response", updatedVacation2024);

    res.render("layouts/layout", {
      title: "Home - School and Public Holidays",
      description:
        "Bienvenue sur le calendrier officiel des vacances scolaires.",
      content: "../pages/vacation/vacances-de-printemps-vacances-de-paques",
      vacation2024: updatedVacation2024,
      vacation2025: updatedVacation2025,
      vacation2026: updatedVacation2026,
      zones: myZones,
      countdownData
    });
  } catch (error) {
    console.error("Error fetching data with axios:", error.message);
    // res.status(500).send("Error fetching data");
    next(error)
  }
};

  

const christmasVacation = async (req, res, next) => {
  const zones = ["Zone A", "Zone B", "Zone C"];
  const year = { 2024: "2024", 2025: "2025", 2026: "2026" };
  const countdownData = req?.holidayData?.countdownData;


  try {
    console.log("Fetching data using axios w...");
    const API_URL_2024 = `${BASE_URL}/?refine=zones:${zones.join(
      "&refine=zones:"
    )}&refine=description:${
      descriptionApiParams.Christmas_Holidays
    }&refine=start_date:${year["2024"]}&order_by=end_date DESC&limit=1`;
    const API_URL_2025 = `${BASE_URL}/?refine=zones:${zones.join(
      "&refine=zones:"
    )}&refine=description:${
      descriptionApiParams.Christmas_Holidays
    }&refine=start_date:${year["2025"]}&order_by=end_date DESC&limit=1`;

    const API_URL_2026 = `${BASE_URL}/?refine=zones:${zones.join(
      "&refine=zones:"
    )}&refine=description:${
      descriptionApiParams.Christmas_Holidys
    }&refine=start_date:${year["2026"]}&order_by=end_date DESC&limit=1`;

    // Fetch holiday data
    const response24 = await axios(API_URL_2024);
    const response25 = await axios(API_URL_2025);
    const response26 = await axios(API_URL_2026);
    const christmasVacationData24 = transformToEarliestAndLatestDate(response24.data.results, christmasVacationData);
    const christmasVacationData25 = transformToEarliestAndLatestDate(response25.data.results, christmasVacationData);
    const christmasVacationData26 = transformToEarliestAndLatestDate(response26.data.results, christmasVacationData);
    res.render("layouts/layout", {
      title: "Home - School and Public Holidays",
      description:
        "Bienvenue sur le calendrier officiel des vacances scolaires.",
      content: "../pages/vacation/christmas-vacation",
      vacation2024: christmasVacationData24,
      vacation2025: christmasVacationData25,
      vacation2026: christmasVacationData26,
      zones: myZones,
      countdownData
    });
  } catch (error) {
    console.error("Error fetching data with axios:", error.message);
    // res.status(500).send("Error fetching data");
    next(error)
  }
};


const allSaintsDayVacation = async (req, res, next) => {
    const zones = ["Zone A", "Zone B", "Zone C"];
    const year = { 2024: "2024", 2025: "2025", 2026: "2026" };
  const countdownData = req?.holidayData?.countdownData;

  
    try {
      console.log("Fetching data using axios w...");
      const API_URL_2024 = `${BASE_URL}/?refine=zones:${zones.join(
        "&refine=zones:"
      )}&refine=description:${
        descriptionApiParams.Ascension_Day_Holiday
      }&refine=start_date:${year["2024"]}&order_by=end_date DESC&limit=1`;
      const API_URL_2025 = `${BASE_URL}/?refine=zones:${zones.join(
        "&refine=zones:"
      )}&refine=description:${
        descriptionApiParams.Ascension_Day_Holiday
      }&refine=start_date:${year["2025"]}&order_by=end_date DESC&limit=1`;
  
      const API_URL_2026 = `${BASE_URL}/?refine=zones:${zones.join(
        "&refine=zones:"
      )}&refine=description:${
        descriptionApiParams.Ascension_Day_Holiday
      }&refine=start_date:${year["2026"]}&order_by=end_date DESC&limit=1`;
  
      // Fetch holiday data
      const response24 = await axios(API_URL_2024);
      const response25 = await axios(API_URL_2025);
      const response26 = await axios(API_URL_2026);
      const ascensionVacationData24 = transformToEarliestAndLatestDate(response24.data.results, ascensionVacationData);
      const ascensionVacationData25 = transformToEarliestAndLatestDate(response25.data.results, ascensionVacationData);
      const ascensionVacationData26 = transformToEarliestAndLatestDate(response26.data.results, ascensionVacationData);
      res.render("layouts/layout", {
        title: "Home - School and Public Holidays",
        description:
          "Bienvenue sur le calendrier officiel des vacances scolaires.",
        content: "../pages/vacation/all-saint-holidays",
        vacation2024: ascensionVacationData24,
        vacation2025: ascensionVacationData25,
        vacation2026: ascensionVacationData26,
        zones: myZones,
        countdownData
      });
    } catch (error) {
      console.error("Error fetching data with axios:", error.message);
      // res.status(500).send("Error fetching data");
      next(error)
    }
  };

const ascensionVacation = async (req, res, next) => {
    const zones = ["Zone A", "Zone B", "Zone C"];
    const year = { 2024: "2024", 2025: "2025", 2026: "2026" };
  const countdownData = req?.holidayData?.countdownData;

  
    try {
      console.log("Fetching data using axios w...");
      const API_URL_2024 = `${BASE_URL}/?refine=zones:${zones.join(
        "&refine=zones:"
      )}&refine=description:${
        descriptionApiParams.All_Saints_Holidays
      }&refine=start_date:${year["2024"]}&order_by=end_date DESC&limit=1`;
      const API_URL_2025 = `${BASE_URL}/?refine=zones:${zones.join(
        "&refine=zones:"
      )}&refine=description:${
        descriptionApiParams.All_Saints_Holidays
      }&refine=start_date:${year["2025"]}&order_by=end_date DESC&limit=1`;
  
      const API_URL_2026 = `${BASE_URL}/?refine=zones:${zones.join(
        "&refine=zones:"
      )}&refine=description:${
        descriptionApiParams.All_Saints_Holidays
      }&refine=start_date:${year["2026"]}&order_by=end_date DESC&limit=1`;
  
      // Fetch holiday data
      const response24 = await axios(API_URL_2024);
      const response25 = await axios(API_URL_2025);
      const response26 = await axios(API_URL_2026);
      const allSaintsDayVacationData24 = transformToEarliestAndLatestDate(response24.data.results, allSaintsDayVacationData);
      const allSaintsDayVacationData25 = transformToEarliestAndLatestDate(response25.data.results, allSaintsDayVacationData);
      const allSaintsDayVacationData26 = transformToEarliestAndLatestDate(response26.data.results, allSaintsDayVacationData);
      res.render("layouts/layout", {
        title: "Home - School and Public Holidays",
        description:
          "Bienvenue sur le calendrier officiel des vacances scolaires.",
        content: "../pages/vacation/ascension",
        vacation2024: allSaintsDayVacationData24,
        vacation2025: allSaintsDayVacationData25,
        vacation2026: allSaintsDayVacationData26,
        zones: myZones,
        countdownData
      });
    } catch (error) {
      console.error("Error fetching data with axios:", error.message);
      // res.status(500).send("Error fetching data");
      next(error)
    }
  };



  const longVacation = async (req, res, next) => {
    const zone = "Polynésie";
    const year = { 2024: "2024", 2025: "2025", 2026: "2026" };
  const countdownData = req?.holidayData?.countdownData;

  
    try {
      console.log("Fetching data using axios w...");
      const API_URL_2024 = `${BASE_URL}/?refine=zones:${zone}&refine=description:${
        descriptionApiParams.Grandes_Vacances
      }&refine=start_date:${year["2024"]}&order_by=end_date DESC&limit=1`;
      const API_URL_2025 = `${BASE_URL}/?refine=zones:${zone}&refine=description:${
        descriptionApiParams.Grandes_Vacances
      }&refine=start_date:${year["2025"]}&order_by=end_date DESC&limit=1`;
  
      const API_URL_2026 = `${BASE_URL}/?refine=zones:${zone}&refine=description:${
        descriptionApiParams.Grandes_Vacances
      }&refine=start_date:${year["2026"]}&order_by=end_date DESC&limit=1`;
  
      // Fetch holiday data
      const response24 = await axios(API_URL_2024);
      const response25 = await axios(API_URL_2025);
      const response26 = await axios(API_URL_2026);
      const longVacationData24 = transformToEarliestAndLatestDate(response24.data.results, longVacationData);
      const longVacationData25 = transformToEarliestAndLatestDate(response25.data.results, longVacationData);
      const longVacationData26 = transformToEarliestAndLatestDate(response26.data.results, longVacationData);
      res.render("layouts/layout", {
        title: "Home - School and Public Holidays",
        description:
          "Bienvenue sur le calendrier officiel des vacances scolaires.",
        content: "../pages/vacation/long-vacation",
        vacation2024: longVacationData24,
        vacation2025: longVacationData25,
        vacation2026: longVacationData26,
        zones: myZones,
        countdownData
      });
    } catch (error) {
      console.error("Error fetching data with axios:", error.message);
      // res.status(500).send("Error fetching data");
      next(error)
    }
  };

module.exports = {
  winterFebVacation,
  springVacation,
  christmasVacation,
  allSaintsDayVacation,
  ascensionVacation,
  longVacation
};
