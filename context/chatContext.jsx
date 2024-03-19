/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from 'react';
import io from 'socket.io-client';
import { UserContext } from './userContext'; // Assuming UserContext is in the same folder
import axios from 'axios';
import { GroupContext } from './groupContext'; // Import GroupContext

export const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const { joinedGroup } = useContext(GroupContext); // Use joinedGroup from GroupContext
  const [chatHistory, setChatHistory] = useState([]);
  const ENDPOINT = "http://localhost:8000";
  let socket;

  useEffect(() => {
    socket = io(ENDPOINT);
    console.log('Socket connected:', socket.connected);
  
    const handleJoinRoom = () => {
      if (joinedGroup?._id) {
        fetchChatHistory(joinedGroup._id);
        socket.emit('joinRoom', joinedGroup._id);
  
        socket.on('message', (message) => {
          console.log("Received message:", message);
          setChatHistory((prevMessages) => [...prevMessages, message]);
        });
      } else {
        setChatHistory([]);
      }
    };
  
    handleJoinRoom();
  
    return () => {
      if (joinedGroup?._id) {
        socket.emit('leaveRoom', joinedGroup._id);
      }
      socket.disconnect();
      socket.off();
    };
  }, [joinedGroup]); // Depend on joinedGroup from GroupContext

  const fetchChatHistory = async (groupId) => {
    try {
      const response = await axios.get(`/getChatHistory/${groupId}`);
      setChatHistory(response.data);
    } catch (error) {
      console.error("Failed to fetch chat history", error);
    }
  };

  const sendChatMessage = async (message) => {
    console.log('sendChatMessage called with:', message); // Add this line

    if (message.trim() && joinedGroup?._id) {
        const chatMessage = {
            message,
            userId: user.id,
            groupId: joinedGroup._id,
        };
        socket.emit('chatMessage', chatMessage);
        await axios.post('/postMessage', chatMessage);
    }
};

  return (
    <ChatContext.Provider value={{ chatHistory, sendChatMessage }}>
      {children}
    </ChatContext.Provider>
  );
};