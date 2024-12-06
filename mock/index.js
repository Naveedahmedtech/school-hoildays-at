const title =
  "Carte des zones scolaires en France - carte vacances scolaires en France";
const description =
  "Retrouvez la carte des vacances scolaires des nouvelles zones A, B et C.";

const zones = [
  {
    alt: "Académie de Montpellier",
    href: "/academie-montpellier/",
    shape: "poly",
    coords: "320,647,323,640,327,576,413,535",
  },
  {
    alt: "Académie de Paris",
    href: "/academie-paris/",
    shape: "poly",
    coords: "368,153,353,177,357,185,379,190,389,179",
  },
  {
    alt: "Académie de Toulouse",
    href: "/academie-toulouse/",
    shape: "poly",
    coords: "324,641,328,577,414,535,392,486",
  },
  {
    alt: "Académie de Bordeaux",
    href: "/academie-bordeaux/",
    shape: "poly",
    coords: "208,619,194,622,184,609,173,607",
  },
  {
    alt: "Académie de Lyon",
    href: "/academie-lyon/",
    shape: "poly",
    coords: "560,365,552,401,507,403,471,442",
  },
  // Add more zones as needed
];

const zonesData = {
  A: [
    "Besançon",
    "Bordeaux",
    "Clermont-Ferrand",
    "Dijon",
    "Grenoble",
    "Limoges",
    "Lyon",
    "Poitiers",
  ],
  B: [
    "Aix-Marseille",
    "Amiens",
    "Caen",
    "Lille",
    "Nancy-Metz",
    "Nantes",
    "Nice",
    "Orléans-Tours",
    "Reims",
    "Rennes",
    "Rouen",
    "Strasbourg",
  ],
  C: ["Créteil", "Montpellier", "Paris", "Toulouse", "Versailles"],
  Corse: ["Corse"],
};

module.exports = { title, description, zones, zonesData };
