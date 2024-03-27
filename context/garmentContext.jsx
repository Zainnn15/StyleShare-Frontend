/* eslint-disable react/prop-types */
import axios from 'axios';
import { createContext, useState, useEffect, useContext } from 'react';
import { UserContext } from './userContext';

export const GarmentContext = createContext({});

export function GarmentContextProvider({ children }) {
  const { user } = useContext(UserContext); // Get user object from UserContext
  const [garment, setGarment] = useState(null);

  useEffect(() => {
    // Adjusted to check for user and user._id (or user.id based on your setup)
    if (user && user._id) { // Ensure you're checking the correct property
      axios.get(`/getGarmentDetails/${user._id}`, { withCredentials: true }) // Adjusted to user._id
        .then(({ data }) => {
          setGarment(data);
        })
        .catch(error => {
          console.error("Error fetching garment details:", error);
          setGarment(null); // Clear garment data on error
        });
    } else {
      setGarment(null); // Clear garment data if user is not logged in
    }
  }, [user]); // Dependency array includes user to re-run effect when user changes

  return (
    <GarmentContext.Provider value={{ garment, setGarment }}>
      {children}
    </GarmentContext.Provider>
  );
}
