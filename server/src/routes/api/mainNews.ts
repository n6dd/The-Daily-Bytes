import express, { Request, Response } from 'express';
import axios from 'axios';

const router = express.Router();

const MEDIASTACK_API_KEY = process.env.MEDIASTACK_API_KEY;
const BASE_URL = 'http://api.mediastack.com/v1/news';

router.get('/:category?', async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const { page = 1, pageSize = 30 } = req.query;

    const offset = ((+page || 1) - 1) * (+pageSize || 30);

    const params = {
      access_key: MEDIASTACK_API_KEY,
      categories: category || '',
      countries: 'us',
      languages: 'en',
      limit: pageSize,
      offset,
    };

    const response = await axios.get(BASE_URL, { params });

    res.status(200).json({
      articles: response.data.data,
      totalResults: response.data.pagination.total,
    });
  } catch (error: any) {
    console.error('Mediastack API error:', error.message);
    res.status(500).json({ message: 'Failed to fetch news from Mediastack' });
  }
});

export { router as mainNewsRouter };
