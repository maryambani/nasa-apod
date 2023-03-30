const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  const API_KEY = process.env.NASA_API_KEY;
  const API_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=30`;

  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.log("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch data from NASA API" }),
    };
  }
};