require('dotenv').config();
const express = require("express");
const app = express();
const axios = require("axios");

const API_KEY = process.env.API_KEY;

app.use(express.static("public"));

app.get("/api/getImages", async (req, res) => {
  try {
    const response = await axios.get("https://api.nasa.gov/planetary/apod", {
      params: {
        api_key: API_KEY,
        count: 10, 
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data from API:", error);
    res.status(500).json({ error: "Error fetching data from API" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});