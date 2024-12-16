const axios = require("axios");

const BASE_URL =
  "https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-calendrier-scolaire/records";
const zones = ["Zone A", "Zone B", "Zone C", "Corse"];
const descriptionApiParams = {
  Summer_Holidays: "Vacances d'Été",
  Ascension_Day_Holiday: "Pont de l'Ascension",
  Winter_Holidays: "Vacances d'Hiver",
  Christmas_Holidays: "Vacances de Noël",
  Spring_Holidays: "Vacances de Printemps",
  All_Saints_Holidays: "Vacances de la Toussaint",
  Grandes_Vacances: "Grandes Vacances",
  Back_to_School: "Rentrée scolaire",
};

// Helper to get the current or upcoming year dynamically
const getUpcomingEventYear = () => {
  const today = new Date();
  return today.getMonth() >= 6 ? today.getFullYear() + 1 : today.getFullYear();
};

// Helper to calculate start and end dates dynamically
const getDateRangeForYear = (year) => {
  const startDate = `${year}-01-01T00:00:00`;
  const endDate = `${year}-12-31T23:59:59`;
  return { startDate, endDate };
};

// Function to fetch events for each zone and description
const fetchEventsForZoneAndDescription = async (zone, description, year) => {
  const { startDate, endDate } = getDateRangeForYear(year);

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        "[refine:zones]": zone,
        '[refine:description]': description,
        '[refine:annee_scolaire]': "2024-2025",
        where: start_date >= `'${startDate}' AND start_date <= '${endDate}'`,
        order_by: "start_date ASC",
        limit: 1,
      },
    });

    if (response.data.results.length > 0) {
      const event = response.data.results[0];
      return {
        zone,
        description,
        start_date: event.start_date,
        end_date: event.end_date,
      };
    }

    return null;
  } catch (error) {
    console.error(
      `Error fetching events for ${zone} (${description}):,
      error.message`
    );
    return null;
  }
};

// Middleware to fetch and process events
const fetchHolidayDataMiddleware = async (req, res, next) => {
  const upcomingYear = getUpcomingEventYear();
  const events = [];

  for (let zone of zones) {
    for (let description of Object.values(descriptionApiParams)) {
      const event = await fetchEventsForZoneAndDescription(
        zone,
        description,
        upcomingYear
      );
      if (event) {
        events.push(event);
      }
    }
  }

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
  const holidayData = {
    latestEvent,
    countdownData,
  };
  // Attach data to res.locals for use in routes or views
  req.holidayData = holidayData;

  next(); // Proceed to the next middleware or route handler
};

module.exports = fetchHolidayDataMiddleware;
