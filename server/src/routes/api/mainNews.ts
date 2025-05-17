import express, { Request, Response } from 'express';
import axios from 'axios';

const router = express.Router();

const MEDIASTACK_API_KEY = process.env.MEDIASTACK_API_KEY;
const BASE_URL = 'http://api.mediastack.com/v1/news';

router.get('/:category?', async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const page = Math.max(1, parseInt(req.query.page as string, 10) || 1);
    const PER_PAGE = 12;
    const FETCH_MULTIPLIER = 3;
    const fetchLimit = PER_PAGE * FETCH_MULTIPLIER;

    // ← Use fetchLimit here to avoid overlapping pages
    const offset = (page - 1) * fetchLimit;

    const params = {
      access_key: MEDIASTACK_API_KEY,
      categories: category || '',
      countries: 'us',
      languages: 'en',
      limit: fetchLimit,
      offset,
    };

    console.log('🔍 Fetching Mediastack with params:', params);
    const response = await axios.get(BASE_URL, { params });
    const raw = response.data.data as any[];
    const reportedTotal = response.data.pagination.total;

    // 1️⃣ Only articles with valid http(s) images
    const withValidImage = raw.filter(a =>
      typeof a.image === 'string' && /^https?:\/\//.test(a.image)
    );

    // 2️⃣ Dedupe by URL
    const unique: typeof withValidImage = [];
    const seenUrls = new Set<string>();
    for (const article of withValidImage) {
      if (!seenUrls.has(article.url)) {
        seenUrls.add(article.url);
        unique.push(article);
      }
    }

    console.log(`🔸 After filter & dedupe: ${unique.length}`);

    // 3️⃣ Take exactly 12
    const pageArticles = unique.slice(0, PER_PAGE);

    res.status(200).json({
      articles: pageArticles,      // up to 12 unique, valid‐image cards
      page,
      perPage: PER_PAGE,
      totalResults: reportedTotal, // still use Mediastack’s real total
    });
  } catch (error: any) {
    console.error('Mediastack API error:', error.message);
    res.status(500).json({ message: 'Failed to fetch news from Mediastack' });
  }
});

export default router;
