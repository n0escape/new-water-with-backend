const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FORMSPREE_API_URL = process.env.FORMSPREE_API_URL;

app.use(express.json());

// middleware cors для установки заголовков CORS
app.use(cors({
  origin: 'http://localhost:3000/', // url разрешенного сайта
}));

// логика ограничения частоты запросов к внешнему API
let lastApiRequestTime = 0;
const API_REQUEST_INTERVAL = 30 * 60 * 1000; // 30 минут в миллисекундах

app.post('/api/send-message', async (req, res) => {
  const currentTime = Date.now();
  if (currentTime - lastApiRequestTime < API_REQUEST_INTERVAL) {
    return res.status(429).json({ error: 'Забагато запитів на відправку.' });
  }

  try {
    const response = await axios.post(FORMSPREE_API_URL, req.body);
    lastApiRequestTime = currentTime; // Обновляем время последнего запроса
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Помилка відправки запиту.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
