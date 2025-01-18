import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import SideBar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import MesCapsules from "./pages/MesCapsules";
import AjouterCapsule from "./pages/AjouterCapsule";
import UserProfile from "./pages/UserProfile"
import { Login } from "./components/login";
import { Signup } from "./components/signup";
import LandingPage from "./pages/LandingPage";


function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const [humbon,sethumbon]=useState(null);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const MainContentWrapper = ({ children }) => {
    const location = useLocation();
    const islogin = location.pathname === "/login";

    return (
      <div className={`main-content ${islogin ? "home-page" : ""}`}>
        {children}
      </div>
      

    );
  };

  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Landing Page */}
          
          <Route path="/" element={<LandingPage />} />

          {/* Login Page */}
          <Route path="/login" element={<Login />} />

          {/* Signup Page */}
          <Route path="/signup" element={<Signup />} />

          {/* Main Layout */}
          <Route
            path="/*"
            element={
              <>
                <SideBar isMobile={isMobile} humbon={humbon} />
                <MainContentWrapper>
                  <Routes>

                    <Route path="HomePage" element={<HomePage/>} />
                    <Route path="MesCapsules" element={<MesCapsules />} />
                    <Route path="AjouterCapsule" element={<AjouterCapsule />} />
                    <Route path="Profile" element={<UserProfile />} />
                    
                  </Routes>
                </MainContentWrapper>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
