/* eslint-disable react/prop-types */
import axios from 'axios';
import { createContext, useState, useEffect, useContext } from 'react';
import { UserContext } from './userContext';
import { GarmentContext } from './garmentContext';

export const GroupContext = createContext({});

export function GroupContextProvider({ children }) {
  const { user } = useContext(UserContext);
  const { garment } = useContext(GarmentContext);
  const [userGroups, setUserGroups] = useState([]);
  const [openGroups, setOpenGroups] = useState([]);
  const [groupMembers, setGroupMembers] = useState([]);
  const [joinedGroup, setJoinedGroup] = useState([]); // Change initial state to null

  // Fetch user's groups and open groups
  useEffect(() => {
    const fetchUserGroups = async () => {
      try {
        if (user && user.id) {
          const response = await axios.get(`/getGroups/${user.id}`);
          setUserGroups(response.data.userGroups);
        }
      } catch (error) {
        console.error('Error fetching user groups:', error);
      }
    };

    const fetchOpenGroups = async () => {
      try {
        const response = await axios.get('/getOpenGroups');
        setOpenGroups(response.data.openGroups);
      } catch (error) {
        console.error('Error fetching open groups:', error);
      }
    };


    // Call the functions to fetch data when the component mounts
    fetchUserGroups();
    fetchOpenGroups();
  }, [user]);

  const groupContextValue = {
    userGroups,
    openGroups,
    groupMembers,
    joinedGroup,
    garment,
    setUserGroups,
    setOpenGroups,
    setGroupMembers,
    setJoinedGroup,
  };

  return (
    <GroupContext.Provider value={groupContextValue}>
      {children}
    </GroupContext.Provider>
  );
}