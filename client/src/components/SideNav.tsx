import { useState } from "react";
import { Link } from "react-router-dom";

// Icons
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
        {/* @ts-ignore */}
        <FaBars className="sidenav-icon" />
      </button>

      {/* Nav Links */}
      <div className="sidenav-links">

        {/* Sports */}
        <Link to="/Sports" className="sidenav-link">
          {/* @ts-ignore */}
          <MdSportsFootball />
          {isOpen && "Sports"}
        </Link>

        {/* Health (was Travel) */}
        <Link to="/Health" className="sidenav-link">
          {/* @ts-ignore */}
          <MdHealthAndSafety className="sidenav-icon" />
          {isOpen && "Health"}
        </Link>

        {/* Technology (was Gaming) */}
        <Link to="/Technology" className="sidenav-link">
          {/* @ts-ignore */}
          <GrTechnology className="sidenav-icon" />
          {isOpen && "Technology"}
        </Link>

        {/* Entertainment */}
        <Link to="/Entertainment" className="sidenav-link">
          {/* @ts-ignore */}
          <BsFillPlayBtnFill className="sidenav-icon" />
          {isOpen && "Entertainment"}
        </Link>

        {/* Horoscope (was Puzzle) */}
        <Link to="/Horoscope" className="sidenav-link">
          {/* @ts-ignore */}
          <GiGemini className="sidenav-icon" />
          {isOpen && "Horoscope"}
        </Link>

        {/* Users */}
        <Link to="/Users" className="sidenav-link">
          {/* @ts-ignore */}
          <FaUsers className="sidenav-icon" />
          {isOpen && "Users"}
        </Link>

      </div>
    </div>
  );
};

export default SideNav;
