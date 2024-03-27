/* eslint-disable react/prop-types */
import { useContext, useState, useEffect, createContext, useCallback } from 'react';
import axios from 'axios';
import { UserContext } from './userContext'; // Ensure the path is correct based on your project structure

export const GarmentContext = createContext();

export const GarmentContextProvider = ({ children }) => {
    const { user, loading: userLoading } = useContext(UserContext);
    const [garment, setGarment] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchGarmentDetails = useCallback(async () => {
        // Wait until user is loaded and ensure there's a user object
        if (!userLoading && user && user._id) {
            try {
                const response = await axios.get(`/getGarmentDetails/${user._id}`, { withCredentials: true });
                setGarment(response.data); // Adjust based on actual response structure
            } catch (error) {
                console.error('Error fetching garment details:', error);
                setGarment(null);
            } finally {
                setLoading(false);
            }
        }
    }, [user, userLoading]);

    useEffect(() => {
        setLoading(true); // Optional: Reset loading state on user change
        fetchGarmentDetails();
    }, [fetchGarmentDetails]);

    return (
        <GarmentContext.Provider value={{ garment, setGarment, loading }}>
            {children}
        </GarmentContext.Provider>
    );
};
