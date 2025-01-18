import React from "react";

export const Header = (props) => {
  const backgroundImage =
    "https://i.pinimg.com/736x/e6/ce/df/e6cedf0245bc103b80e77f3227a2f476.jpg";

  return (
    <header
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh", // Pleine hauteur
        width: "100%", // Pleine largeur
        margin: "0",
        padding: "0",
        position: "relative",
        overflow: "hidden", // Empêche tout débordement
      }}
    >
      {/* Overlay sombre */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Overlay sombre pour contraste
          zIndex: 1,
        }}
      ></div>

      {/* Contenu centré */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          textAlign: "center",
          color: "#fff", // Couleur blanche pour contraste
          fontFamily: "'Roboto', sans-serif", // Police pour le texte
        }}
      >
        <h1
          style={{
            fontSize: "5rem", // Taille du titre augmentée
            fontWeight: "bold",
            marginBottom: "20px",
            textTransform: "uppercase", // Texte en majuscules
            letterSpacing: "2px", // Espacement entre les lettres
          }}
        >
          {props.data ? props.data.title : "Preserve Your Memories"}
        </h1>
        <p
          style={{
            fontSize: "1.8rem", // Taille augmentée pour le paragraphe
            lineHeight: "2", // Espacement augmenté entre les lignes
            maxWidth: "800px",
            margin: "0 auto 30px",
          }}
        >
          {props.data
            ? props.data.paragraph
            : "Our time capsule ensures your most cherished memories, groundbreaking ideas, and heartfelt dreams are securely preserved for future generations. Designed with advanced technology, it stands the test of time to safeguard your legacy."}
        </p>
        <a
          href="#features"
          className="btn-modern"
          
        >
          Get Started
        </a>
      </div>
      <style>
        {`
          .btn-modern {
            display: inline-block;
            padding: 12px 24px;
            font-size: 18px;
            font-weight: bold;
            color: #fff;
            background: linear-gradient(90deg,rgb(68, 61, 28) 0%,rgb(194, 184, 140) 100%);
            border: none;
            border-radius: 30px;
            text-decoration: none;
            cursor: pointer;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
          }

          .btn-modern:hover {
            transform: translateY(-3px);
            box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.3);
          }

          .btn-modern:active {
            transform: translateY(0);
            box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
          }
        `}
      </style>
    </header>
  );
};
