import React from "react";

export const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#967e64", // Fond marron foncé
        color: "#FFFFFF", // Texte blanc
        padding: "40px 20px", // Espacement interne
        textAlign: "center", // Centrage du contenu
        fontFamily: "'Roboto', sans-serif", // Police élégante
      }}
    >
      <div style={{ marginBottom: "30px" }}>
        <h3
          style={{
            fontSize: "2rem",
            marginBottom: "30px",
            fontWeight: "bold",
            color : "#4a3220"
          }}
        >
          Time Capsule
        </h3>
        <p
          style={{
            fontSize: "1.5rem",
            lineHeight: "1.6",
            margin: "0 auto",
            maxWidth: "600px",
          }}
        >
          Preserving your memories, ideas, and dreams for the future. Join us
          and keep your legacy safe for generations to come.
        </p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "15px",
          marginBottom: "20px",
        }}
      >

      </div>

      <p
        style={{
          fontSize: "0.9rem",
          marginTop: "20px",
          color: "#F4E3D3", // Texte beige clair
        }}
      >
          Merci :)
      </p>
    </footer>
  );
};
