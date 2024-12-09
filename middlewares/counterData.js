const axios = require("axios");
const NodeCache = require("node-cache");
const cron = require("node-cron");

let limitPromise;
let limit;

// Dynamically import `p-limit` and resolve the promise
const initializeLimit = () => {
  if (!limitPromise) {
    limitPromise = import("p-limit").then(({ default: pLimit }) => {
      limit = pLimit(5); // Set the concurrency limit
    });
  }
  return limitPromise;
};

const BASE_URL =
  "https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-calendrier-scolaire/records";
const zones = ["Zone A", "Zone B", "Zone C", "Corse"];
const descriptionApiParams = Object.values({
  Summer_Holidays: "Vacances d'Été",
  Ascension_Day_Holiday: "Pont de l'Ascension",
  Winter_Holidays: "Vacances d'Hiver",
  Christmas_Holidays: "Vacances de Noël",
  Spring_Holidays: "Vacances de Printemps",
  All_Saints_Holidays: "Vacances de la Toussaint",
  Grandes_Vacances: "Grandes Vacances",
  Back_to_School: "Rentrée scolaire",
});

// Initialize cache with a TTL of 1 hour
const holidayCache = new NodeCache({ stdTTL: 3600 });

// Helper to get the current or upcoming year dynamically
const getUpcomingEventYear = () => {
  const today = new Date();
  return today.getMonth() >= 6 ? today.getFullYear() + 1 : today.getFullYear();
};

// Function to fetch events for a specific zone and all descriptions
const fetchEventsForZone = async (zone, year) => {
  try {
    // Build the refine parameters for all descriptions
    const descriptionParams = descriptionApiParams
      .map((description) => `refine=description:"${encodeURIComponent(description)}"`)
      .join("&");

    // Build the API URL
    const url = `${BASE_URL}?limit=100&refine=zones:"${encodeURIComponent(
      zone
    )}"&refine=annee_scolaire:"${year}-${year + 1}"&${descriptionParams}`;

    // Make the API request
    const response = await axios.get(url);

    if (response.data.records.length > 0) {
      // Map results to a standardized format
      return response.data.records.map((record) => ({
        zone,
        description: record.fields.description,
        start_date: record.fields.start_date,
        end_date: record.fields.end_date,
      }));
    }

    return [];
  } catch (error) {
    console.error(`Error fetching events for zone ${zone}:`, error.message);
    return [];
  }
};

// Function to fetch all events for the year
const fetchAllHolidayData = async () => {
  await initializeLimit(); // Ensure `limit` is initialized

  const upcomingYear = getUpcomingEventYear();

  // Fetch data for each zone in parallel
  const fetchPromises = zones.map((zone) =>
    limit(() => fetchEventsForZone(zone, upcomingYear))
  );

  const results = await Promise.all(fetchPromises);

  // Flatten results into a single array
  const events = results.flat();

  if (events.length > 0) {
    const findLatestEvent = (events) => {
      return events.reduce((latest, event) => {
        return new Date(event.end_date) > new Date(latest.end_date)
          ? event
          : latest;
      }, events[0]);
    };

    const latestEvent = findLatestEvent(events);

    const countdownData = zones.map((zone) => {
      const zoneEvents = events.filter((event) => event.zone === zone);

      if (zoneEvents.length > 0) {
        const latestZoneEvent = findLatestEvent(zoneEvents);
        return {
          zone,
          description: latestZoneEvent.description,
          countdown_start_date: latestZoneEvent.start_date,
        };
      }

      return {
        zone,
        description: "No events found",
        countdown_start_date: null,
      };
    });

    return {
      latestEvent,
      countdownData,
    };
  }

  return null;
};

// Function to update holiday data and store it in the cache
const updateHolidayData = async () => {
  try {
    const holidayData = await fetchAllHolidayData();
    if (holidayData) {
      holidayCache.set("holidayData", holidayData);
      console.log("Holiday data updated successfully.");
    } else {
      console.warn("No holiday data available to update.");
    }
  } catch (error) {
    console.error("Error updating holiday data:", error);
  }
};

// Schedule the data fetching task to run every hour
cron.schedule("0 * * * *", updateHolidayData);

// Run the update task immediately on server start
(async () => {
  await initializeLimit(); // Ensure `limit` is initialized before first update
  await updateHolidayData();
})();

// Middleware to fetch holiday data
const fetchHolidayDataMiddleware = (req, res, next) => {
  const holidayData = holidayCache.get("holidayData");
  if (holidayData) {
    req.holidayData = holidayData;
  }
  next();
};

module.exports = fetchHolidayDataMiddleware;
