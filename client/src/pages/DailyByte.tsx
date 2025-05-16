import { useState, useEffect } from "react";
import axios from "axios";
import { Article } from '../interfaces/news';
import './DailyByte.css';

// TODO: API Config (NewsAPI Key + Endpoint)
const API_KEY = '4015395bb806438aad160167ee5d03dd';
const BASE_URL = "https://newsapi.org/v2/everything";

// ==============================
// TODO: Personalized News Component
// ==============================

export default function PersonalizedNews() {
  const [topic, setTopic] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  // TODO: Fetch articles from NewsAPI based on topic
  const fetchNews = async () => {
    if (!topic) return;
    setLoading(true);

    try {
      const response = await axios.get<{ articles: Article[] }>(BASE_URL, {
        params: {
          q: topic,
          apiKey: API_KEY,
          language: "en",
          sortBy: "publishedAt",
        },
      });

      generateSummary(response.data.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
    }

    setLoading(false);
  };

  // TODO: Create summary HTML block from top 5 articles
  const generateSummary = (articles: Article[]) => {
    const combinedText = articles
      .slice(0, 5)
      .map(
        (article) =>
          `<a href='${article.url}' target='_blank' class='text-blue-600 hover:underline'>${article.title}</a>: ${article.description || "No description available."}`
      )
      .join(" <br /><br /> ");

    setSummary(combinedText);
  };

  // NOTE: Load topic from localStorage on mount
  useEffect(() => {
    const savedTopic = localStorage.getItem("topic");
    if (savedTopic) {
      setTopic(savedTopic);
      fetchNews();
    }
  }, []);

  // NOTE: Refetch when topic changes (and save to localStorage)
  useEffect(() => {
    if (topic) {
      localStorage.setItem("topic", topic);
      fetchNews();
    }
  }, [topic]);

  return (
    <div className="container">
      {/* TODO: Input for topic selection */}
      <div className="search-bar">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic..."
        />
      </div>

      {/* TODO: Loading indicator */}
      {loading && <p className="loading">Loading news...</p>}

      {/* TODO: Display generated summary */}
      {summary && (
        <div
          className="summary"
          dangerouslySetInnerHTML={{ __html: summary }}
        ></div>
      )}
    </div>
  );
}
