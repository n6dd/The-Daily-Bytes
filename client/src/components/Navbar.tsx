import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMoon, FiSun } from "react-icons/fi";
import auth from "../utils/auth";
import "./Navbar.css";

// =============================================================================
// TODO: Theme Toggle Component (Used inside Navbar)
// =============================================================================

interface SliderToggleProps {
  selected: "light" | "dark";
  setSelected: (val: "light" | "dark") => void;
}

const SliderToggle = ({ selected, setSelected }: SliderToggleProps) => {
  return (
    <div className="theme-toggle-wrapper" role="radiogroup" aria-label="Theme toggle">
      <button
        className={`theme-toggle-button ${selected === "light" ? "selected" : ""}`}
        onClick={() => setSelected("light")}
        aria-pressed={selected === "light"}
      >
        <FiSun className="icon" />
        Light
      </button>
      <button
        className={`theme-toggle-button ${selected === "dark" ? "selected" : ""}`}
        onClick={() => setSelected("dark")}
        aria-pressed={selected === "dark"}
      >
        <FiMoon className="icon" />
        Dark
      </button>
      <div className={`theme-slider ${selected === "dark" ? "right" : "left"}`} />
    </div>
  );
};

// =============================================================================
// TODO: Main Navbar Component
// =============================================================================

const Navbar = () => {
  const location = useLocation();

  // TODO: Track if user is logged in
  const [loginCheck, setLoginCheck] = useState(false);

  // TODO: Handle theme state (persisted in localStorage)
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark" ? "dark" : "light";
  });

  // NOTE Check login state on first load
  useEffect(() => {
    if (auth.loggedIn()) setLoginCheck(true);
  }, []);

  // NOTE Apply theme to body and store preference
  useEffect(() => {
    document.body.className = theme === "dark" ? "dark" : "";
    localStorage.setItem("theme", theme);
  }, [theme]);

  // TODO: Define navigation tabs
  const tabs = [
    { label: "Home", to: "/" },
    { label: "DailyByte", to: "/dailybyte" },
    { label: "Trending", to: "/trending" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <header className="navbar fade-in">
      <div className="navbar-inner">
        <h1 className="nav-title">THE DAILY BYTES</h1>

        {/* TODO: Render nav tabs with active link highlighting */}
        <nav className="nav-tabs">
          {tabs.map((tab) => (
            <Link
              key={tab.label}
              to={tab.to}
              className={`nav-link ${location.pathname === tab.to ? "active" : ""}`}
            >
              {tab.label.toUpperCase()}
            </Link>
          ))}
        </nav>

        {/* TODO: Login/logout buttons + theme toggle */}
        <div className="nav-actions">
          {loginCheck ? (
            <button
              className="nav-link logout-button"
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
// NOTE Used globally across all views for navigation and theming...
