import express from 'express';
import axios from 'axios'; // TODO: Use axios for proper response parsing and error handling
import type { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config(); // TODO: Load environment variables from .env

const router = express.Router();

// ==============================
// TODO: External API Setup
// ==============================
const BASE_URL = 'https://newsapi.org/v2/top-headlines';
const API_KEY = process.env.NEWS_API_KEY;

// ==============================
// Route: /api/news/:category?
// ==============================
router.get('/:category?', async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const { page = 1, pageSize = 30 } = req.query;

    // NOTE Build full query URL with fallback to 'general' category
    const params = {
      country: 'us',
      category: category || 'general',
      page,
      pageSize,
      apiKey: API_KEY,
    };

    console.log(`Fetching news → Category: ${params.category}, Page: ${page}, PageSize: ${pageSize}`);

    const response = await axios.get(BASE_URL, { params });

    // TODO: Send parsed articles and metadata to frontend
    res.status(200).json(response.data);
  } catch (error: any) {
    console.error(`Error fetching news for ${req.params.category}:`, error.message);
    res.status(error.response?.status || 500).json({ message: 'Failed to fetch news' });
  }
});

export { router as mainNewsRouter };
// NOTE Mounted in api/index.ts → /api/news
