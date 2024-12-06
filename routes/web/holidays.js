const express = require("express");
const router = express.Router();
const axios = require("../../utils/apiClient");
const { API_PARAMS } = require("../../constants");

router.get("/", async (req, res) => {
  try {
    const response = await axios.get("/", { params: API_PARAMS });
    const holidays = response.data.records.map((record) => ({
      name: record.fields.description,
      start_date: record.fields.start_date,
      end_date: record.fields.end_date,
      location: record.fields.location,
      zones: record.fields.zones,
      year: record.fields.annee_scolaire,
    }));

    res.json(holidays);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Error fetching holiday data" });
  }
});

module.exports = router;
