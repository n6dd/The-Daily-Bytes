import Auth from '../utils/auth';
// TODO: Import Auth utility for token retrieval
// NOTE: Handles reading the JWT from localStorage to authenticate requests

// ==============================
// TODO: Retrieve paginated news articles from backend Mediastack proxy
// ==============================
const retrieveNews = async (category?: string, page: number = 1, pageSize: number = 30) => {
  try {
    // NOTE: Build API URL for specific category or general news
    const url = category
      ? `/api/media-news/${category}?page=${page}&pageSize=${pageSize}`
      : `/api/media-news?page=${page}&pageSize=${pageSize}`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`, // NOTE: Use JWT to secure backend route
      },
    });

    if (!response.ok) {
      throw new Error(`Invalid API response for ${category || 'main news'}`);
    }

    // NOTE: Parse and return response from backend
    return await response.json();
  } catch (err) {
    console.log(`Error retrieving ${category || 'main'} news:`, err);
    return { articles: [], totalResults: 0 };
  }
};

export { retrieveNews };
// NOTE: Used in components/pages like Home, Technology, Sports, etc.
