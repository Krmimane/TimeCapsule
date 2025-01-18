import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';

<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
/>

export const Services = () => {
  return (
    <div id="services" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Our Services</h2>
          <p>
            We offer unique and personalized services to help you preserve your most cherished memories for the future.
          </p>
        </div>
        <div className="row">
          <div className="col-md-4">
            <i className="fa fa-plus"></i> {/* Icône boîte pour Create Your Capsule */}
            <div className="service-desc">
              <h3 style={{fontWeight:"bold"}}>Create Your Capsule</h3>
              <p>
                Create a personalized time capsule where you can store messages, photos, and videos to be revealed at a later date.
              </p>
            </div>
          </div>
          <div className="col-md-4">
          <i className="fa fa-comment"></i>
             {/* Icône stylo pour Personalized Messages */}
            <div className="service-desc">
              <h3 style={{fontWeight:"bold"}}>Personalized Messages</h3>
              <p>
                Write heartfelt letters and messages that will be revealed to your loved ones in the future, making your time capsule even more meaningful.
              </p>
            </div>
          </div>
          <div className="col-md-4" >
            <i className="fa fa-calendar"></i>
            <div className="service-desc">
              <h3 style={{fontWeight:"bold"}}>Scheduled Release</h3>
              <p>
                Choose a specific date or event in the future to unlock and share your time capsule, creating a memorable moment.
              </p>
            </div>
          </div>
          
          
          
        </div>
      </div>
    </div>
  );
};
