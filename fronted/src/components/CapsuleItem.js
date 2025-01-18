import React from 'react';
import PropTypes from 'prop-types';
import './CapsuleItem.css'; // Importation des styles

const CapsuleItem = ({ title, description, status }) => {
    return (
        <div className="capsule-item">
            <h3 className="capsule-title">{title}</h3>
            <p className="capsule-description">{description}</p>
            <p className={`capsule-status ${status === 'Prête à ouvrir' ? 'ready' : 'pending'}`}>
                {status}
            </p>
        </div>
    );
};

CapsuleItem.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    status: PropTypes.oneOf(['Prête à ouvrir', 'En attente']).isRequired,
};

export default CapsuleItem;
