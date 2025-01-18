
import React, { useState, useEffect } from 'react';
import api from '../axiosConfig';
import { MdModeEditOutline  } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import  ListCapsuleEnvoye from "../components/ListCapsuleEnvoye";
import '../styles/ListCapsuleEnvoye.css'
import { Navigate } from "react-router-dom";


const UserProfile = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);
  const [userId, setUserId] = useState(null);
  const [capsulesCount, setCapsulesCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalLikes, setTotalLikes] = useState(null);

  const [capsulesCountreciev, setCapsulesCountreciev] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const connectResponse = await api.get('/user/connect');
        const { id } = connectResponse.data;
        setUserId(id);
        fetchCapsulesCount(id);
        fetchCapsulesCountreciv(id);
        fetchTotalLikes(id);

        const userResponse = await api.get(`/users/${id}`);
        const { name, email, profile_picture } = userResponse.data;
        console.log("Image URL:", profile_picture);  
        setName(name);
        setEmail(email);
        setProfilePicture(profile_picture);
        setIsLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const fetchTotalLikes = async (id) => {
    try {
      const response = await api.get(`/capsules/totallikes/${id}`);
      if (response.status === 200) {
        setTotalLikes(response.data.total_likes);
      } else {
        setError("Erreur lors de la récupération des likes.");
      }
    } catch (err) {
      console.error("Erreur lors de la récupération des likes :", err);
      setError("Impossible de récupérer le total des likes.");
    } finally {
      setLoading(false);
    }
  };
  const fetchCapsulesCount = async (id) => {
    try {
      const response = await api.get(`/capsules/countsent/${id}`);
      if (response.status === 200) {
        setCapsulesCount(response.data.total_sent_capsules);
      } else {
        setError("Erreur lors de la récupération des capsules.");
      }
    } catch (err) {
      console.error("Erreur lors de la récupération des capsules :", err);
      setError("Impossible de récupérer le nombre de capsules.");
    } finally {
      setLoading(false);
    }
  };
  const fetchCapsulesCountreciv = async (id) => {
    try {
      const response = await api.get(`/capsules/countreceived/${id}`);
      if (response.status === 200) {
        setCapsulesCountreciev(response.data.total_sent_capsules);
      } else {
        setError("Erreur lors de la récupération des capsules.");
      }
    } catch (err) {
      console.error("Erreur lors de la récupération des capsules :", err);
      setError("Impossible de récupérer le nombre de capsules.");
    } finally {
      setLoading(false);
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setPreviewImage(URL.createObjectURL(file));
    setProfilePicture(file);
  };

  const handleSave = async () => {
    try {
      const data = {
        name: name,
        email: email,
        profile_picture: null, // Par défaut, pas de photo
      };
  
      const connectResponse = await api.get('/user/connect');
      const { id } = connectResponse.data;

      // Si une photo de profil a été choisie, la convertir en base64
      if (profilePicture instanceof File) {
        const reader = new FileReader();
        
        reader.onloadend = async () => {
          // Convertir l'image en base64
          const base64Image = reader.result.split(',')[1]; // Retirer le préfixe "data:image/png;base64,"
          
          data.profile_picture = base64Image;
  
          // Log pour vérifier la structure
          console.log("Données à envoyer :", data);
          
  
          // Envoyer la requête PUT
          const response = await api.put(`/user/update`, data, {
            headers: {
              'Content-Type': 'application/json', // Utilisation de JSON
            },
          });
  
          alert('Modifications enregistrées avec succès!');
          setShowSettings(false);
        };
  
        reader.readAsDataURL(profilePicture); // Convertir l'image en base64
      } else {
        // Si pas de photo, on envoie les autres données
        const response = await api.put(`/user/update`, data, {
          headers: {
            'Content-Type': 'application/json', // Utilisation de JSON
          },
        });
  
        alert('Modifications enregistrées avec succès!');
        setShowSettings(false);
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.error('Validation errors:', error.response.data.errors);
        alert('Erreur de validation : ' + JSON.stringify(error.response.data.errors));
      } else {
        console.error('Erreur lors de la mise à jour du profil:', error);
        alert('Une erreur est survenue lors de l’enregistrement.');
      }
    }
  };
  

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <h1  className="hugetitle" style={{ margin: 0 }}>Hello, {name || 'Utilisateur'}</h1>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <img
      src={previewImage || profilePicture} 
      alt="Profile"
      style={{
        width: '5rem',
        height: '5rem',
        borderRadius: '50%',
        objectFit: 'cover',
        border: '4px solid #f3f3f3',
      }}
    />
    <button
      onClick={() => setShowSettings(true)}
      style={{ border: 'none', background: 'transparent', cursor: 'pointer', marginLeft: '10px'}}
    >
      <span aria-label="settings" style={{ fontSize: '35px' }}><IoMdSettings /></span>
    </button>
  </div>
</div>

      <div style={{ display: 'flex', gap: '10px', justifyContent:'space-evenly', marginTop: '20px' }}>
        <div class="ag-courses_item">
          <a class="ag-courses-item_link" href="#">
            <div class="ag-courses-item_bg"></div>
            <div class="ag-courses-item_title">capsules envoyées</div>
            <div class="ag-courses-item_date-box">
            
              <span class="ag-courses-item_date">{capsulesCount !== null ? capsulesCount : "Aucune donnée disponible."}</span>
            </div>
          </a>
        </div>
        <div class="ag-courses_item">
          <a class="ag-courses-item_link" href="#">
            <div class="ag-courses-item_bg1"></div>
            <div class="ag-courses-item_title1">capsules recues</div>
            <div class="ag-courses-item_date-box1">
              <span class="ag-courses-item_date1">{capsulesCountreciev !== null ? capsulesCountreciev : "Aucune donnée disponible."}</span>
            </div>
          </a>
        </div>
        <div class="ag-courses_item">
          <a class="ag-courses-item_link" href="#">
            <div class="ag-courses-item_bg2"></div>
            <div class="ag-courses-item_title2">Nombre des likes</div>
            <div class="ag-courses-item_date-box2">
              <span class="ag-courses-item_date2"> {totalLikes !== null ? totalLikes : "Aucune donnée disponible."}</span>
            </div>
          </a>
        </div>

     
     </div>
     <div style={{ display: 'flex', alignItems: 'center' }}>
            <h1 className='tinyhugetitle' >Posts</h1>
            <hr style={{ flexGrow: 1, marginLeft: '10px' ,marginTop:'55px' }} />
        </div>
     
      <ListCapsuleEnvoye />
      {showSettings && (
        <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: '30px',
          backgroundColor: '#fff',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '12px',
          width: '400px',
          maxWidth: '90%',
          animation: 'fadeIn 0.3s ease-in-out',
          zIndex: '1000',
        }}
      >
        <h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Modifier le Profil</h3>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <div style={{ position: 'relative' }}>
            <img
               src={previewImage || profilePicture} 
              alt="Profile"
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '4px solid #f3f3f3',
              }}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              style={{ display: 'none' }}
              id="fileInput"
            />
            <label
              htmlFor="fileInput"
              style={{
                position: 'absolute',
                bottom: '5px',
                right: '5px',
                backgroundColor: '#fff',
                borderRadius: '50%',
                padding: '8px',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              <span aria-label="edit"  style={{ fontSize: '20px' }}><MdModeEditOutline /></span>
            </label>
          </div>
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Nom :</label>
          <input
            type="text"
            placeholder="Nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#007bff')}
            onBlur={(e) => (e.target.style.borderColor = '#ccc')}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Email :</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#007bff')}
            onBlur={(e) => (e.target.style.borderColor = '#ccc')}
          />
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button
            onClick={() => setShowSettings(false)}
            style={{
              backgroundColor: '#f3f3f3',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#e0e0e0')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#f3f3f3')}
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            style={{
              backgroundColor: '#007bff',
              color: '#fff',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')}
          >
            Sauvegarder
          </button>
        </div>
      </div>
      
      
      
      )}
    </div>
  );
};

export default UserProfile;

