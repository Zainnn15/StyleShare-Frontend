/* eslint-disable react/prop-types */
import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
        try {
            const response = await axios.get('/profile', { withCredentials: true });
            setUser(response.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
            setUser(null); // Ensure user is set to null if there's an error or no session
        } finally {
            setLoading(false); // Set loading to false after the attempt to fetch user data
        }
    };

    fetchUserData();
}, []);

return (
    <UserContext.Provider value={{ user, setUser, loading }}>
        {!loading && children}
    </UserContext.Provider>
);
};
