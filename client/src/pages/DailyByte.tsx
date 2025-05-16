import { useState, useEffect } from "react";
import axios from "axios";
import { Article } from '../interfaces/news';
import './DailyByte.css';

// ==============================
// TODO: Mediastack API Config
// ==============================
const API_KEY = 'afcb3a83e50a4d8d3fdf16023d468eab';
const BASE_URL = "http://api.mediastack.com/v1/news";

// ==============================
// TODO: Personalized News Page
// ==============================

export default function PersonalizedNews() {
  const [topic, setTopic] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchNews = async () => {
    if (!topic) return;
    setLoading(true);

    try {
      const response = await axios.get(BASE_URL, {
        params: {
          access_key: API_KEY,
          keywords: topic,
          countries: 'us',
          languages: 'en',
          sort: 'published_desc',
          limit: 5,
        },
      });

      const articles: Article[] = response.data.data;
      generateSummary(articles);
    } catch (error) {
      console.error("Error fetching news:", error);
    }

    setLoading(false);
  };

  const generateSummary = (articles: Article[]) => {
    const combinedText = articles
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
        <div
          className="summary"
          dangerouslySetInnerHTML={{ __html: summary }}
        ></div>
      )}
    </div>
  );
}
