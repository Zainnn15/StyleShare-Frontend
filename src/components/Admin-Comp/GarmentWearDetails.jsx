/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import axios from 'axios';

const GarmentWearDetails = ({ garmentId, groupId, onWearDetailsLoaded }) => {
  const [wearData, setWearData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [setTotalWearTime] = useState(0);

  useEffect(() => {
    const fetchWearData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/garment-wear/${garmentId}/group/${groupId}`);
        setWearData(response.data);

        // Calculate the total wear time
        const totalTime = Object.keys(response.data).reduce((acc, userId) => {
          return acc + response.data[userId].totalWearTime;
        }, 0);

        setTotalWearTime(totalTime);
        onWearDetailsLoaded(totalTime); // Pass the total time to the parent component
      } catch (error) {
        console.error('Error fetching wear data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (garmentId && groupId) {
      fetchWearData();
    }
  }, [garmentId, groupId, onWearDetailsLoaded]);

  if (loading) {
    return <div>Loading wear data...</div>;
  }

  return (
    <div className="wear-details-box">
      <h2>Wear Details for Group Members</h2>
      {Object.keys(wearData).length === 0 ? (
        <p>No wear data found for this garment.</p>
      ) : (
        Object.keys(wearData).map((userId) => (
          <div key={userId} className="wear-entry">
            <h3>{wearData[userId].user.username}</h3>
            <p>Total Wear Time: {wearData[userId].totalWearTime} hours</p>
            <ul>
              {wearData[userId].wearEntries.map((entry, index) => (
                <li key={index}>
                  Worn on: {entry.date}, Wear Time: {entry.wearTime} hours
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default GarmentWearDetails;
