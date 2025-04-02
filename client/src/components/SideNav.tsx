import { useState } from "react";
import { Link } from "react-router-dom";

import { FaBars, FaUsers } from "react-icons/fa";
import { MdSportsFootball, MdHealthAndSafety } from "react-icons/md";
import { GrTechnology } from "react-icons/gr";
import { BsFillPlayBtnFill } from "react-icons/bs";
import { GiGemini } from "react-icons/gi";

import "./SideNav.css";
import auth from "../utils/auth";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  if (!auth.loggedIn()) return null;

  return (
    <div className={`sidenav ${isOpen ? "open" : "closed"}`}>
      {/* Toggle Button */}
      <button className="sidenav-toggle" onClick={toggleSidebar}>
        <FaBars className="toggle-icon" />
      </button>

      {/* Nav Links */}
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
          <GrTechnology className="sidenav-icon" />
          {isOpen && <span>Technology</span>}
        </Link>

        <Link to="/Entertainment" className="sidenav-link">
          <BsFillPlayBtnFill className="sidenav-icon" />
          {isOpen && <span>Entertainment</span>}
        </Link>

        <Link to="/Horoscope" className="sidenav-link">
          <GiGemini className="sidenav-icon" />
          {isOpen && <span>Horoscope</span>}
        </Link>

  
      </div>
    </div>
  );
};

export default SideNav;
