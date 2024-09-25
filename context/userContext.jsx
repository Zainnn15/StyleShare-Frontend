/* eslint-disable react/prop-types */
// UserContext.js
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      setLoading(true); // Ensures loading is true at the start of the session check
      try {
        const response = await axios.get('/checkSession', { withCredentials: true });
        // Assuming the backend directly returns the user object if the session is valid
        if (response.data) {
          setUser(response.data); // This should now include user.isAdmin if present
        }
      } catch (error) {
        console.error('Session check failed:', error);
        setUser(null);
      } finally {
        setLoading(false); // Ensures loading is set to false after the session check is complete
      }
    };

    checkSession();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
