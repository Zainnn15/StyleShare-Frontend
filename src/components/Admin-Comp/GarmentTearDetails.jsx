/* eslint-disable react/prop-types */
// src/components/Admin-Comp/GarmentTearDetails.jsx

import { useEffect, useState } from 'react';
import axios from 'axios';
import "../../styles/garmentTearDetails.css"; // Assuming this is the new CSS file for styling

const GarmentTearDetails = ({ garmentId, groupId }) => {
  const [tearDetails, setTearDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTearDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/garment-tear/${garmentId}/group/${groupId}`,
          {
            withCredentials: true,
          }
        );
        setTearDetails(response.data || []);
        console.log('Tear Details:', response.data);
      } catch (error) {
        console.error('Error fetching tear details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (garmentId && groupId) {
      fetchTearDetails();
    }
  }, [garmentId, groupId]);

  return (
    <div className="tear-details-container">
      {loading ? (
        <p>Loading tear details...</p>
      ) : (
        <div className="tear-details">
          <h3 className="tear-title">Tear Details</h3>
          {tearDetails.length > 0 ? (
            <table className="tear-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Date</th>
                  <th>Has Tear</th>
                  <th>Want Repair</th>
                  <th>Color Fading</th>
                  <th>Pilling Area</th>
                  <th>Pilling Strength</th>
                  <th>Shape Loss Area</th>
                  <th>Twisting Area</th>
                  <th>Twisting Size</th>
                  <th>Twisting Image</th>
                  <th>Hole Image</th>
                  <th>Stain Image</th>
                </tr>
              </thead>
              <tbody>
                {tearDetails.map((tear, index) => (
                  <tr key={index}>
                    <td>{tear.modifier || 'Unknown User'}</td> {/* User who entered the data */}
                    <td>{tear.tearDate || 'N/A'}</td> {/* Date the tear was reported */}
                    <td>{tear.hasTear ? 'Yes' : 'No'}</td> {/* Whether there is a tear */}
                    <td>{tear.wantRepair ? 'Yes' : 'No'}</td> {/* If repair is requested */}
                    <td>{tear.colorFading || 'N/A'}</td> {/* Color fading information */}
                    <td>{tear.pillingArea || 'N/A'}</td> {/* Pilling area */}
                    <td>{tear.pillingStrength || 'N/A'}</td> {/* Pilling strength */}
                    <td>{tear.shapeLossArea || 'N/A'}</td> {/* Shape loss area */}
                    <td>{tear.twistingArea || 'N/A'}</td> {/* Twisting area */}
                    <td>{tear.twistingSize || 'N/A'}</td> {/* Twisting size */}
                    
                    {/* Twisting Image */}
                    <td className="image-cell">
                      {tear.twistingImg ? (
                        <div>
                          <img
                            src={tear.twistingImg}
                            alt="Twisting"
                            className="tear-image"
                          />
                          <span className="image-label">Twisting</span>
                        </div>
                      ) : (
                        <span className="no-image">No Twisting Image</span>
                      )}
                    </td>

                    {/* Hole Image */}
                    <td className="image-cell">
                      {tear.holeImg ? (
                        <div>
                          <img
                            src={tear.holeImg}
                            alt="Hole"
                            className="tear-image"
                          />
                          <span className="image-label">Hole</span>
                        </div>
                      ) : (
                        <span className="no-image">No Hole Image</span>
                      )}
                    </td>

                    {/* Stain Image */}
                    <td className="image-cell">
                      {tear.stainImg ? (
                        <div>
                          <img
                            src={tear.stainImg}
                            alt="Stain"
                            className="tear-image"
                          />
                          <span className="image-label">Stain</span>
                        </div>
                      ) : (
                        <span className="no-image">No Stain Image</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No tear details available for this garment.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default GarmentTearDetails;
