import React, { useState } from "react";
import "../styles/Notifications.css"; // Importation des styles

const Notifications = ({ notifications, currentUserId }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Filtrer les notifications pour l'utilisateur actuel
  const userNotifications = notifications.filter(
    (notification) => notification.userId === currentUserId
  );

  // Gérer l'ouverture/fermeture du popup
  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Icône de notification */}
      <div className="notification-icon-popup-2" onClick={toggleNotifications}>
        🔔
        {userNotifications.length > 0 && (
          <span className="notification-badge-2">{userNotifications.length}</span>
        )}
      </div>

      {/* Popup des notifications */}
      {isOpen && (
        <div className="notification-popup-2">
          <h3 className="notifications-title-2">Notifications</h3>
          {userNotifications.length > 0 ? (
            <ul className="notifications-list-2">
              {userNotifications.map((notification) => (
                <li key={notification.id} className="notification-item-2">
                  {notification.message}
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-notifications-2">Aucune notification pour le moment.</p>
          )}
        </div>
      )}
    </>
  );
};

export default Notifications;
