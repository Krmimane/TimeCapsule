import React, { useState, useEffect } from "react";
import { Header } from "../components/header";
import { Features } from "../components/features";
import { About } from "../components/about";
import { Services } from "../components/services";
import { Testimonials } from "../components/testimonials";
import { Footer } from "../components/footer";
import JsonData from "../data/data.json";
import { Navigation } from "../components/navigation";

const LandingPage = () => {
  const [landingPageData, setLandingPageData] = useState({});

  // Load JSON data on mount
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <div>
      <Navigation />
      <Header data={landingPageData.Header} />
      <Features data={landingPageData.Features} />
      <About data={landingPageData.About} />
      <Services data={landingPageData.Services} />
      <Testimonials data={landingPageData.Testimonials} />
      <Footer />
    </div>
  );
};

export default LandingPage;
