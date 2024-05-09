const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const FORMSPREE_API_URL = process.env.FORMSPREE_API_URL;
const API_REQUEST_INTERVAL = 30 * 60 * 1000;
let lastApiRequestTime = 0;

module.exports = async (req, res) => {
  const currentTime = Date.now();
  if (currentTime - lastApiRequestTime < API_REQUEST_INTERVAL) {
    return res.status(429).json({ error: 'Забагато запитів на відправку.' });
  }

  try {
    const response = await axios.post(FORMSPREE_API_URL, req.body);
    lastApiRequestTime = currentTime;
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Помилка відправки запиту.' });
  }
};