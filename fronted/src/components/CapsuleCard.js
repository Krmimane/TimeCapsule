import React, { useState, useEffect } from "react";
import "../styles/CapsuleCard.css";

const CapsuleCard = ({ capsule, onLike, onComment }) => {
  const [reactions, setReactions] = useState(() => {
    const savedReactions = localStorage.getItem(`capsule-${capsule.id}-reactions`);
    return savedReactions ? JSON.parse(savedReactions) : capsule.reactions || [];
  });

  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Synchroniser isLiked avec les données de réactions au montage
  useEffect(() => {
    const hasLiked = reactions.some((reaction) => reaction.type === "like" && reaction.user_id === 1);
    setIsLiked(hasLiked);
  }, [reactions]);

  const saveReactions = (updatedReactions) => {
    localStorage.setItem(`capsule-${capsule.id}-reactions`, JSON.stringify(updatedReactions));
  };

  const handleLikeClick = () => {
    const hasLiked = reactions.some((reaction) => reaction.type === "like" && reaction.user_id === 1);

    if (hasLiked) {
      // Supprimer le like
      const updatedReactions = reactions.filter(
        (reaction) => !(reaction.type === "like" && reaction.user_id === 1)
      );
      setReactions(updatedReactions);
      saveReactions(updatedReactions);
      setIsLiked(false);
      console.log("Like removed.");
    } else {
      // Ajouter un like
      if (typeof onLike === "function") {
        onLike(capsule.id);
      }
      const updatedReactions = [...reactions, { type: "like", user_id: 1 }];
      setReactions(updatedReactions);
      saveReactions(updatedReactions);
      setIsLiked(true);
      console.log("Like added.");
    }
  };

  const handleClick = (action) => {
    const button = document.getElementById(`${action}-button`);
    button.classList.add("clicked");
    setTimeout(() => {
      button.classList.remove("clicked");
    }, 300);
  };

  const handleAddComment = () => {
    if (commentText.trim()) {
      if (typeof onComment === "function") {
        onComment(capsule.id, commentText);
      }
      const updatedReactions = [
        ...reactions,
        { type: "comment", user_id: 1, comment_text: commentText },
      ];
      setReactions(updatedReactions);
      saveReactions(updatedReactions);
      setCommentText("");
    }
  };
  const getStorageUrl = (filePath) => {
    console.log(filePath);

    const a=filePath ? `http://localhost:8000/storage/${filePath}` : null;
    console.log(a);

    return a;
  };
  return (
    <div className="capsule-card-theme25">
      <div className="capsule-header25">
        <img
          src={capsule.user.profilePicture || "https://via.placeholder.com/50"}
          alt={capsule.user.name || "User"}
          className="capsule-profile-picture25"
        />
        <div className="capsule-user-info25">
          <h3 className="capsule-user-name25">{capsule.user.name || "Unknown User"}</h3>
          <p className="capsule-user-username25">@{capsule.user.name}</p>
        </div>
      </div>

      <div className="capsule-content25">
        <h3 className="capsule-title25">{capsule.title || "Untitled Capsule"}</h3>
        <p className="capsule-description25">{capsule.description || "No description available."}</p>
      </div>
      <div className="capsule-contents25">
  {Array.isArray(capsule.contents) && capsule.contents.length > 0 ? (
    capsule.contents.map((content, index) => (
      <div key={index} className="capsule-content-item25">
        {content.type === "image" && (
          <img src={getStorageUrl(content.file_path)} alt="Capsule content" className="capsule-content-image25" />
        )}
        {content.type === "text" && (
          <p className="capsule-content-text25">{content.text_content}</p>
        )}
        {content.type === "video" && (
          <video controls className="capsule-content-video25"  width="100%" height="200vh">
            <source src={getStorageUrl(content.file_path)} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        {content.type === "audio" && (
          <audio controls className="capsule-content-audio25">
            <source src={getStorageUrl(content.file_path)} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}
      </div>
    ))
  ) : (
    <p className="no-contents25">Aucun contenu disponible.</p>
  )}
</div>


      <div className="capsule-buttons25">
        <button
          id="like-button"
          className={`button-icon25 ${isLiked ? "liked" : ""}`}
          onClick={handleLikeClick}
        >
          <div style={{fontSize:"2rem"}}>❤️</div> <span style={{fontSize:"2rem", color:"black"}}>{reactions.filter((r) => r.type === "like").length}</span>
        </button>
        <button
          id="comment-button"
          className="button-icon25"
          onClick={() => {
            handleClick("comment");
            setShowComments(!showComments);
          }}
        >
          <div style={{fontSize:"2rem"}}>💬</div> <span style={{fontSize:"2rem", color:"black"}}>{reactions.filter((r) => r.type === "comment").length}</span>
        </button>
      </div>

      {showComments && (
        <div className="comments-section25">
          <div className="comments-list25">
            {reactions
              .filter((reaction) => reaction.type === "comment")
              .map((reaction, index) => (
                <p key={index} className="comment25">{reaction.comment_text}</p>
              ))}
          </div>
          <div className="add-comment25">
            <input
              type="text"
              className="comment-input25"
              placeholder="Add a comment"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button className="comment-button25" onClick={handleAddComment}>
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CapsuleCard;
