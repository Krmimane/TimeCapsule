import React, { useEffect, useState } from 'react';
import api from '../axiosConfig';
import '../styles/CapsuleList.css'; // Importation des styles avec un nouveau fichier

const CapsuleList = () => {
    const [capsules, setCapsules] = useState({ readyToOpen: [], pending: [] });

    useEffect(() => {
        const fetchCapsules = async () => {
            try {
                const response = await api.get('/capsules/received');
                setCapsules(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des capsules', error);
            }
        };

        fetchCapsules();
    }, []);

    return (
        <div className="capsules-container24">
            {/* Section gauche : En attente */}
            <div className="capsules-section24 left24">
                <h2>En attente</h2>
                {capsules.pending.length > 0 ? (
                    capsules.pending.map((capsule) => (
                        <div key={capsule.id} className="capsule-item24 locked24">
                            <div className="locked-overlay24">
                                <div className="lock-icon24">
                                    <span role="img" aria-label="lock">🔒</span>
                                </div>
                            </div>
                            <h3>{capsule.title}</h3>
                            <p>{capsule.description}</p>
                        </div>
                    ))
                ) : (
                    <p>Aucune capsule en attente</p>
                )}
            </div>

            {/* Section droite : Prêtes à ouvrir */}
            <div className="capsules-section24 right24">
                <h2>Prêtes à ouvrir</h2>
                {capsules.readyToOpen.length > 0 ? (
                    capsules.readyToOpen.map((capsule) => (
                        <div key={capsule.id} className="capsule-item24">
                            <h3>{capsule.title}</h3>
                            <p>{capsule.description}</p>
                        </div>
                    ))
                ) : (
                    <p>Aucune capsule prête à ouvrir</p>
                )}
            </div>
        </div>
    );
};

export default CapsuleList;
