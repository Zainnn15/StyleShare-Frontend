import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GarmentFeelDetails = ({ garmentId, groupId }) => {
  const [loading, setLoading] = useState(false);
  const [feelData, setFeelData] = useState([]);

  useEffect(() => {
    const fetchGarmentFeelDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8000/garment-feel/${garmentId}/group/${groupId}`, {
          withCredentials: true,
        });
        setFeelData(response.data);
      } catch (error) {
        console.error('Error fetching garment feel details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGarmentFeelDetails();
  }, [garmentId, groupId]);

  if (loading) {
    return <p>Loading Feel Data...</p>;
  }

  return (
    <div className="feel-details">
      {feelData.length === 0 ? (
        <p>No feel data found for this garment.</p>
      ) : (
        <table className="feel-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Date</th>
              <th>Comfort</th>
              <th>Comments</th>
              <th>Occasion</th>
              <th>Occasion Experience</th>
            </tr>
          </thead>
          <tbody>
            {feelData.map(feel => (
              <tr key={feel._id}>
                <td>{feel.modifier}</td>
                <td>{new Date(feel.feelDate).toLocaleDateString()}</td>
                <td>{feel.feelComfyExp}</td>
                <td>{feel.feelComment || 'N/A'}</td>
                <td>{feel.feelOccasion || 'N/A'}</td>
                <td>{feel.feelOccasionExp || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GarmentFeelDetails;
