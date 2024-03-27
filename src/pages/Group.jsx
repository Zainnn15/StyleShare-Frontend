import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/userContext';
import { GroupContext } from '../../context/groupContext';
import { GarmentContext } from '../../context/garmentContext';
import ScreenHeaderIn from '../components/common/ScreenHeaderIn';
import '../styles/main.scss';
import { toast } from 'react-hot-toast';
import axios from 'axios';

export default function Group() {
    const [joinCode, setJoinCode] = useState('');
    const { user } = useContext(UserContext);
    const { garment } = useContext(GarmentContext);
    const { userGroups, setJoinedGroup, joinedGroup} = useContext(GroupContext);
    const [chatInput, setChatInput] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

      // Fetching chat history when joinedGroup changes
      useEffect(() => {
        if (joinedGroup && joinedGroup._id) {
            fetchChatHistory(joinedGroup._id);
        } else {
            setChatHistory([]); // Clear chat history if no group is joined
        }
    }, [joinedGroup]);

    const fetchChatHistory = async (groupId) => {
        try {
            const response = await axios.get(`http://localhost:8000/getChatHistory/${groupId}`);
            setChatHistory(response.data);
        } catch (error) {
            console.error("Failed to fetch chat history", error);
            toast.error("Failed to fetch chat history.");
        }
    };
    
    // Handle joining a group by code
    const handleJoinByCode = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/joinGroupByCode', {
                userId: user._id,
                joinCode
            });
            toast.success("Joined group successfully!");
            setJoinedGroup(response.data.group);
        } catch (error) {
            toast.error(error.response?.data?.error || "Failed to join group.");
        }
    };

   // Function to send a new chat message
   const handleSendChat = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    try {
        const response = await axios.post('/postMessage', {
            groupId: joinedGroup._id,
            userId: user._id, // Ensure this is correct
            message: chatInput,
        });
        setChatHistory([...chatHistory, response.data]); // Append new message to chat history
        setChatInput(''); // Clear input after sending
    } catch (error) {
        console.error("Failed to send chat message", error);
        toast.error("Failed to send chat message.");
    }
};



const handleLeaveGroup = async () => {
    try {
        const response = await axios.post('/leaveGroup', {
            userId: user._id,
            groupId: joinedGroup?._id
        });
        // Assuming success if no exception is thrown
        toast.success(response.data.message || "Left group successfully!");
        setJoinedGroup(null); 
    } catch (error) {
        console.error("Error leaving group:", error.response?.data?.error || "Failed to leave group.");
        toast.error(error.response?.data?.error || "Failed to leave group.");
    }
};
    return (
        <div>
        <ScreenHeaderIn />
        <div className="container main">
          <form onSubmit={handleJoinByCode}>
            <div className="container-small">
              <div>
                <label className="container-title">Enter Group Code to Join</label>
                <hr />
              </div>
              <br />
  
              <div>
                <label htmlFor="groupCode">Group Code:</label>
                <input
                  id="joinCode"
                  type="text"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value)}
                  required
                />
              </div>
              <br />
  
              <button className="button-form" type="submit" style={{ width: '100%' }}>
                Join Group
              </button>
            </div>
          </form>

          {userGroups && userGroups.members && (
    <div className="container-content">
        <h2>Group Members and Their Garments</h2>
        {userGroups.members.map((member) => (
            <div key={member._id} className="member-garments">
                <p>
                    <label className="text-b">Member: </label>
                    {`${member.username} - Email: ${member.email}`}
                </p>
                {member.garments && member.garments.length > 0 ? (
                    member.garments.map((garment) => (
                        <div key={garment._id} className="garment-details">
                            <p>Type: {garment.garmentType}</p>
                            <p>Description: {garment.garmentDescription}</p>
                            <p>Country: {garment.garmentCountry}</p>
                            <img src={`http://localhost:8000/${garment.fileFront?.replace(/\\/g, '/') || 'default-image-path.jpg'}`} alt="Garment" style={{ width: '100px', height: '100px' }} />
                            {/* Provide a default image path if fileFront is undefined */}
                        </div>
                    ))
                ) : (
                    <p>No garments listed.</p>
                )}
            </div>
        ))}
    </div>
)}

                {userGroups && userGroups.members && (
                    <div className="container-content">
                        <p>
                            <label className="text-b">Joined Group: </label>
                            {`${userGroups.group_name} - Members: ${userGroups.members.length}/${userGroups.max_members}`}
                        </p>
                    </div>
                )}

                {user && joinedGroup && (
                    <div className="container-content">
                        <p>
                            <label className="text-b">Joined User: </label>
                            {`${user.name} - Username: ${user.username} - Email: ${user.email}`}
                        </p>
                    </div>
                )}

                {userGroups && userGroups.members && (
                    <div className="container-content">
                        <p>
                            <label className="text-b">Other Joined Persons: </label>
                            {userGroups.members.map(member => member.username).filter(username => username !== user.username).join(', ')}
                        </p>
                    </div>
                )}

                {garment && joinedGroup && (
                    <div className="container-content">
                        <p>
                            <label className="text-b">Joined Garment: </label>
                            {`Type: ${garment.garmentType}, Description: ${garment.garmentDescription}, Country: ${garment.garmentCountry}`}
                        </p>
                    </div>
                )}

                <button onClick={handleLeaveGroup}>Leave Group</button>
            </div>
            <div className="chat-container">
  <h3>Group Chat</h3>
  <div className="chat-history">
    {chatHistory.map((msg, index) => (
      <div key={index} className="chat-message">
        <div className="message-header">
          <span className="username">{msg.user.username}</span>
          <span className="timestamp">{new Date(msg.createdAt).toLocaleString()}</span>
        </div>
        <div className="message-content">{msg.message}</div>
      </div>
    ))}
  </div>
  <form onSubmit={handleSendChat}>
    <input
      type="text"
      value={chatInput}
      onChange={(e) => setChatInput(e.target.value)}
      placeholder="Type a message..."
    />
    <button type="submit">Send</button>
  </form>
</div>
  </div>
    );
}
