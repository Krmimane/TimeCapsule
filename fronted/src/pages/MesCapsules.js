import React, { useEffect, useState } from "react";
import api from "../axiosConfig"; // Adaptez le chemin selon votre projet
import "../styles/mescapsule.css";
import { FaLock } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";

const MesCapsules = () => {
  const [waitingCapsules, setWaitingCapsules] = useState([]);
  const [readyCapsules, setReadyCapsules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCapsules = async () => {
      try {
        // Appels aux nouvelles routes
        const waitingResponse = await api.get("/user/capsulesattente");
        const readyResponse = await api.get("/user/capsulesready");

        setWaitingCapsules(waitingResponse.data);
        setReadyCapsules(readyResponse.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des capsules", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCapsules();
  }, []);

  const handleCardClick = (e) => {
    const card = e.currentTarget;
    card.classList.toggle("active");
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="capsules-container">
      <h1 className="hugetitle">Mes Capsules</h1>

      <section>
      <div style={{ display: 'flex', alignItems: 'center' }}>
            <h1 className='tinyhugetitle' >Capsules Prêtes à Ouvrir</h1>
            <hr style={{ flexGrow: 1, marginLeft: '10px' ,marginTop:'55px' }} />
        </div>
        <div className="capsules-list">
          {readyCapsules.map((capsule) => (
            <div
              key={capsule.id}
              className="card"
              onClick={handleCardClick}
            >
              <div style={{fontSize:"30px"}} > <FaUnlock />  </div>
              <div className="card__content">
                <div className="capsule-header7">
                  <img
                    src={capsule.user?.profile_picture || "/path/to/default-image.jpg"}
                    alt={capsule.user?.name}
                    className="profile-picture12"
                  />
                  <h3 className="capsule-title12">{capsule.title}</h3>
                </div>

                <p className="card__description12">{capsule.description}</p>
                <div className="capsule-contents6">
            {capsule.contents.map((content) => (
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
                  <audio controls width="100%" >
                    <source src={content.file_url} type="audio/ogg" />
                    Votre navigateur ne supporte pas la lecture audio.
                  </audio>
                )}
                {content.type === "text" && <p>{content.text_content}</p>}
              </div>
            ))}
          </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
      <div style={{ display: 'flex', alignItems: 'center' }}>
            <h1 className='tinyhugetitle' >Capsules En Attente</h1>
            <hr style={{ flexGrow: 1, marginLeft: '10px' ,marginTop:'55px' }} />
        </div>
        <div className="capsules-list">
          {waitingCapsules.map((capsule) => (
            <div
              key={capsule.id}
              className="card disabled"
              onClick={handleCardClick}
            >
              <div style={{fontSize:"30px", zIndex:"12"}} > <FaLock />  </div>

              
            </div>
          ))}
        </div>
      </section>
    </div>
  );

};


export default MesCapsules;
