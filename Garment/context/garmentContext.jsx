/* eslint-disable react/prop-types */
import axios from 'axios';
import { createContext, useState, useEffect, useContext } from 'react';
import { UserContext } from './userContext';

export const GarmentContext = createContext({});

export function GarmentContextProvider({ children }) {
  const { user } = useContext(UserContext); // Get user object from UserContext
  const [garment, setGarment] = useState(null);

  useEffect(() => {
    if (user && !garment) { // Check if user is available before making the request
      axios.get(`/getGarmentDetails/${user.id}`).then(({ data }) => {
        setGarment(data);
      });
    }
  }, [user, garment]);

  return (
    <GarmentContext.Provider value={{ garment, setGarment }}>
      {children}
    </GarmentContext.Provider>
  );
}