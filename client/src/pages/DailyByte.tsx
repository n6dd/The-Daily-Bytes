import { useState, useEffect } from "react";
import axios from "axios";
import { Article } from '../interfaces/news';
import './DailyByte.css';

const API_KEY = process.env.NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2/everything";

export default function PersonalizedNews() {
  const [topic, setTopic] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    const savedTopic = localStorage.getItem("topic");
    if (savedTopic) {
      setTopic(savedTopic);
      fetchNews();
    }
  }, []);

  useEffect(() => {
    if (topic) {
      localStorage.setItem("topic", topic);
      fetchNews();
    }
  }, [topic]);

  return (
    <div className="container">
      <div className="search-bar">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic..."
        />
      </div>
      {loading && <p className="loading">Loading news...</p>}
      {summary && (
        <div className="summary" dangerouslySetInnerHTML={{ __html: summary }}></div>
      )}
    </div>
  );
}