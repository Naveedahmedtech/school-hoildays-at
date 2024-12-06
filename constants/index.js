const BASE_URL =
  "https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-calendrier-scolaire/records";

const API_PARAMS = {
  dataset: "fr-en-calendrier-scolaire",
  rows: 50,
  sort: "end_date",
};

module.exports = {
  API_PARAMS,
};

let descriptionApiParams = {
  Summer_Holidays: "Vacances d'Été",
  Ascension_Day_Holiday: "Pont de l'Ascension",
  Winter_Holidays: "Vacances d'Hiver",
  Christmas_Holidays: "Vacances de Noël",
  Spring_Holidays: "Vacances de Printemps",
  All_Saints_Holidays: "Vacances de la Toussaint",
  Grandes_Vacances: "Grandes Vacances",
  Back_to_School: "Rentrée scolaire",
};



module.exports = {
  descriptionApiParams,
  BASE_URL,
};
