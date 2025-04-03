// import { Link } from "react-router-dom";
// import "./Home.css"; // Optional: Add styling if needed

// const Home = () => {
//   return (
//     <div className="home-container">
//       <header className="home-header">
//         <h1>
//           Welcome to <span className="highlight">The Daily Bytes</span>
//         </h1>
//         <p>
//           Discover personalized insights, the latest news, and trending stories — all in one place.
//           Whether you're into tech, health, entertainment, or daily horoscopes, we've got something
//           just for you.
//         </p>
//         <Link to="/dailybyte" className="get-started-btn">
//           Start Exploring Now
//         </Link>
//       </header>

//       <section className="featured-content">
//         <h2>Featured Articles</h2>
//         <ul>
//           <li>
//             📝{" "}
//             <a
//               href="https://zapier.com/blog/productivity-tips/"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               How to Improve Your Productivity
//             </a>
//           </li>
//           <li>
//             🧠{" "}
//             <a
//               href="https://www.forbes.com/sites/bernardmarr/2024/12/18/the-top-10-tech-trends-in-2025-everyone-must-be-ready-for/"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               Top 10 Tech Trends in 2025
//             </a>
//           </li>
//           <li>
//             💻{" "}
//             <a
//               href="https://www.freecodecamp.org/news/why-you-should-learn-to-code/"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               Why Learning to Code is Essential
//             </a>
//           </li>
//         </ul>
//       </section>

//       <footer className="home-footer">
//         <p>Stay connected:</p>
//         <p>
//           <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
//             Twitter
//           </a>{" "}
//           |{" "}
//           <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
//             Facebook
//           </a>
//         </p>
//       </footer>
//     </div>
//   );
// };

// export default Home;

import { Link } from "react-router-dom";

import "./Home.css"; // Ensure this file styles the components properly

const Home = () => {
  return (
    <div className="home-container">
      
      <header className="home-header">
        <h1>Welcome to <span className="highlight">The Daily Bytes</span></h1>
        <p>
          Discover personalized insights, the latest news, and trending stories — all in one place.
          Whether you're into tech, health, entertainment, or daily horoscopes, we've got something
          just for you.
        </p>
        <Link to="/dailybyte" className="get-started-btn">
          Start Exploring Now
        </Link>
      </header>
      
      <section className="featured-articles">
        <h2>Featured Articles</h2>
        <ul>
          <li>
            📝<a href="https://www.entrepreneur.com/leadership/5-simple-productivity-hacks-that-will-make-you-more/486539">How to Improve Your Productivity</a>
          </li>
          <li>
            📌 <a href="https://www.aarp.org/home-family/personal-technology/tech-made-easy/?cmp=MFJ648ZUFX&&msclkid=157403d6ae9e1d6f9100643b03ede4f0&utm_source=bing&utm_medium=cpc&utm_campaign=PersonalTech_General_NonBrand_Phrase&utm_term=latest%20technology%20news&utm_content=Personal%20Tech&gclid=157403d6ae9e1d6f9100643b03ede4f0&gclsrc=3p.ds">Top 10 Tech Trends in 2025</a>
          </li>
          <li>
            📘 <a href="https://www.bbc.com/news/business-56194958">How Coding can changer lives!</a>
          </li>
        </ul>
      </section>
      
      <section className="highlighted-cards">
        <div className="card">
          <span className="icon">☀️</span>
          <h3>Weekly Weather Recap</h3>
          <p>Unseasonably warm weather with mid-week showers</p>
        </div>
        <div className="card">
          <span className="icon">⭐</span>
          <h3>Rising Star of the Week</h3>
          <p>Artist climbs charts with breakout new single</p>
        </div>
        <div className="card">
          <span className="icon">🎬</span>
          <h3>Upcoming Movies</h3>
          <p>New releases premiering this weekend</p>
        </div>
        <div className="card">
          <span className="icon">❤️</span>
          <h3>Positive News This Week</h3>
          <p>Uplifting stories of kindness and generosity</p>
        </div>
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