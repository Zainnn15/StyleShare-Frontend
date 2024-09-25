/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import axios from 'axios';

const GarmentIndividualWearDetails = ({ garmentId }) => {
  const [wearData, setWearData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWearData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/garment-wear/${garmentId}/individual`);
        setWearData(response.data);
      } catch (error) {
        console.error('Error fetching wear data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (garmentId) {
      fetchWearData();
    }
  }, [garmentId]); // Make sure garmentId is passed correctly

  if (loading) {
    return <div>Loading wear data...</div>;
  }

  return (
    <div>
      <h2>Wear Details for Individual Participants</h2>
      {wearData.length === 0 ? (
        <p>No wear data found for this garment.</p>
      ) : (
        wearData.map((wearEntry, index) => (
          <div key={index}>
            <h3>{wearEntry.user?.username || wearEntry.modifier}</h3> {/* Show modifier if user not available */}
            <p>Total Wear Time: {wearEntry.totalWearTime} hours</p>
            <ul>
              {wearEntry.wearEntries.map((entry, idx) => (
                <li key={idx}>
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

export default GarmentIndividualWearDetails;
