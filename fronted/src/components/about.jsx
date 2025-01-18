import React from "react";
import '../styles/style.css';

export const About = () => {
  return (
    <div id="about" style={{ padding: "50px 0" }}>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <img
              src="https://i.pinimg.com/736x/21/f7/42/21f7429739e17e252bc32d84091e3559.jpg"
              className="img-responsive"
              alt="About us"
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "400px", // Limite la hauteur de l'image
                objectFit: "cover", // Garde l'image bien cadrée
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 1.2)", // Ajout de l'ombre
              }}
            />
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text" style={{ marginLeft:"20px"}}>
              <h2 style={{ marginBottom: "30px"}}>About Us</h2>
              <p>
                The Time Capsule project is a unique initiative designed to preserve memories, aspirations, and moments in time.
                Participants can store personalized messages, photos, or videos, which will be securely saved and revealed at a later date of their choosing.
                It's a journey through time, connecting the past, present, and future in a meaningful way.
              </p>
              <h3>Why Choose Us?</h3>
              <div
                className="list-style"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                <div className="col-lg-6 col-sm-6 col-xs-12" style={{ maxWidth: "45%", marginBottom: "20px" }}>
                  <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
                    <li style={{ marginBottom: "10px" }}>Preserve important memories for the future.</li>
                    <li style={{ marginBottom: "10px" }}>Secure storage and future access.</li>
                    <li style={{ marginBottom: "10px" }}>A unique and personal experience through time.</li>
                  </ul>
                </div>
                <div className="col-lg-6 col-sm-6 col-xs-12" style={{ maxWidth: "45%", marginBottom: "20px" }}>
                  <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
                    <li style={{ marginBottom: "10px" }}>Perfect for special events like birthdays or anniversaries.</li>
                    <li style={{ marginBottom: "10px" }}>Customizable content (photos, videos, messages).</li>
                    <li style={{ marginBottom: "10px" }}>Connect the past with the future in meaningful ways.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
