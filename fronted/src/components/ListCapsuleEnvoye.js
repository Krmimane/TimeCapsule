import React, { useEffect, useState } from "react";
import api from "../axiosConfig"; // Importer la configuration Axios
import "../styles/ListCapsuleEnvoye.css"; // Assurez-vous d'importer le fichier CSS
import { FaLock } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";

const ListCapsuleEnvoye = () => {
  const [capsules, setCapsules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCapsules = async () => {
      try {
        const response = await api.get("/user/capsules");
        setCapsules(response.data);
      } catch (err) {
        setError("Erreur lors du chargement des capsules.");
      } finally {
        setLoading(false);
      }
    };

    loadCapsules();
  }, []);

  if (loading) return <p className="loading-text6">Chargement des capsules...</p>;
  if (error) return <p className="error-text6">{error}</p>;

  return (
    <div className="capsules-list6">
      {capsules.map((capsule) => (
        <div key={capsule.id} className="capsule-card6">
          {/* En-tête avec couleur dynamique */}
          <div
            className={`capsule-header6 ${
              capsule.type === "temporelle" ? "header-green6" : "header-red6"
            }`}
          >
            <span className="status-icon6">
              {capsule.is_public ? <FaUnlock /> : <FaLock />}
            </span>
          </div>

          {/* Titre et date d'ouverture */}
          <div className="capsule-header-details6">
            <h3 className="capsule-title6">{capsule.title}</h3>
            <p className="capsule-date6">
              {new Date(capsule.open_date).toLocaleDateString()}
            </p>
          </div>

          {/* Description */}
          <p className="capsule-description6">{capsule.description}</p>

          {/* Contenus */}
          {/* Contenus */}
<div className="capsule-contents6">
  {capsule.contents.map((content) => {
    console.log(content.file_url); // Affiche le file_url dans la console
    return (
      <div key={content.id} className="content-item6">
        {content.type === "video" && (
          <video controls width="100%" height="200vh">
            <source src={content.file_url} type="video/mp4" />
            Votre navigateur ne supporte pas la lecture vidéo.
          </video>
        )}
        {content.type === "image" && (
          <img
            src={content.file_url}
            alt="Contenu visuel de la capsule"
            width="100%"
            height="auto"
          />
        )}
        {content.type === "audio" && (
          <audio controls width="100%">
            <source src={content.file_url} type="audio/ogg" />
            Votre navigateur ne supporte pas la lecture audio.
          </audio>
        )}
        {content.type === "text" && <p>{content.text_content}</p>}
      </div>
    );
  })}
</div>

        </div>
      ))}
    </div>
  );
};

export default ListCapsuleEnvoye;
