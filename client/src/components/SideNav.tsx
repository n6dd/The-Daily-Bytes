import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { MdSportsFootball, MdHealthAndSafety } from "react-icons/md";
import { HiServerStack } from "react-icons/hi2";
import { BsFillPlayBtnFill, BsMoonStarsFill } from "react-icons/bs";
import "./SideNav.css";
import auth from "../utils/auth";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark" ? "dark" : "light";
  });

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Use a MutationObserver to watch for theme changes on the body element.
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.body.classList.contains("dark") ? "dark" : "light");
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  if (!auth.loggedIn()) return null;

  return (
    <div className={`sidenav ${isOpen ? "open" : "closed"} ${theme}`}>
      <button className="sidenav-toggle" onClick={toggleSidebar}>
        <FaBars className="toggle-icon" />
      </button>

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
