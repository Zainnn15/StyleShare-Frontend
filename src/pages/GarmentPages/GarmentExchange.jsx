import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../../context/userContext';
import { GroupContext } from '../../../context/groupContext';
import '../../styles/card.css';
import ScreenHeader from '../../components/common/ScreenHeaderIn';
import Modal from 'react-modal'; // Assuming you are using react-modal for modal dialogs

Modal.setAppElement('#root'); // Set this to your application root element

function GarmentExchange() {
    const { user } = useContext(UserContext);
    const { userGroups } = useContext(GroupContext);
    const [exchangeRequests, setExchangeRequests] = useState([]);
    const [sentRequests, setSentRequests] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reservationDetails, setReservationDetails] = useState({
        pickupDate: '',
        pickupTime: '',
        pickupLocation: '',
    });
    const [selectedGarmentDetails, setSelectedGarmentDetails] = useState(null);

    useEffect(() => {
        if (user.id) {
            fetchExchangeRequests();
        }
    }, [user.id]);

    const openReservationModal = (recipientId, recipientGarmentId) => {
        setSelectedGarmentDetails({ recipientId, recipientGarmentId });
        setIsModalOpen(true);
    };

    const handleModalSubmit = async () => {
        const { recipientId, recipientGarmentId } = selectedGarmentDetails;
        await sendExchangeRequest(recipientId, recipientGarmentId);
        setIsModalOpen(false);
    };

    const fetchExchangeRequests = async () => {
        try {
            const response = await axios.get(`/listExchangeRequests/${user.id}`);
            setExchangeRequests(response.data.exchangeRequests);
            // Update sentRequests state based on fetched exchange requests to prevent sending duplicate requests
            const updatedSentRequests = response.data.exchangeRequests.reduce((acc, request) => {
                const key = `${request.recipientId._id}_${request.recipientGarmentId._id}`;
                acc[key] = true;
                return acc;
            }, {});
            setSentRequests(updatedSentRequests);
        } catch (error) {
            console.error('Failed to fetch exchange requests:', error);
            setExchangeRequests([]);
        }
    };

    const sendExchangeRequest = async (recipientId, recipientGarmentId) => {
        const requestKey = `${recipientId}_${recipientGarmentId}`;
        if (sentRequests[requestKey]) {
            console.log('Request already sent for this garment pair.');
            return;
        }

        try {
            await axios.post('/createExchangeRequest', {
                userId: user.id,
                recipientId,
                userGarmentId: userGroups?.members.find(member => member._id === user.id)?.garments[0]?._id,
                recipientGarmentId,
                pickupDate: reservationDetails.pickupDate, // Updated to match backend expectations
                pickupTime: reservationDetails.pickupTime, // Updated to match backend expectations
                pickupLocation: reservationDetails.pickupLocation, // Updated to match backend expectations
            });
            setSentRequests(prev => ({ ...prev, [requestKey]: true }));
            fetchExchangeRequests();
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
            fetchExchangeRequests();
        } catch (error) {
            console.error('Failed to update exchange request status:', error);
        }
    };

    return (
        <div>
            <ScreenHeader />
            <h2>Group Members and Their Garments</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
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
                                            {member._id !== user.id && (
                                                <button 
                                                    onClick={() => openReservationModal(member._id, garment._id)}
                                                    disabled={sentRequests[`${member._id}_${garment._id}`]}
                                                >
                                                    Send Exchange Request
                                                </button>
                                            )}
                                            {member._id === user.id && <p>Your Garment</p>}
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
                {request.pickupDate && (
                    <p>Pickup Date: {request.pickupDate}</p>
                )}
                {request.pickupTime && (
                    <p>Pickup Time: {request.pickupTime}</p>
                )}
                {request.pickupLocation && (
                    <p>Pickup Location: {request.pickupLocation}</p>
                )}
            </div>
        ))}
    </div>
) : (
    <p>No exchange requests.</p>
)}

            
                        {/* Reservation Modal */}
                        <Modal
                            isOpen={isModalOpen}
                            onRequestClose={() => setIsModalOpen(false)}
                            contentLabel="Reservation Details"
                            style={{
                                content: {
                                    top: '50%',
                                    left: '50%',
                                    right: 'auto',
                                    bottom: 'auto',
                                    marginRight: '-50%',
                                    transform: 'translate(-50%, -50%)',
                                },
                            }}
                        >
                            <h2>Enter Reservation Details</h2>
                            <form onSubmit={(e) => e.preventDefault()}>
                                <div className="form-group">
                                    <label>Date:</label>
                                    <input
                                        type="date"
                                        value={reservationDetails.pickupDate}
                                        onChange={(e) => setReservationDetails(prev => ({ ...prev, pickupDate: e.target.value }))}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Time:</label>
                                    <input
                                        type="time"
                                        value={reservationDetails.pickupTime}
                                        onChange={(e) => setReservationDetails(prev => ({ ...prev, pickupTime: e.target.value }))}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Location:</label>
                                    <input
                                        type="text"
                                        value={reservationDetails.pickupLocation}
                                        placeholder="Location"
                                        onChange={(e) => setReservationDetails(prev => ({ ...prev, pickupLocation: e.target.value }))}
                                    />
                                </div>
                                <button onClick={handleModalSubmit} className="button">Submit</button>
                            </form>
                        </Modal>
                    </div>
                );
            }
            
            export default GarmentExchange;
            
