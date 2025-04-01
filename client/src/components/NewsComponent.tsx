import { useEffect, useState } from "react";
import { retrieveNews } from "../api/mainNewsAPI"; 
import "../pages/News.css";

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
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

const NewsComponent = ({ category }: { category?: string }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1); 
  const [totalArticles, setTotalArticles] = useState<number>(0); 
  const articlesPerPage = 12;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await retrieveNews(category, page, articlesPerPage);
        setArticles(data.articles);
        setTotalArticles(data.totalResults);
      } catch (error) {
        console.error("Error fetching news:", error);
        setError("Failed to load news. Please try again later.");
      }
    };

    fetchNews();
    window.scrollTo(0, 0);
  }, [category, page]);

  const totalPages = Math.ceil(totalArticles / articlesPerPage);

  return (
    <div className="news-container">
      <h1 className="news-heading">
        {category ? `${category} News` : "Latest News"}
      </h1>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {articles.length === 0 ? (
        <p>No news available</p>
      ) : (
        <div className="news-grid">
          {articles.map((article, index) => (
            <div key={index} className="news-card">
              {article.urlToImage && (
                <img src={article.urlToImage} alt={article.title} />
              )}
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <p><strong>Published:</strong> {new Date(article.publishedAt).toLocaleDateString()}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            </div>
          ))}
        </div>
      )}

      <div className="pagination">
        <button
          onClick={() => setPage(page > 1 ? page - 1 : page)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage(page < totalPages ? page + 1 : page)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default NewsComponent;