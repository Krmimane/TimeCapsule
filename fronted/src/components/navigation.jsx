import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Importez useLocation et useNavigate pour gérer les redirections
import '../styles/style.css'

export const Navigation = () => {
  const location = useLocation(); // Obtenez l'emplacement actuel
  const navigate = useNavigate(); // Utilisez navigate pour changer de route

  const handleScroll = (event, targetId) => {
    event.preventDefault();

    if (location.pathname !== "/") {
      // Si on n'est pas sur la page principale, redirigez vers "/" et scrollez après
      navigate("/");
      setTimeout(() => {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: "smooth",
          });
        }
      }, 100); // Attendez un peu pour que la page principale se charge
    } else {
      // Si on est sur la page principale, scrollez directement
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a className="navbar-brand page-scroll" href="#page-top" onClick={(e) => handleScroll(e, "#page-top")}>
            Time Capsule
          </a>{" "}
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="#features" className="page-scroll" onClick={(e) => handleScroll(e, "#features")}>
                Features
              </a>
            </li>
            <li>
              <a href="#about" className="page-scroll" onClick={(e) => handleScroll(e, "#about")}>
                About
              </a>
            </li>
            <li>
              <a href="#services" className="page-scroll" onClick={(e) => handleScroll(e, "#services")}>
                Services
              </a>
            </li>
            <li>
              <a href="#testimonials" className="page-scroll" onClick={(e) => handleScroll(e, "#testimonials")}>
                Testimonials
              </a>
            </li>
            <li>
              <Link to="/login" className="page-scroll">
                Login
              </Link>
            </li>
            <li>
              <Link to="/signup" className="page-scroll">
                Signup
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
