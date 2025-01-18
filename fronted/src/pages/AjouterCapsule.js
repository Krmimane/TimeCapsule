import React, { useState, useEffect, useRef } from "react";
import api from "../axiosConfig"; 
import { useReactMediaRecorder } from "react-media-recorder"; 
import { useDropzone } from "react-dropzone"; // Pour gérer le téléchargement des fichiers
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaTrash } from "react-icons/fa";
import "../styles/AjouterCapsule.css";

const AjouterCapsule = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [type, setType] = useState("temporelle");
  const [openDate, setOpenDate] = useState("");
  const [recipients, setRecipients] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [contentType, setContentType] = useState("text");
  const [textContent, setTextContent] = useState("");
  const [file, setFile] = useState(null);
  const [recordedFile, setRecordedFile] = useState(null);
  const videoPreviewRef = useRef(null);
  const mediaStreamRef = useRef(null);

  const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
    audio: contentType === "audio",
    video: contentType === "video",
  });

  // Gestion du téléchargement via Dropzone
  const { getRootProps, getInputProps } = useDropzone({
    accept:
      contentType === "image"
        ? "image/*"
        : contentType === "audio"
        ? "audio/*"
        : contentType === "video"
        ? "video/*"
        : null,
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
  });

  const handleStartRecording = async () => {
    if (contentType === "video") {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        mediaStreamRef.current = stream;
        if (videoPreviewRef.current) {
          videoPreviewRef.current.srcObject = stream;
        }
        startRecording();
      } catch (err) {
        console.error("Erreur d'accès à la caméra :", err);
        alert("Impossible d'accéder à la caméra.");
      }
    } else {
      startRecording();
    }
  };

  const handleStopRecording = () => {
    if (mediaStreamRef.current) {
      const tracks = mediaStreamRef.current.getTracks();
      tracks.forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    stopRecording();
  };

  useEffect(() => {
    api.get("/users").then((response) => {
      setAllUsers(response.data);
    });
  }, []);

  const handleAddRecipient = (userId) => {
    if (userId && !recipients.includes(userId)) {
      setRecipients([...recipients, userId]);
    } else {
      console.warn("Utilisateur déjà ajouté ou ID invalide :", userId);
    }
  };

  const handleRemoveRecipient = (userId) => {
    setRecipients(recipients.filter((recipient) => recipient !== userId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const capsuleData = {
      title,
      description,
      is_public: isPublic,
      type,
      open_date: openDate,
    };
    console.log({
      type: contentType,
      textContent,
      file,
      mediaBlobUrl,
  });
  

    try {
      const response = await api.post("/capsules", capsuleData);
      const capsuleId = response.data.capsule.id;

      const contentData = new FormData();
      contentData.append("capsule_id", capsuleId);
      contentData.append("type", contentType);

      if (contentType === "text") {
        contentData.append("text_content", textContent);
      } else if (file) {
        contentData.append("file_path", file);
      } else if (mediaBlobUrl) {
        const blob = await fetch(mediaBlobUrl).then((res) => res.blob());
        const sizeInBytes = blob.size;

        contentData.append("file_path", blob, "recorded-media.webm");
        const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);

        console.log(`La taille de la vidéo est de ${sizeInBytes} octets (${sizeInMB} Mo).`);
      
      }

      await api.post(`/capsules/${capsuleId}/contents`, contentData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      for (const userId of recipients) {
        await api.post(`/capsules/${capsuleId}/recipients`, { user_id: userId });
      }

      alert("Capsule créée avec succès!");
    } catch (error) {
      console.error("Erreur lors de la création de la capsule",  error.response?.data);
      alert("Une erreur est survenue");
    }
  };

  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const previousStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const StepSlider = ({ step }) => (
    <div className="flex justify-between items-center mb-6">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className={`h-2 flex-1 rounded-full ${
            step > index ? "bg-blue-600" : "bg-gray-300"
          } mx-1`}
        ></div>
      ))}
    </div>
  );

  return (
    <div className="container">
      <h1 className="hugetitle">Ajouter une Capsule</h1>
      {/* Barre de progression */}
   {/* Barre de progression */}
<div className="step-slider">
  {["Capsule Details", "Capsule Content", "Recipient's Information", "Confirmation"].map((label, index) => (
    <div key={index} className={`step ${index < currentStep ? "completed" : ""} ${index === currentStep ? "current" : ""}`}>
      <div className="circle">{index < currentStep ? "✔" : index + 1}</div>
      <span className="label6">{label}</span>
      {index < 3 && <div className="line"></div>}
    </div>
  ))}
</div>

      {currentStep === 1 && (
        <form className="large-form">
        {/* Ligne pour le titre et le bouton "Est-ce public ?" */}
        <div className="form-row">
        <label className="labelform1" style={{ paddingRight: '75px' }}>Title :</label>
        <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <div className="toggle-container">
            <label className="labelform1" >Est-ce public ?</label>
            <input
              type="checkbox"
              checked={isPublic}
              onChange={() => setIsPublic(!isPublic)}
              className="toggle-switch"
            />
          </div>
        </div>

        {/* Ligne pour la description */}
        <div className="form-row">
          <label className="labelform1" style={{ paddingRight: '15px' }}>Description :</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Ligne pour le type de capsule */}
        <div className="form-row">
          <label className="labelform1">Capsule Type :</label>
          <select  value={type} onChange={(e) => setType(e.target.value)}>
            <option value="temporelle">Temporelle</option>
            <option value="auto-destructrice">Auto-destructrice</option>
          </select>
        </div>

        {/* Ligne pour la date et heure */}
        <div className="form-row">
          <label className="labelform1">Opening Date :</label>
          <input
            type="datetime-local"
            value={openDate}
            onChange={(e) => setOpenDate(e.target.value)}
          />
        </div>

        {/* Boutons en bas à droite */}
        <div className="button-row">
          <button type="button" className="next-button" onClick={nextStep}>
            Suivant
          </button>
        </div>
      </form>
      )}
      {currentStep === 2 && (
        <form className="large-form">
          <div>
            <label className="labelform1">Type de contenu :</label>
            <select className="inputform1" value={contentType} onChange={(e) => setContentType(e.target.value)}  style={{marginTop: "10px" }}>
              <option value="text">Texte</option>
              <option value="image">Image</option>
              <option value="video">Vidéo</option>
              <option value="audio">Audio</option>
            </select>
          </div>
          {contentType === "text" && (
            <div>
              <label className="labelform1">Texte :</label>
              <textarea className="inputform1"  style={{marginTop: "10px" ,height: "80px"}}
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
              />
            </div>
          )}
          {"image video audio".includes(contentType) && (
  <div>
    {/* Zone d'importation */}
    <div
      {...getRootProps()}
      style={{
        border: "2px dashed #007bff",
        borderRadius: "8px",
        padding: "20px",
        textAlign: "center",
        cursor: "pointer",
        color: "#555",
        backgroundColor: "#f9f9f9",
      }}
    >
      <input {...getInputProps()} />
      <div style={{ fontSize: "24px", marginBottom: "10px" }}>
        📁 {/* Icône */}
      </div>
      {file ? (
        <p>{file.name}</p>
      ) : (
        <p style={{ fontSize: "16px", fontWeight: "bold" }}>Drag and Drop file here or Choose file </p>
      )}
    </div>

    

   
  </div>
)}
          {contentType === "video" && (
            <div>
              {/* Label "ou" avec une ligne */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    margin: "15px 0",
                    color: "#888",
                  }}
                >
                  <div style={{ flex: 1, height: "1px", backgroundColor: "#ccc" }}></div>
                  <span style={{ margin: "0 10px" }}>ou</span>
                  <div style={{ flex: 1, height: "1px", backgroundColor: "#ccc" }}></div>
                </div>
               <div>
                {!mediaBlobUrl ? (
                  <div className="button-row2">
                    <button type="button" className="boutonajout" onClick={handleStartRecording}>
                      Commencer l'enregistrement
                    </button>
                    <button type="button" className="boutonajout" onClick={handleStopRecording}>
                      Arrêter l'enregistrement
                    </button>
                  </div>
                ) : (
                  <p>Enregistrement terminé. Vous pouvez visionner la vidéo ci-dessus.</p>
                )}
              </div>
              <center>
              <div style={{ marginBottom: "10px" }}>
                {mediaBlobUrl ? (
                  <video src={mediaBlobUrl} controls style={{ width: "50%" }} />
                ) : (
                  <video ref={videoPreviewRef} autoPlay style={{width: "50%",backgroundColor: "#000",marginBottom: "10px",}}/> )}
              </div>
              </center>
             
            </div>
          )}

          {contentType === "audio" && (
            <div>
              {/* Label "ou" avec une ligne */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "15px 0",
                  color: "#888",
                }}
              >
                <div style={{ flex: 1, height: "1px", backgroundColor: "#ccc" }}></div>
                <span style={{ margin: "0 10px" }}>ou</span>
                <div style={{ flex: 1, height: "1px", backgroundColor: "#ccc" }}></div>
              </div>
              <div className="button-row2">
                {!mediaBlobUrl ? (
                  <div>
                    <button type="button" className="boutonajout"  onClick={handleStartRecording}>
                      Commencer l'enregistrement
                    </button>
                    <button type="button" className="boutonajout" style={{marginLeft:'10px'}} onClick={handleStopRecording}>
                      Arrêter l'enregistrement
                    </button>
                  </div>
                ) : (
                  <p>Enregistrement terminé. Vous pouvez écouter l'audio ci-dessus.</p>
                )}
              </div>
              <div style={{ marginBottom: "10px" }}>
                {mediaBlobUrl ? (
                  <audio src={mediaBlobUrl} controls />
                ) : (
                  <p>En attente d'enregistrement...</p>
                )}
              </div>
              
            </div>
          )}
<div className="button-row">
  <button type="button" className="previous-button" onClick={previousStep}>
    Précédent
  </button>
  <button type="button" className="next-button" onClick={nextStep}>
    Suivant
  </button>
</div>
         </form>
      )}
      {currentStep === 3 && (
        <form className="large-form">
          <div>
            <label className="labelform1" style={{marginBottom:"10px" ,fontSize:"2.5rem"}} >Destinataires :</label>
            <select  className="inputform1" style={{marginTop: "10px" }} onChange={(e) => {
            handleAddRecipient(e.target.value);
          }} >
            {allUsers.map((user) => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
  
  {recipients.map((recipientId) => {
    const user = allUsers.find((u) => String(u.id) === String(recipientId));

    return (
      <div >

        <div key={recipientId} className="recipient-item">
          <div className="recipient-info">
            <div className="recipient-name">{user?.name}</div>
            <button type="button"className="remove-btn" onClick={() => handleRemoveRecipient(recipientId)}>
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    );
  })}


  

</div>

          <div className="button-row">
          <button type="button" className="previous-button" onClick={previousStep}>
            Précédent
          </button>
          <button type="button" className="next-button" onClick={nextStep}>
            Suivant
</button></div>
        </form>
      )}
      {currentStep === 4 && (
        <div className="large-recaputilatif">
          <h1 className="labelform1" style={{marginBottom:"10px" ,fontSize:"2.5rem"}}>Récapitulatif</h1>
          <p className="labelform1"><strong>Titre :</strong> {title}</p>
          <p className="labelform1"><strong>Description :</strong> {description}</p>
          <p className="labelform1"><strong>Public :</strong> {isPublic ? "Oui" : "Non"}</p>
          <p className="labelform1"><strong>Type de capsule :</strong> {type}</p>
          <p className="labelform1"><strong>Date d'ouverture :</strong> {openDate}</p>
          <p className="labelform1"><strong>Type de contenu :</strong> {contentType}</p>
          {contentType === "text" && <p className="labelform1"><strong>Contenu texte :</strong> {textContent}</p>}
          {file && <p><strong>Fichier :</strong> {file.name}</p>}
          <p className="labelform1"><strong>Destinataires :</strong> {recipients.map((id) => allUsers.find((u) => String(u.id) === String(id))?.name).join(", ")}</p>
          <div className="button-row">
          <button type="button" className="next-button" onClick={previousStep}>Précédent</button>
          <button type="submit"  className="submitajout" onClick={handleSubmit}>Créer la capsule</button>
          </div>
        </div>
      )}


    </div>
  );
};

export default AjouterCapsule;
