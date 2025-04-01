import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaShoppingCart, FaTag, FaChartBar, FaUsers, FaBars } from "react-icons/fa";
import "./SideNav.css";
import auth from "../utils/auth";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const isLogin = auth.loggedIn(); // Check if the user is logged in

  if (!isLogin) {
    return null; // Don't render the sidebar if not logged in
  }
  

  return (
    <div className={`sidenav ${isOpen ? "open" : "closed"}`}>
      <button className="sidenav-toggle" onClick={toggleSidebar}>
        <FaBars className="sidenav-icon" />
      </button>
      
      <div className="sidenav-links">
        <Link to="/Sports" className="sidenav-link">
          <FaHome className="sidenav-icon" />
          {isOpen && "Sports"}
        </Link>
        <Link to="/Travel" className="sidenav-link">
          <FaShoppingCart className="sidenav-icon" />
          {isOpen && "Travel"}
        </Link>
        <Link to="/Gaming" className="sidenav-link">
          <FaTag className="sidenav-icon" />
          {isOpen && "Gaming"}
        </Link>
        <Link to="/Entertainment" className="sidenav-link">
          <FaChartBar className="sidenav-icon" />
          {isOpen && "Entertainment"}
        </Link>
        <Link to="/Puzzle" className="sidenav-link">
          <FaUsers className="sidenav-icon" />
          {isOpen && "Puzzle"}
        </Link>
      </div>
    </div>
  );
};

export default SideNav;
