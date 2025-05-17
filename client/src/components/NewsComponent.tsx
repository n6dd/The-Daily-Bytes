import { useEffect, useState } from "react";
import { retrieveNews } from "../api/mainNewsAPI";
import "./News.css";
// TODO: Import layout + grid styles for news feed
// NOTE Controls grid display, cards, and pagination visuals

// ==============================
// TODO: Article Types
// ==============================

interface NewsSource {
  id: string | null;
  name: string;
}

interface Article {
  source: NewsSource;
  author: string | null;
  title: string;
  description: string;
  url: string;
  image: string | null;
  publishedAt: string;
  content: string | null;
}

// ==============================
// TODO: News Component
// ==============================

const NewsComponent = ({ category }: { category?: string }) => {
  // NOTE Track article results and fetch state
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalArticles, setTotalArticles] = useState<number>(0);
  const articlesPerPage = 12;

  // TODO: Fetch news from API on page/category change
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await retrieveNews(category?.toLowerCase(), page, articlesPerPage);
        setArticles(data.articles);
        setTotalArticles(data.totalResults);
      } catch (error) {
        console.error("Error fetching news:", error);
        setError("Failed to load news. Please try again later.");
      }
    };

    fetchNews();
    window.scrollTo(0, 0); // NOTE Reset scroll on update
  }, [category, page]);

  const totalPages = Math.ceil(totalArticles / articlesPerPage);

  return (
    <div className="news-container">
      <h1 className="news-heading">
        {category ? `${category} News` : "Latest News"}
      </h1>

      {/* TODO: Display error if fetch fails */}
      {error && <p className="news-error">{error}</p>}

      {/* TODO: Handle empty state vs articles available */}
      {articles.length === 0 ? (
        <p className="no-news">No news available</p>
      ) : (
        <div className="news-grid">
          {articles.map((article, index) => (
            <div key={index} className="news-card">
              {article.image && (
                <img
                  src={article.image}
                  alt={article.title}
                  className="news-image"
                />
              )}
              <div className="news-card-content">
                <h2 className="news-title">{article.title}</h2>
                <p className="news-summary">{article.description}</p>
                <p className="news-date">
                  <strong>Published:</strong>{" "}
                  {new Date(article.publishedAt).toLocaleDateString()}
                </p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="read-more"
                >
                  Read more
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TODO: Pagination Controls */}
      <div className="pagination">
        <button
          onClick={() => setPage(page > 1 ? page - 1 : page)}
          disabled={page === 1}
          aria-label="Previous page"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage(page < totalPages ? page + 1 : page)}
          disabled={page === totalPages}
          aria-label="Next page"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default NewsComponent;
// NOTE Used for all category-specific and general news views
