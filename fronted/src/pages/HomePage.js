import React, { useEffect, useState } from "react";
import axios from "axios";
import CapsuleCard from "../components/CapsuleCard";
import Notifications from "../components/Notifications";
import "../styles/styles.css"; // Assurez-vous que ce fichier contient les styles globaux

const HomePage = () => {
  const [capsules, setCapsules] = useState([]); // Capsules chargées depuis l'API
  const [notifications, setNotifications] = useState([]); // Notifications chargées depuis l'API
  const [error, setError] = useState(null); // État pour afficher les erreurs
  const [isLoading, setIsLoading] = useState(false); // État pour gérer le chargement

  // Fonction pour récupérer les capsules depuis l'API
  const fetchCapsules = async () => {
    setIsLoading(true); // Activer le chargement
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/capsules");
      setCapsules(response.data);
    } catch (err) {
      setError("Impossible de charger les capsules. Vérifiez votre connexion ou contactez l'administrateur.");
    } finally {
      setIsLoading(false); // Désactiver le chargement
    }
  };

  // Fonction pour récupérer les notifications depuis l'API
  const fetchNotifications = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/notifications");
      setNotifications(response.data);
    } catch (err) {
      alert(
        `Erreur lors de la récupération des notifications : ${
          err.response ? `${err.response.status} - ${err.response.data.message}` : err.message
        }`
      );
    }
  };

  // Fonction pour marquer une notification comme lue
  const markNotificationAsRead = async (notificationId) => {
    try {
      await axios.patch(`http://127.0.0.1:8000/api/notifications/${notificationId}`, {
        is_read: true,
      });
      // Mettre à jour localement la liste des notifications
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification.id !== notificationId)
      );
    } catch (err) {
      console.error("Erreur lors de la mise à jour de la notification :", err);
    }
  };

  // Fonction pour gérer le like d'une capsule
  const handleLike = async (capsuleId) => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/capsules/${capsuleId}/like`, {
        user_id: 1, // Remplacez par un ID utilisateur authentifié
      });
      console.log("Like ajouté !");
      fetchCapsules(); // Recharger les capsules pour mettre à jour les données
    } catch (err) {
      console.error("Erreur lors de l'ajout du like :", err);
    }
  };

  // Fonction pour gérer les commentaires d'une capsule
  const handleComment = async (capsuleId, commentText) => {
    if (!commentText.trim()) {
      alert("Le commentaire ne peut pas être vide.");
      return;
    }

    try {
      await axios.post(`http://127.0.0.1:8000/api/capsules/${capsuleId}/comment`, {
        user_id: 1, // Remplacez par un ID utilisateur authentifié
        comment_text: commentText,
      });
      console.log("Commentaire ajouté !");
      fetchCapsules(); // Recharger les capsules pour mettre à jour les commentaires
    } catch (err) {
      console.error("Erreur lors de l'ajout du commentaire :", err);
    }
  };

  // Charger les données lors du montage du composant
  useEffect(() => {
    fetchCapsules();
    fetchNotifications();
  }, []);

  return (
    <div className="home-page-container">
      {/* Afficher les erreurs */}
      {error && <p className="error-message">{error}</p>}

      {/* Indicateur de chargement */}
      {isLoading && <p className="loading-message">Chargement des données...</p>}

      {/* Composant Notifications */}
      <Notifications
        notifications={notifications}
        currentUserId={1}
        onNotificationClick={markNotificationAsRead}
      />

      {/* Affichage des capsules */}
      <div className="capsules-feed">
        {capsules.length > 0 ? (
          capsules.map((capsule) => (
            <CapsuleCard
              key={capsule.id}
              capsule={capsule}
              onLike={handleLike} // Gestion des likes
              onComment={handleComment} // Gestion des commentaires
            />
          ))
        ) : (
          <p>Aucune capsule disponible pour le moment.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
