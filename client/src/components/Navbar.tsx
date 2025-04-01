// =============================================================================
// Navbar.tsx - Top-level navigation with theme toggle + login/logout controls
// =============================================================================

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiMoon, FiSun } from "react-icons/fi";
import auth from "../utils/auth";
import "./Navbar.css";

// =============================================================================
// Component: Theme Toggle Button
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
// Component: Navbar
// =============================================================================

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);

  // IDEA: Theme defaults to stored value or 'light'
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark" ? "dark" : "light";
  });

  // EFFECT: Check auth status on mount
  useEffect(() => {
    if (auth.loggedIn()) setLoginCheck(true);
  }, []);

  // EFFECT: Apply and persist theme class to body
  useEffect(() => {
    document.body.className = theme === "dark" ? "dark" : "";
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Navigation tabs
  const tabs = [
    { label: "Home", to: "/" },
    { label: "ChatGpt", to: "/ChatGpt" },
    { label: "Trending", to: "/Trending" },
    { label: "Access", to: "/Access" },
    { label: "Contact", to: "/Contact" },
  ];

  return (
    <header className="navbar">
      <div className="navbar-inner">

        {/* Title */}
        <h1 className="nav-title">Authentication Review</h1>

        {/* Center nav links */}
        <nav className="nav-tabs">
          {tabs.map((tab) => (
            <Link key={tab.label} to={tab.to} className="nav-link">
              {tab.label.toUpperCase()}
            </Link>
          ))}
        </nav>

        {/* Right-side: Login/Logout + Theme Toggle */}
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
            <Link to="/login" className="nav-link">
              LOGIN
            </Link>
          )}
          <SliderToggle selected={theme} setSelected={setTheme} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
