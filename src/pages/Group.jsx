import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/userContext';
import { GroupContext } from '../../context/groupContext';
import { GarmentContext } from '../../context/garmentContext';
import { ChatContext } from '../../context/chatContext'; // Import the ChatContext
import ScreenHeaderIn from '../components/common/ScreenHeaderIn';
import '../styles/main.scss';
import { changeTitle } from '../constants/functions/inputHandlers';
import { toast } from 'react-hot-toast';
import axios from 'axios';

export default function Group() {
    const [joinCode, setJoinCode] = useState('');
    const { user } = useContext(UserContext);
    const { garment } = useContext(GarmentContext);
    const { userGroups, setJoinedGroup, joinedGroup} = useContext(GroupContext);
    const { chatHistory, sendChatMessage} = useContext(ChatContext); // Use ChatContext
    const [chatInput, setChatInput] = useState('');
    
    // Handle joining a group by code
    const handleJoinByCode = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/joinGroupByCode', {
                userId: user.id,
                joinCode
            });
            toast.success("Joined group successfully!");
            setJoinedGroup(response.data.group);
        } catch (error) {
            toast.error(error.response?.data?.error || "Failed to join group.");
        }
    };

    const handleSendChat = async (e) => {
        e.preventDefault();
      
        if (chatInput.trim() && joinedGroup?._id) {
          await sendChatMessage(chatInput);
          setChatInput('');
        } else if (!joinedGroup) {
          toast.error('Please join a group to send messages.');
        }
      };

    useEffect(() => {
        changeTitle('Group Chat');
    }, []);

    const handleLeaveGroup = async () => {
        try {
            // Assuming you have an API endpoint to remove a user from a group
            const response = await axios.post('/leaveGroup', {
                userId: user.id, // User ID
                groupId: joinedGroup?._id // Group ID to leave
            });
    
            // Check response for success/failure
            if (response.data.success) {
                toast.success("Left group successfully!");
                
                // Update state or context to reflect the change
                setJoinedGroup(null); // Assuming you want to clear the current group context
                // Fetch updated groups or perform other UI updates as needed
            } else {
                toast.error("Failed to leave group.");
            }
        } catch (error) {
            console.error("Error leaving group:", error);
            toast.error("Failed to leave group.");
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
                {member.garments && member.garments.length > 0 ? (  // Ensure this matches the new structure
                    member.garments.map((garment) => (  // This should iterate over 'garments', not 'garmentDetails'
                        <div key={garment._id} className="garment-details">
                            <p>Type: {garment.garmentType}</p>
                            <p>Description: {garment.garmentDescription}</p>
                            <p>Country: {garment.garmentCountry}</p>
                            <img src={`http://localhost:8000/${garment.fileFront.replace(/\\/g, '/')}`} alt="Garment" style={{ width: '100px', height: '100px' }} />
                            {/* Add more garment details as needed */}
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
                            <strong>{msg.username || "Anonymous"}:</strong> {msg.message}
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
