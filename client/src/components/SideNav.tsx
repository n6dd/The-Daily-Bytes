import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { MdSportsFootball, MdHealthAndSafety } from "react-icons/md";
import { HiServerStack } from "react-icons/hi2";
import { BsFillPlayBtnFill, BsMoonStarsFill } from "react-icons/bs";

import "./SideNav.css";
import auth from "../utils/auth";

// ==============================
// TODO: SideNav Component
// ==============================

const SideNav = () => {
  // TODO: Track sidebar open/close state
  const [isOpen, setIsOpen] = useState(false);

  // TODO: Track current theme (updated dynamically)
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark" ? "dark" : "light";
  });

  // TODO: Toggle sidebar open/closed
  const toggleSidebar = () => setIsOpen(!isOpen);

  // NOTE Observe changes to body class to sync theme toggle
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.body.classList.contains("dark") ? "dark" : "light");
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // NOTE Hide sidebar if not logged in
  if (!auth.loggedIn()) return null;

  return (
    <div className={`sidenav ${isOpen ? "open" : "closed"} ${theme}`}>
      {/* TODO: Sidebar toggle button */}
      <button className="sidenav-toggle" onClick={toggleSidebar}>
        <FaBars className="toggle-icon" />
      </button>

      {/* TODO: Navigation links (icons + optional labels) */}
      <div className="sidenav-links">
        <Link to="/Sports" className="sidenav-link">
          <MdSportsFootball className="sidenav-icon" />
          {isOpen && <span>Sports</span>}
        </Link>

        <Link to="/Health" className="sidenav-link">
          <MdHealthAndSafety className="sidenav-icon" />
          {isOpen && <span>Health</span>}
        </Link>

        <Link to="/Technology" className="sidenav-link">
          <HiServerStack className="sidenav-icon" />
          {isOpen && <span>Technology</span>}
        </Link>

        <Link to="/Entertainment" className="sidenav-link">
          <BsFillPlayBtnFill className="sidenav-icon" />
          {isOpen && <span>Entertainment</span>}
        </Link>

        <Link to="/Horoscope" className="sidenav-link">
          <BsMoonStarsFill className="sidenav-icon" />
          {isOpen && <span>Horoscope</span>}
        </Link>
      </div>
    </div>
  );
};

export default SideNav;
// NOTE Visible only when user is authenticated
