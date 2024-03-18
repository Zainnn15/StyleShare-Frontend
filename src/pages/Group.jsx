import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/userContext';
import { GroupContext } from '../../context/groupContext';
import { GarmentContext } from '../../context/garmentContext';
import ScreenHeaderIn from '../components/common/ScreenHeaderIn';
import '../styles/main.scss';
import { changeTitle } from '../constants/functions/inputHandlers';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Group() {
    const navigate = useNavigate();
    const [joinCode, setJoinCode] = useState('');
    const { user, setUser } = useContext(UserContext);
    const { garment, setGarment } = useContext(GarmentContext);
    const { userGroups, setUserGroups, setOpenGroups, openGroups, joinedGroup, setJoinedGroup} = useContext(GroupContext);
    const [data, setData] = useState({
        groupId: '',
    });
    const [responseData, setResponseData] = useState(null); // State to hold response data

    const handleJoinByCode = async (event) => {
        event.preventDefault();
        try {
          const response = await axios.post('/joinGroupByCode', {
            userId: user.id,
            joinCode: joinCode,
          });
          // Handle response: update state, show messages, etc.
          toast.success(response.data.message);
          // ... (other success handling)
        } catch (error) {
          // Handle error: show error message, etc.
          toast.error(error.response.data.error);
        }
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('/joinGroup', { userId: user.id, groupId: data.groupId });
            console.log('Join Group Response:', response.data); // Log the entire response for debugging
    
            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                setData({}); // Reset the form
                toast.success(response.data.message);
    
                console.log('Joined Group Data:', response.data.joinedGroup);
    
                if (response.data.joinedGroup.members.length >= response.data.joinedGroup.max_members) {
                    setOpenGroups(openGroups.filter(group => group._id !== response.data.joinedGroup._id));
                } else {
                    setUserGroups([...userGroups, response.data.joinedGroup]);
                }
    
                setJoinedGroup(response.data.joinedGroup);
                setUser(response.data.user);
                setGarment(response.data.garment);
    
                navigate('/dashboard');
                setResponseData(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchGroups = async () => {
          try {
            const response = await axios.get(`/getGroups/${user.id}`);
            console.log('User Groups:', response.data.userGroups); // Log user groups data
            setUserGroups(response.data.userGroups);
          } catch (error) {
            console.error('Error fetching groups:', error);
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
        fetchGroups();
        fetchOpenGroups();
      }, [user.id, setUserGroups, setOpenGroups]);

    useEffect(() => {
        console.log('Joined Group:', joinedGroup);
    }, [joinedGroup]);

    changeTitle('Group');

    const handleLeaveGroup = async () => {
        try {
            const response = await axios.post('/leaveGroup', { userId: user.id });

            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                toast.success(response.data.message);
            }
        } catch (error) {
            console.error(error);
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
        </div>
    );
}
