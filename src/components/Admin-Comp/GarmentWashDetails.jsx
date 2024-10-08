/* eslint-disable react/prop-types */
// src/components/Admin-Comp/GarmentWashDetails.jsx

import { useEffect, useState } from 'react';
import axios from 'axios';
import "../../styles/garmentWashDetails.css"; // Create a new CSS file for stylin

const GarmentWashDetails = ({ garmentId, groupId }) => {
  const [washDetails, setWashDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWashDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/garment-wash/${garmentId}/group/${groupId}`,
          {
            withCredentials: true,
          }
        );
        setWashDetails(response.data || []);
        console.log('Wash Details:', response.data);
      } catch (error) {
        console.error('Error fetching wash details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (garmentId && groupId) {
      fetchWashDetails();
    }
  }, [garmentId, groupId]);

  return (
    <div className="wash-details-container">
      {loading ? (
        <p>Loading wash details...</p>
      ) : (
        <div className="wash-details">
          <h3 className="wash-title">Wash Care Details</h3>
          {washDetails.length > 0 ? (
            <table className="wash-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Wash Date</th>
                  <th>Wash Method</th>
                  <th>Wash Heat</th>
                  <th>Wash Temp</th>
                  <th>Dry Method</th>
                  <th>Dry Air</th>
                  <th>Dry Shade</th>
                  <th>Dry Heat</th>
                  <th>Use Dry Cleaning?</th>
                  <th>Dry Cleaning Solvent</th>
                  <th>Dry Cleaning Care</th>
                  <th>Iron Heat</th>
                  <th>Use Iron?</th>
                  <th>Iron Duration</th>
                  <th>Is Ventilated?</th>
                  <th>Ventilated Time</th>
                </tr>
              </thead>
              <tbody>
                {washDetails.map((wash, index) => (
                  <tr key={index}>
                    <td>{wash.modifier || 'Unknown User'}</td> {/* User who entered the data */}
                    <td>{wash.washDate || 'N/A'}</td> {/* Date of the wash */}
                    <td>{wash.careWash?.Method || 'N/A'}</td> {/* Wash method */}
                    <td>{wash.careWash?.Heat || 'N/A'}</td> {/* Wash heat */}
                    <td>{wash.careWash?.Temp || 'N/A'}</td> {/* Wash temperature */}
                    <td>{wash.careDry?.Method || 'N/A'}</td> {/* Dry method */}
                    <td>{wash.careDry?.Air || 'N/A'}</td> {/* Dry air */}
                    <td>{wash.careDry?.Shade || 'N/A'}</td> {/* Dry shade */}
                    <td>{wash.careDry?.Heat || 'N/A'}</td> {/* Dry heat */}
                    <td>{wash.useDryC ? 'Yes' : 'No'}</td> {/* Use dry cleaning? */}
                    <td>{wash.careDryC?.Solvent || 'N/A'}</td> {/* Dry cleaning solvent */}
                    <td>{wash.careDryC?.Care || 'N/A'}</td> {/* Dry cleaning care */}
                    <td>{wash.careIron?.Heat || 'N/A'}</td> {/* Iron heat */}
                    <td>{wash.useIron ? 'Yes' : 'No'}</td> {/* Use iron? */}
                    <td>{wash.ironDuration || 'N/A'}</td> {/* Iron duration */}
                    <td>{wash.isVentilated ? 'Yes' : 'No'}</td> {/* Is ventilated? */}
                    <td>{wash.ventilatedTime || 'N/A'}</td> {/* Ventilated time */}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No wash care details available for this garment.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default GarmentWashDetails;
