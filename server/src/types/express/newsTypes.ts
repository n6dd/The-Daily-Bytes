// TODO: Define structure of the article source returned by NewsAPI
export interface NewsSource {
  id: string | null;
  name: string;
}

// TODO: Define structure of a single news article
export interface Article {
  source: NewsSource;
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

// TODO: Full API response object from NewsAPI
export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

// NOTE Used in both backend proxy response and frontend state typing
