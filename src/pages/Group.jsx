import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/userContext';
import { GroupContext } from '../../context/groupContext';
import { GarmentContext } from '../../context/garmentContext';
import ScreenHeaderIn from '../components/common/ScreenHeaderIn';
import '../styles/main.scss';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { findAttribute, getImageFromURL } from '../constants/functions/valueHandlers';
import { useNavigate } from 'react-router-dom';
import { GARMENT_TYPES } from '../constants/data/options';

export default function Group() {
    const navigate = useNavigate();
    const [joinCode, setJoinCode] = useState('');
    const { user } = useContext(UserContext);
    const { garment } = useContext(GarmentContext);
    const { userGroups, setJoinedGroup, joinedGroup} = useContext(GroupContext);
    const [chatInput, setChatInput] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [tabPage, setTabPage] = useState(0);

      // Fetching chat history when joinedGroup changes
      useEffect(() => {
        if (joinedGroup && joinedGroup._id) {
            fetchChatHistory(joinedGroup._id);
        } else {
            setChatHistory([]); // Clear chat history if no group is joined
        }
    }, [joinedGroup]);

    // Fetching chat history when joinedGroup changes
    useEffect(() => {
        if (tabPage == 1) {
            var ChatDivArr = document.getElementsByClassName('container-chat-history');
            if(ChatDivArr.length > 0) {
                var height = ChatDivArr[0].scrollHeight;
                ChatDivArr[0].scrollTop = height;
            }
            
        }
    }, [tabPage, chatInput]);

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

//console.log(userGroups.members);

    return (
        <div>
        <ScreenHeaderIn />
        <div className="container main">
        {!userGroups && (
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
        )}

        {userGroups && userGroups.members && (
            <div>
                <div className="container-content popup">
                <h2>{userGroups.group_name}</h2>
                <hr/>

                <div className='container-row space-between'>
                    <div className='container-content'>
                        {user && joinedGroup && (
                            <div>
                                <p>
                                    <label className="text-b">Joined User: </label>
                                    <label className='tab'></label>
                                    {user.username}
                                </p>
                            </div>
                        )}

                        {userGroups && userGroups.members && (
                            <div>
                                <p>
                                    <label className="text-b">Number of Members: </label>
                                    {`${userGroups.members.length}/${userGroups.max_members}`}
                                </p>
                            </div>
                        )}
                    </div>

                    <div>
                        <button className='button-reject' onClick={handleLeaveGroup}>Leave Group</button>
                    </div>

                </div>
                
                </div>
                <div className="container-border page-tab">
                    <div className="container-tab">
                        <div id="tab0" className="container-tab-group active" 
                        onClick={()=>{
                            let e_active = document.getElementById(`tab${tabPage}`);
                            if(e_active) {
                            e_active.classList.toggle("active", false);
                            }
                            setTabPage(0);
                            let e_div = document.getElementById(`tab0`)
                            if(e_div) {
                            e_div.classList.toggle("active", true);
                            }
                        }}
                        >
                        <p className="text-purpleLight">Members</p>
                        </div>
                        <div id="tab1" className="container-tab-group"
                        onClick={()=>{
                            let e_active = document.getElementById(`tab${tabPage}`);
                            if(e_active) {
                            e_active.classList.toggle("active", false);
                            }
                            setTabPage(1);
                            let e_div = document.getElementById(`tab1`)
                            if(e_div) {
                            e_div.classList.toggle("active", true);
                            }

                        }}
                        >
                        <p className="text-purpleLight">Chat</p> 
                        </div>
                    </div>

                {
                    tabPage === 0 && (
                        <div className='m1'>
                            <h3>Group Members and Their Garments</h3>
                            <hr/>
                            <div className='container-grid-3-md gap m2'>
                            {userGroups.members.map((member) => (
                                <div key={member._id} className="member-garments">
                                    <div className='container-border clickable' onClick={()=>{navigate("/garment-exchange")}}>
                                        <p className='center text-midLg'>
                                            <label className="text-b">{member.username}</label>
                                            {
                                                member.username === user.username &&
                                                <label> (You)</label>
                                            }
                                        </p>
                                        <div className='container-col'>
                                            <div className='container-profile-img'>
                                                <img src={getImageFromURL(member.profilePicture) || `'default-image-path.jpg'}`} alt="Garment"/>
                                            </div>
                                        </div>
                                        <br/>
                                        
                                        <div className='container-card-list' style={{maxWidth:"14em"}}>
                                            {member.garments && member.garments.length > 0 ? (
                                                member.garments.map((garment, index) => (
                                                    <div key={garment._id} className="garment-details container-border">
                                                        <p className='center'><strong>{index+1}/{member.garments.length}</strong></p>
                                                        <p><strong>Type: </strong>{findAttribute(GARMENT_TYPES, garment.garmentType)}</p>
                                                        <p><strong>Description: </strong>{garment.garmentDescription}</p>
                                                        <p><strong>Country: </strong>{garment.garmentCountry}</p>
                                                        {/* Provide a default image path if fileFront is undefined */}
                                                    </div>
                                                ))
                                            ) : (
                                                <p>No garments listed.</p>
                                            )}
                                        </div>
                                        
                                    </div>
                                </div>
                            ))}
                            </div>


                        </div>
                    )
                }

                {
                    tabPage === 1 && (
                        <div>
                            {garment && joinedGroup && (
                                <div>

                                    <div className="chat-container m1">
                                        <h3>Group Chat</h3>
                                        <hr/>
                                        <div className="container-chat-history">
                                            {chatHistory.map((msg, index) => (
                                            <div key={index} className="container-chat-message">
                                                <div className={
                                                    (msg.user.username === user.username ? 'container-chat-message-group user' : 
                                                        'container-chat-message-group')
                                                    }
                                                >
                                                    <div className="container-chat-message-header">
                                                        <span className="username text-b">{msg.user.username}</span>
                                                        <label className='tab'></label>
                                                        <small>
                                                            <span className="timestamp">{new Date(msg.createdAt).toLocaleString()}</span>
                                                        </small>
                                                    </div>
                                                    <div className="message-content">{msg.message}</div>
                                                </div>
                                                <div id='div_to_scroll'>
                                                </div>
                                            </div>
                                            ))}
                                        </div>
                                        <br/>
                                        <form onSubmit={handleSendChat}>
                                            <div className='container-chat-input'>
                                                <input
                                                className='p1'
                                                type="text"
                                                value={chatInput}
                                                onChange={(e) => setChatInput(e.target.value)}
                                                placeholder="Type a message..."
                                                />
                                                <button className='button-regular' type="submit">Send</button>
                                            </div>
                                        </form>
                                        
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                }

                </div>
            </div>
        )}
                
    </div>

  </div>
);
}
