import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import "../styles/Sidebar.css";


import { FaHome, FaSearch, FaEnvelope, FaUser, FaSignOutAlt } from "react-icons/fa";
import logotime from "../styles/freepik-export-20250111091357D4Gh.png"
import API from "../axiosConfig";
const SideBar = ({ isMobile, isSidebarOpen }) => {
  const navigate = useNavigate();

  const menuItems = [
    { name: "Home", path: "/HomePage", icon: <FaHome /> },
    { name: "Capsule", path: "/mescapsules", icon: <FaSearch /> },
    { name: "Add Capsule", path: "/ajouterCapsule", icon: <FaEnvelope /> },
    { name: "Profile", path: "/Profile", icon: <FaUser /> },
  ];
  const handleLogout = async () => {
    try {
      // Envoie une requête au backend pour révoquer le token
      await API.post("/logout");
      
      // Supprime le token localement (si vous l'avez stocké dans le localStorage)
      localStorage.removeItem("authToken");

      // Redirige vers la page de connexion
      navigate("/login");
    } catch (err) {
      console.error("Error during logout:", err);
      alert("Failed to log out. Please try again.");
    }
  };
  return (
    <div className={`sidebar ${isMobile ? (isSidebarOpen ? "open" : "closed") : ""}`}>
      <div className="bigmenu">
      <div className="sidebar-header">
        <div className="header-content">
          <img
            src={logotime}
            alt="Logo"
          />
          <p className="projname">Time Capsule</p>
        </div>
        <hr className="header-divider" />
      </div>



      <div className="menu">
        {menuItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.name}
            className={({ isActive }) =>
              `menu-item ${isActive ? "active" : ""}`
            }
          >
            <span className="icon">{item.icon}</span>
            <span className="label">{item.name}</span>
          </NavLink>
        ))}
      </div>

      <div className="logout" onClick={handleLogout} style={{ cursor: "pointer" }}>

        <FaSignOutAlt className="icon" />
        <span className="label">Log Out</span>
      </div>
    </div></div>
  );
};

export default SideBar;
