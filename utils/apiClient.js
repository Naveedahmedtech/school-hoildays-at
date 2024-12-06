const axios = require("axios");

const apiClient = axios.create({
  baseURL: "https://data.education.gouv.fr/api/",
  timeout: 5000, 
});

module.exports = apiClient;
