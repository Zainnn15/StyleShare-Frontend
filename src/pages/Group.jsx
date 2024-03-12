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
    const { user, setUser } = useContext(UserContext);
    const { garment, setGarment } = useContext(GarmentContext);
    const { userGroups, setUserGroups, setOpenGroups, openGroups, joinedGroup, setJoinedGroup} = useContext(GroupContext);
    const [data, setData] = useState({
        groupId: '',
    });
    const [responseData, setResponseData] = useState(null); // State to hold response data

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
    
                // Check if the group has reached its maximum capacity
                if (response.data.joinedGroup.members.length >= response.data.joinedGroup.max_members) {
                    // If the group is full, update openGroups state to remove the joined group
                    setOpenGroups(openGroups.filter(group => group._id !== response.data.joinedGroup._id));
                } else {
                    // If the group is not full, update userGroups state with the joined group
                    setUserGroups([...userGroups, response.data.joinedGroup]);
                }
    
                // Update joinedGroup state
                setJoinedGroup(response.data.joinedGroup);
    
                // Update user state with the joined user details
                setUser(response.data.user);
    
                // Update garmentDetails state with the joined garment details
                setGarment(response.data.garment);
    
                // Optionally navigate to another page after joining the group
                navigate('/dashboard'); // Change the route as needed
    
                // Set response data to be displayed in the UI
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

    // Add this function in your Group component
    const handleLeaveGroup = async () => {
        try {
            const response = await axios.post('/leaveGroup', { userId: user.id });

            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                // Handle success, e.g., show a success message, update state, etc.
                toast.success(response.data.message);

                // You may want to update the component state or navigate to another page
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <ScreenHeaderIn />
            <div className="container main">
                <form onSubmit={handleSubmit}>
                    <div className="container-small">
                        <div>
                            <label className="container-title">Join Open Group</label>
                            <hr />
                        </div>
                        <br />

                        <div>
                            <input type="hidden" id="userId" value={user.id} onChange={(e) => setData({ ...data, userId: e.target.value })} />
                            <label htmlFor="groupId">Select Open Group</label>
                            <select id="groupId" value={data.groupId || ""} onChange={(e) => setData({ ...data, groupId: e.target.value })}>
                                <option value="" disabled>
                                    Select an open group
                                </option>
                                {openGroups.map((group) => (
                                    <option key={group._id} value={group._id}>
                                        {`Open Group: ${group.group_name} - Members: ${group.members.length}/${group.max_members}`}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <br />

                        <button className="button-form" type="submit" style={{ width: '100%' }}>
                            Join Group
                        </button>
                    </div>
                </form>

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