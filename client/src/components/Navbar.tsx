import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiMoon, FiSun } from "react-icons/fi";
import auth from "../utils/auth";
import "./Navbar.css";

// =============================================================================
// Theme Toggle Component
// =============================================================================

interface SliderToggleProps {
  selected: "light" | "dark";
  setSelected: (val: "light" | "dark") => void;
}

const SliderToggle = ({ selected, setSelected }: SliderToggleProps) => {
  return (
    <div className="theme-toggle-wrapper">
      <button
        className={`theme-toggle-button ${selected === "light" ? "selected" : ""}`}
        onClick={() => setSelected("light")}
      >
        <FiSun className="icon" />
        Light
      </button>
      <button
        className={`theme-toggle-button ${selected === "dark" ? "selected" : ""}`}
        onClick={() => setSelected("dark")}
      >
        <FiMoon className="icon" />
        Dark
      </button>
      <div className={`theme-slider ${selected === "dark" ? "right" : "left"}`} />
    </div>
  );
};

// =============================================================================
// Navbar Component
// =============================================================================

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    if (auth.loggedIn()) setLoginCheck(true);
  }, []);

  useEffect(() => {
    document.body.className = theme === "dark" ? "dark" : "";
    localStorage.setItem("theme", theme);
  }, [theme]);

  const tabs = [
    { label: "Home", to: "/" },
    { label: "DailyByte", to: "/dailybyte" },
    { label: "Trending", to: "/trending" },
    { label: "Access", to: "/access" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <h1 className="nav-title">THE DAILY BYTES</h1>

        <nav className="nav-tabs">
          {tabs.map((tab) => (
            <Link key={tab.label} to={tab.to} className="nav-link">
              {tab.label.toUpperCase()}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          {loginCheck ? (
            <button
              className="nav-link"
              onClick={() => {
                auth.logout();
                setLoginCheck(false);
              }}
            >
              LOGOUT
            </button>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                LOGIN
              </Link>
              <Link to="/signup" className="nav-link signup-button">
                SIGN UP
              </Link>
            </>
          )}
          <SliderToggle selected={theme} setSelected={setTheme} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
