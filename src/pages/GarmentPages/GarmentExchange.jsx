import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../../context/userContext';
import { GroupContext } from '../../../context/groupContext';
import '../../styles/card.css';
import ScreenHeader from '../../components/common/ScreenHeaderIn';

function GarmentExchange() {
    const { user } = useContext(UserContext);
    const { userGroups} = useContext(GroupContext);
    const [exchangeRequests, setExchangeRequests] = useState([]);
    const [sentRequests, setSentRequests] = useState({});

    useEffect(() => {
        if (user.id) {
            fetchExchangeRequests();
        }
    }, [user.id]);

    const fetchExchangeRequests = async () => {
        try {
            const response = await axios.get(`/listExchangeRequests/${user.id}`);
            // Ensure we always set an array, even if the response is empty or undefined
            setExchangeRequests(response.data.exchangeRequests);
        } catch (error) {
            console.error('Failed to fetch exchange requests:', error);
            setExchangeRequests([]); // Ensure state is reset even in case of error
        }
    };

    const sendExchangeRequest = async (recipientId, recipientGarmentId) => {
        // Check if request has already been sent
        const requestKey = `${recipientId}_${recipientGarmentId}`;
        if (sentRequests[requestKey]) {
            console.log('Request already sent for this garment pair.');
            return;
        }
    
        const userGarmentId = userGroups?.members.find(member => member._id === user.id)?.garments[0]?._id;
        if (!userGarmentId) {
            console.error('No garment found for exchange');
            return;
        }
    
        try {
            await axios.post('/createExchangeRequest', {
                userId: user.id,
                recipientId,
                userGarmentId,
                recipientGarmentId,
            });
            // Update sent requests state
            setSentRequests(prev => ({ ...prev, [requestKey]: true }));
            fetchExchangeRequests(); // Refresh the list of exchange requests
        } catch (error) {
            console.error('Failed to send exchange request:', error);
        }
    };

    const handleExchangeResponse = async (exchangeRequestId, status) => {
        try {
            await axios.post('/updateExchangeRequestStatus', {
                exchangeRequestId,
                status,
            });
            fetchExchangeRequests(); // Refresh the list after updating status
        } catch (error) {
            console.error('Failed to update exchange request status:', error);
        }
    };

    return (
        <div>
            <ScreenHeader />
            <h2>Group Members and Their Garments</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}> {/* Adjust layout here */}
            {userGroups?.members?.map((member) => (
    <div key={member._id} className="card">
        {member.garments && member.garments.length > 0 ? (
            <>
                <img src={`http://localhost:8000/${member.garments[0].fileFront.replace(/\\/g, '/')}`} alt="Garment" />
                <div className="card-container">
                    <h4 className="card-title">{member.username}</h4>
                    {member.garments.map((garment) => (
                        <div key={garment._id}>
                            <p className="card-text">Type: {garment.garmentType}</p>
                            <p className="card-text">Description: {garment.garmentDescription}</p>
                            <p className="card-text">Country: {garment.garmentCountry}</p>
                            {member._id !== user.id ? (
                            <button 
                            onClick={() => sendExchangeRequest(member._id, garment._id)}
                            disabled={sentRequests[`${member._id}_${garment._id}`]}
                            >
                            Send Exchange Request
                        </button>
                        ) : (
                        <p>Your Garment</p>
                        )}
                        </div>
                    ))}
                </div>
            </>
        ) : (
            <p>No garments found for this member.</p>
        )}
    </div>
))}
            </div>

         
            {/* Exchange Requests Section */}
            <h2>Exchange Requests</h2>
            {exchangeRequests.length > 0 ? (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {exchangeRequests.map((request) => (
            <div key={request._id} className="exchange-request-card">
                <p><strong>From:</strong> {request.senderId.username} <strong>To:</strong> {request.recipientId.username}</p>
                <p><strong>Your Garment:</strong> {request.userGarmentId.garmentDescription}</p>
                <p><strong>Exchange For:</strong> {request.recipientGarmentId.garmentDescription}</p>
                {request.status === 'pending' && user.id === request.recipientId._id && (
                    <>
                        <button onClick={() => handleExchangeResponse(request._id, 'accepted')}>Accept</button>
                        <button onClick={() => handleExchangeResponse(request._id, 'rejected')}>Reject</button>
                    </>
                )}
                <p>Status: {request.status.charAt(0).toUpperCase() + request.status.slice(1)}</p>
            </div>
        ))}
    </div>
) : (
    <p>No exchange requests.</p>
)}
    </div>
);
}


export default GarmentExchange;