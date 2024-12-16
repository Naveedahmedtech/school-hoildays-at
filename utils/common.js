const axios = require("axios");

// /**
//  * Build API URLs for holidays.
//  * @param {Object} params - Description API parameters and other configurations.
//  * @returns {Object} API URLs mapped by holiday keys.
//  */
// const buildHolidayAPIs = ({ baseURL, zones, year, descriptions, location }) => {
//   return Object.keys(descriptions).reduce((apis, key) => {
//     // Check if the description is "Grandes Vacances"
//     if (
//       key === "Grandes_Vacances" &&
//       descriptions[key] === "Grandes Vacances"
//     ) {
//       // For "Grandes Vacances", use only the "Polynésie" zone
//       apis[
//         key
//       ] = `${baseURL}?refine=zones:Polynésie&refine=description:${descriptions[key]}&refine=start_date:${year}`;
//     } else {
//       // Default case for other descriptions
//       apis[key] = `${baseURL}?refine=zones:${zones.join(
//         "&refine=zones:"
//       )}&refine=description:${descriptions[key]}&refine=start_date:${year}`;
//     }
//     return apis;
//   }, {});
// };


/**
 * Build API URLs for holidays.
 * @param {Object} params - Description API parameters and other configurations.
 * @returns {Object} API URLs mapped by holiday keys.
 */
const buildHolidayAPIs = ({ baseURL, zones, year, descriptions, location }) => {
  console.log({ baseURL, zones, year, descriptions, location });
  return Object.keys(descriptions).reduce((apis, key) => {
    // Base query 
    let query = `${baseURL}?refine=zones:${zones.join(
      "&refine=zones:"
    )}&refine=description:${descriptions[key]}&refine=start_date:${year}&order_by=end_date DESC&limit=1`;

    // Special case for "Grandes Vacances"
    if (
      key === "Grandes_Vacances" &&
      descriptions[key] === "Grandes Vacances"
    ) {
      query = `${baseURL}?refine=zones:Polynésie&refine=description:${descriptions[key]}&refine=start_date:${year}&order_by=end_date DESC&limit=1`;
    }

    // Add location if provided
    if (location) {
      query += `&refine=location:${location}`;
    }

    // Map the built query to the key
    apis[key] = query;
    return apis;
  }, {});
};


/**
 * Fetch holiday data from APIs.
 * @param {Object} apiUrls - Object containing holiday API URLs.
 * @returns {Promise<Object>} Fetched holiday data mapped by holiday keys.
 */
const fetchHolidayData = async (apiUrls) => {
  const keys = Object.keys(apiUrls);
  const urls = Object.values(apiUrls);

  const responses = await Promise.all(
    urls.map((url) =>
      axios
        .get(url)
        .then((res, next) => res.data.results)
        .catch(() => [])
    )
  );

  return keys.reduce((data, key, index) => {
    data[key] = responses[index];
    return data;
  }, {});
};

/**
 * Map holiday data to date ranges.
 * @param {Object} holidayData - Fetched holiday data mapped by keys.
 * @param {Function} dateRangeFn - Function to extract date ranges.
 * @returns {Object} Holiday date ranges mapped by holiday keys.
 */
const mapHolidayDataToRanges = (holidayData, dateRangeFn) => {
  return Object.keys(holidayData).reduce((ranges, key) => {
    const data = holidayData[key];
    if (data.length > 0) {
      const { start_date, end_date } = dateRangeFn(data);
      ranges[key] = { start_date, end_date };
    }
    return ranges;
  }, {});
};

/**
 * Update vacations with mapped holiday data.
 * @param {Array} vacations - List of vacation objects.
 * @param {Object} holidayRanges - Mapped holiday ranges.
 * @param {Object} descriptions - Description mappings.
 * @returns {Array} Updated vacations.
 */
const updateVacationsWithHolidays = (
  vacations,
  holidayRanges,
  descriptions
) => {
  return vacations.map((vacation) => {
    const holidayKey = Object.keys(descriptions).find((key) =>
      vacation.title.toLowerCase().includes(descriptions[key].toLowerCase())
    );
    if (holidayKey && holidayRanges[holidayKey]) {
      const { start_date, end_date } = holidayRanges[holidayKey];
      vacation.startDate = new Date(start_date).toLocaleDateString("fr-FR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      vacation.endDate = new Date(end_date).toLocaleDateString("fr-FR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }

    return vacation;
  });
};

/**
 * Update zones for vacation with start and end dates directly from holiday data.
 * @param {Object} vacation - Vacation object containing zones.
 * @param {Object} holidayData - Holiday data directly mapped by holiday keys.
 * @returns {Object} Updated vacation object with zones updated.
 */
const updateVacationZones = (vacation, holidayData) => {
  const updatedZones = vacation.zones.map((zone) => {
    // Filter holidayData to find the relevant record for the zone
    const matchingHoliday = Object.values(holidayData)
      .flat()
      .find(
        (holiday) => holiday.zones.toLowerCase() === zone.zoneName.toLowerCase()
      );

    if (matchingHoliday) {
      // Update zone dates
      zone.endOfClasses = new Date(
        matchingHoliday.start_date
      ).toLocaleDateString("fr-FR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      zone.dayOfResumption = new Date(
        matchingHoliday.end_date
      ).toLocaleDateString("fr-FR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }

    return zone;
  });

  return { ...vacation, zones: updatedZones };
};

/**
 * Transform holiday data into a single array object with the earliest start and latest end date.
 * @param {Array} data - The raw response data from the API.
 * @returns {Array} Transformed vacation data with consolidated date range.
 */
const transformToEarliestAndLatestDate = (data, mockData) => {
  // Find the earliest start date and latest end date
  const { earliestStart, latestEnd } = data.reduce(
    (acc, item) => {
      const startDate = new Date(item.start_date);
      const endDate = new Date(item.end_date);

      if (!acc.earliestStart || startDate < acc.earliestStart) {
        acc.earliestStart = startDate;
      }
      if (!acc.latestEnd || endDate > acc.latestEnd) {
        acc.latestEnd = endDate;
      }

      return acc;
    },
    { earliestStart: null, latestEnd: null }
  );

  // Create the consolidated vacation data structure
  return [
    {
      link: mockData[0]?.link,
      title: mockData[0]?.title,
      zoneA: mockData[0]?.zoneA,
      zoneB: mockData[0]?.zoneB,
      zoneC: mockData[0]?.zoneC,
      startDate: earliestStart
        ? earliestStart.toLocaleDateString("fr-FR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "N/A",
      endDate: latestEnd
        ? latestEnd.toLocaleDateString("fr-FR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "N/A",
      className: mockData[0]?.className,
      isOff: mockData[0]?.isOff,
    },
  ];
};

/**
 * Find the latest date from all vacation-related data.
 * @param {Array} datasets - Array of datasets to process.
 * @returns {string|null} The latest date in "DD/MM/YYYY" format or null if no valid date is found.
 */
const findLatestDateFromAll = (datasets) => {
  let latestDate = null;

  datasets.forEach((data) => {
    // Process each dataset based on its structure
    if (Array.isArray(data)) {
      data.forEach((item) => {
        // Handle objects with zones or direct endDate/startDate
        if (item.zones) {
          item.zones.forEach((zone) => {
            const date = new Date(zone.dayOfResumption || zone.endOfClasses);
            if (!isNaN(date) && (!latestDate || date > latestDate)) {
              latestDate = date;
            }
          });
        } else if (item.endDate) {
          const date = new Date(item.endDate);
          if (!isNaN(date) && (!latestDate || date > latestDate)) {
            latestDate = date;
          }
        }
      });
    } else if (data.zones) {
      // Handle single vacation object with zones
      data.zones.forEach((zone) => {
        const date = new Date(zone.dayOfResumption || zone.endOfClasses);
        if (!isNaN(date) && (!latestDate || date > latestDate)) {
          latestDate = date;
        }
      });
    }
  });

  // Format the latest date as "DD/MM/YYYY"
  return latestDate
    ? latestDate.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : null;
};


const setLatestDateToRentrée = (vacations, latestDate) => {
  // Find the "Rentrée scolaire" object and update its endDate
  return vacations.map((vacation) => {
    if (vacation.title === "Rentrée scolaire") {
      console.log("vacation: ", vacation)
      return {
        ...vacation,
        endDate: latestDate, // Set the latest date
      };
    }
    return vacation;
  });
};

module.exports = {
  buildHolidayAPIs,
  fetchHolidayData,
  mapHolidayDataToRanges,
  updateVacationsWithHolidays,
  updateVacationZones,
  transformToEarliestAndLatestDate,
  findLatestDateFromAll,
  setLatestDateToRentrée
};
