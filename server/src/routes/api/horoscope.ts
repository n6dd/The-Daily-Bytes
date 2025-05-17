import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.get('/', async (req, res) => {
  let { zodiacSign } = req.query;
  if(!zodiacSign) {
    zodiacSign = "vergo"
  }

  try {
    const response = await axios.get(
      `https://api.api-ninjas.com/v1/horoscope?zodiac=${zodiacSign}`,
      {
        headers: {
          'X-Api-Key': process.env.API_NINJAS_KEY || '',
        },
      }
    );
   /* const response = await axios.get(
      `https://${process.env.RAPIDAPI_HOST}/api/Detailed-Horoscope`,
      {
        params: { zodiacSign },
        headers: {
          'x-rapidapi-host': process.env.RAPIDAPI_HOST || '',
          'x-rapidapi-key': process.env.RAPIDAPI_KEY || '',
        },
      }
    );*/
    console.log("Data: ", response.data)
    res.json(response.data);
  } catch (err: any) {
    console.log("Err: ", err);
    console.error('Horoscope API error:', err?.response?.data || err.message || err);
    res.status(500).json({ error: 'Failed to fetch horoscope' });
  }
});

export default router;
