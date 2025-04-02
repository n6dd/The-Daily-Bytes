import { Link } from "react-router-dom";
import "./Home.css"; // Optional: Add styling if needed

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>
          Welcome to <span className="highlight">The Daily Bytes</span>
        </h1>
        <p>
          Discover personalized insights, the latest news, and trending stories — all in one place.
          Whether you're into tech, health, entertainment, or daily horoscopes, we've got something
          just for you.
        </p>
        <Link to="/dailybyte" className="get-started-btn">
          Start Exploring Now
        </Link>
      </header>

      <section className="featured-content">
        <h2>Featured Articles</h2>
        <ul>
          <li>
            📝{" "}
            <a
              href="https://zapier.com/blog/productivity-tips/"
              target="_blank"
              rel="noopener noreferrer"
            >
              How to Improve Your Productivity
            </a>
          </li>
          <li>
            🧠{" "}
            <a
              href="https://www.forbes.com/sites/bernardmarr/2024/12/18/the-top-10-tech-trends-in-2025-everyone-must-be-ready-for/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Top 10 Tech Trends in 2025
            </a>
          </li>
          <li>
            💻{" "}
            <a
              href="https://www.freecodecamp.org/news/why-you-should-learn-to-code/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Why Learning to Code is Essential
            </a>
          </li>
        </ul>
      </section>

      <footer className="home-footer">
        <p>Stay connected:</p>
        <p>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            Twitter
          </a>{" "}
          |{" "}
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Home;
