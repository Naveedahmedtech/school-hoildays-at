let christmasVacationData = [
  {
    link: "/vacances/noel/",
    title: "Vacances de Noël",
    zoneA: "A",
    zoneB: "B",
    zoneC: "C",
    startDate: "samedi 07 décembre 2024",
    endDate: null, // Default value
    className: "zZc off",
    isOff: true,
  },
];
let allSaintsDayVacationData = [
  {
    link: "/vacances/toussaint/",
    title: "Vacances de Toussaint",
    zoneA: "A",
    zoneB: "B",
    zoneC: "C",
    startDate: "samedi 9 octobre 2024",
    endDate: null, // Default value
    className: "zZb off",
    isOff: true,
  },
];
let ascensionVacationData = [
  {
    link: "/vacances/ascension/",
    title: "Pont de l'Ascension 2024",
    zoneA: "A",
    zoneB: "B",
    zoneC: "C",
    startDate: "mercredi 28 mai 2024",
    endDate: null, // Default value
    className: "zZb",
    isOff: false,
  },
];
let longVacationData = [
  {
    link: "/vacances/grandes",
    title: "Grandes Vacances 2024",
    zoneA: "A",
    zoneB: "B",
    zoneC: "C",
    startDate: "samedi 5 juillet 2024",
    endDate: null, // Default value
    className: "zZc",
    isOff: false,
  },
];
let firstThreeVacations = [
  // {
  //   link: "/vacances/rentree-scolaire/",
  //   title: "Rentrée scolaire",
  //   zoneA: "A",
  //   zoneB: "B",
  //   zoneC: "C",
  //   startDate: "lundi 26 septembre 2024",
  //   endDate: null, // Default value
  //   className: "zZa off",
  //   isOff: true,
  // },
  {
    link: "/vacances/toussaint/",
    title: "Vacances de la Toussaint",
    zoneA: "A",
    zoneB: "B",
    zoneC: "C",
    startDate: "samedi 13 octobre 2024",
    endDate: null, // Default value
    className: "zZb off",
    isOff: true,
  },
  {
    link: "/vacances/noel/",
    title: "Vacances de Noël",
    zoneA: "A",
    zoneB: "B",
    zoneC: "C",
    startDate: "samedi 29 décembre 2024",
    endDate: null, // Default value
    className: "zZc off",
    isOff: true,
  },
];

let vacation = {
  link: "/vacances/vacances-d-hiver-vacances-de-fevrier",
  title: "Vacances d'hiver",
  zones: [
    {
      className: "dB",
      zoneClass: "zB",
      zoneName: "Zone B",
      endOfClasses: "samedi 2 février 2024",
      dayOfResumption: "lundi 02 février 2024",
    },
    {
      className: "dC",
      zoneClass: "zC",
      zoneName: "Zone C",
      endOfClasses: "samedi 3 février 2024",
      dayOfResumption: "lundi 03 mars 2024",
    },
    {
      className: "dA",
      zoneClass: "zA",
      zoneName: "Zone A",
      endOfClasses: "samedi 10 février 2024",
      dayOfResumption: "lundi 01 mars 2024",
    },
  ],
};

const vacation2 = {
  link: "/vacances/vacances-de-printemps-vacances-de-paques/",
  title: "Vacances de printemps",
  zones: [
    {
      className: "dB",
      zoneClass: "zB",
      zoneName: "Zone B",
      endOfClasses: "samedi 5 avril 2024",
      dayOfResumption: "mardi 22 avril 2024",
    },
    {
      className: "dC",
      zoneClass: "zC",
      zoneName: "Zone C",
      endOfClasses: "samedi 12 avril 2024",
      dayOfResumption: "lundi 28 avril 2024",
    },
    {
      className: "dA",
      zoneClass: "zA",
      zoneName: "Zone A",
      endOfClasses: "samedi 19 avril 2024",
      dayOfResumption: "lundi 5 mai 2024",
    },
  ],
};

const menuData24 = [
  {
    href: "/",
    id: "actif",
    title: "vacances scolaires 2024",
    text: "2024-2025",
  },
  {
    href: "/annee-2025-2026",
    id: "",
    title: "vacances scolaires 2026",
    text: "2025-2026",
  },
];
const menuData25 = [
  {
    href: "/",
    id: "",
    title: "vacances scolaires 2024",
    text: "2024-2025",
  },
  {
    href: "/annee-2025-2026",
    id: "actif",
    title: "vacances scolaires 2026",
    text: "2025-2026",
  },
];
const myZones = [
  {
    href: "/zones/b-year-2024",
    className: "lesdates b noir f20",
    title: "vacances scolaires zone B",
    text: "Zone B",
  },
  {
    href: "/zones/c-year-2024",
    className: "lesdates b noir f20",
    title: "vacances scolaires zone C",
    text: "Zone C",
  },
  {
    href: "/zones/a-year-2024",
    className: "lesdates b noir f20",
    title: "vacances scolaires zone A",
    text: "Zone A",
  },
];

const pageTitle = "Vacances scolaires 2024-2025";

let lastTwoVacations = [
  {
    link: "/vacances/ascension/",
    title: "Pont de l'Ascension 2024",
    zoneA: "A",
    zoneB: "B",
    zoneC: "C",
    startDate: "mercredi 28 mai 2024",
    endDate: null, // Default value
    className: "zZb",
    isOff: false,
  },
  {
    link: "/vacances/grandes",
    title: "Grandes Vacances 2024",
    zoneA: "A",
    zoneB: "B",
    zoneC: "C",
    startDate: "samedi 5 juillet 2024",
    endDate: null, // Default value
    className: "zZc",
    isOff: false,
  },
];

/**
 * Get the overall earliest start date and latest end date from the raw data.
 * @param {Array} rawData - The raw data fetched from the API
 * @returns {Object} The overall start and end dates
 */
function getOverallDateRange(rawData) {
  let overallStartDate = null;
  let overallEndDate = null;

  rawData.forEach((vacation) => {
    const { start_date, end_date } = vacation;

    // Update the overall start date (earliest date)
    if (
      !overallStartDate ||
      new Date(start_date) < new Date(overallStartDate)
    ) {
      overallStartDate = start_date;
    }

    // Update the overall end date (latest date)
    if (!overallEndDate || new Date(end_date) > new Date(overallEndDate)) {
      overallEndDate = end_date;
    }
  });

  return {
    start_date: overallStartDate,
    end_date: overallEndDate,
  };
}

module.exports = {
  firstThreeVacations,
  vacation,
  vacation2,
  pageTitle,
  myZones,
  menuData24,
  menuData25,
  getOverallDateRange,
  lastTwoVacations,
  christmasVacationData,
  allSaintsDayVacationData,
  ascensionVacationData,
  longVacationData,
};
