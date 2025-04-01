import express from 'express';
import axios from 'axios';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const BASE_URL = 'https://newsapi.org/v2/top-headlines';
const API_KEY = process.env.NEWS_API_KEY;

router.get('/:category?', async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const { page = 1, pageSize = 30 } = req.query; 

    console.log(`Fetching news for category: ${category || 'general'} | Page: ${page} | PageSize: ${pageSize}`);

    const response = await axios.get(BASE_URL, {
      params: {
        country: 'us',
        category: category || 'general',
        page, 
        pageSize, 
        apiKey: API_KEY,
      },
    });

    res.status(200).json(response.data);
  } catch (error: any) {
    console.error(`Error fetching news for ${req.params.category}:`, error.message);
    res.status(error.response?.status || 500).json({ message: 'Failed to fetch news' });
  }
});

export { router as mainNewsRouter };