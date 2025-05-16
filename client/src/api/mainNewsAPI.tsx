import Auth from '../utils/auth';
// TODO: Import Auth utility for token retrieval
// NOTE This handles reading the JWT from storage to authenticate the user

// TODO: Retrieve paginated news articles from backend API
const retrieveNews = async (category?: string, page: number = 1, pageSize: number = 30) => {
  try {
    // NOTE Build dynamic URL based on whether a category is provided
    const url = category
      ? `/api/news/${category}?page=${page}&pageSize=${pageSize}`
      : `/api/news?page=${page}&pageSize=${pageSize}`;

    // NOTE Send GET request with authorization header using bearer token
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    });

    // NOTE Throw error if the response is not 2xx
    if (!response.ok) {
      throw new Error(`Invalid API response for ${category || 'main news'}`);
    }

    // NOTE Return parsed JSON response (expected to include articles array and count)
    return await response.json();
  } catch (err) {
    // TODO: Handle API errors gracefully with fallback result
    console.log(`Error retrieving ${category || 'main'} news:`, err);
    return { articles: [], totalResults: 0 };
  }
};

export { retrieveNews };
// NOTE Exported for use in pages like Home, Technology, etc.
