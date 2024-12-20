let christmasVacationData = [
  {
    link: "/vacances/noel/",
    title: "Vacances de Noël",
    zoneA: "A",
    zoneB: "B",
    zoneC: "C",
    startDate: "samedi 07 décembre ",
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
    startDate: "samedi 9 octobre ",
    endDate: null, // Default value
    className: "zZb off",
    isOff: true,
  },
];
let ascensionVacationData = [
  {
    link: "/vacances/ascension/",
    title: "Pont de l'Ascension ",
    zoneA: "A",
    zoneB: "B",
    zoneC: "C",
    startDate: "mercredi 28 mai ",
    endDate: null, // Default value
    className: "zZb",
    isOff: false,
  },
];
let longVacationData = [
  {
    link: "/vacances/grandes",
    title: "Grandes Vacances ",
    zoneA: "A",
    zoneB: "B",
    zoneC: "C",
    startDate: "samedi 5 juillet ",
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
  //   startDate: "lundi 26 septembre ",
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
    startDate: "samedi 13 octobre ",
    endDate: null, // Default value
    className: "zZb",
    isOff: false,
  },
  {
    link: "/vacances/noel/",
    title: "Vacances de Noël",
    zoneA: "A",
    zoneB: "B",
    zoneC: "C",
    startDate: "samedi 29 décembre ",
    endDate: null, // Default value
    className: "zZc",
    isOff: false,
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
      endOfClasses: "samedi 2 février ",
      dayOfResumption: "lundi 02 février ",
    },
    {
      className: "dC",
      zoneClass: "zC",
      zoneName: "Zone C",
      endOfClasses: "samedi 3 février ",
      dayOfResumption: "lundi 03 mars ",
    },
    {
      className: "dA",
      zoneClass: "zA",
      zoneName: "Zone A",
      endOfClasses: "samedi 10 février ",
      dayOfResumption: "lundi 01 mars ",
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
      endOfClasses: "samedi 5 avril ",
      dayOfResumption: "mardi 22 avril ",
    },
    {
      className: "dC",
      zoneClass: "zC",
      zoneName: "Zone C",
      endOfClasses: "samedi 12 avril ",
      dayOfResumption: "lundi 28 avril ",
    },
    {
      className: "dA",
      zoneClass: "zA",
      zoneName: "Zone A",
      endOfClasses: "samedi 19 avril ",
      dayOfResumption: "lundi 5 mai ",
    },
  ],
};

const menuData24 = [
  {
    href: "/",
    id: "actif",
    title: "vacances scolaires ",
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
    title: "vacances scolaires",
    text: "2024-2025",
  },
  {
    href: "/annee-2025-2026",
    id: "actif",
    title: "vacances scolaires",
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

const pageTitle = "school_holidays";

let lastTwoVacations = [
  {
    link: "/vacances/ascension/",
    title: "Pont de l'Ascension ",
    zoneA: "A",
    zoneB: "B",
    zoneC: "C",
    startDate: "mercredi 28 mai ",
    endDate: null, // Default value
    className: "zZb",
    isOff: false,
  },
  {
    link: "/vacances/grandes",
    title: "Grandes Vacances ",
    zoneA: "A",
    zoneB: "B",
    zoneC: "C",
    startDate: "samedi 5 juillet ",
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
  regions,
  academies,
};
