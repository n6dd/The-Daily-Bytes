import express, { Request, Response } from 'express';
import axios from 'axios';

const router = express.Router();

// ==============================
// GET /api/horoscope/:sign
// ==============================

router.get('/:sign', async (req: Request, res: Response) => {
  const { sign } = req.params;

  try {
    // Aztro requires a POST with sign & day in the URL
    const response = await axios.post(
      `https://aztro.sameerkumar.website/?sign=${sign}&day=today`,
      null,
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );

    const { description, lucky_number, mood } = response.data;

    // Return simplified horoscope payload
    res.status(200).json({
      text: description,
      luckyNumber: parseInt(lucky_number),
      mood,
    });
  } catch (error: any) {
    console.error(`Horoscope fetch failed for ${sign}:`, error.message);
    res.status(500).json({ message: 'Failed to retrieve horoscope.' });
  }
});

export { router as horoscopeRouter };
