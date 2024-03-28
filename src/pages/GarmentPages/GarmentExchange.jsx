import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../../context/userContext';
import { GroupContext } from '../../../context/groupContext';
import '../../styles/card.css';
import ScreenHeader from '../../components/common/ScreenHeaderIn';
import Modal from 'react-modal'; // Assuming you are using react-modal for modal dialogs
import Card from '../../components/common/Card';
import { findAttribute, getImageFromURL } from '../../constants/functions/valueHandlers';
import { GARMENT_TYPES } from '../../constants/data/options';
import notApplicable from '../../assets/icons/not_applicable.png'
import General from '../../components/profile/Garment_general'
import Measure from '../../components/profile/Garment_measure'
import Composition from '../../components/profile/Garment_composition'
import Care from '../../components/profile/Garment_care'
import Wear from '../../components/profile/Garment_wear'
import Wash from '../../components/profile/Garment_wash'
import Tear from '../../components/profile/Garment_tear'


Modal.setAppElement('#root'); // Set this to your application root element

function GarmentExchange() {
    const { user } = useContext(UserContext);
    const { userGroups } = useContext(GroupContext);
    const [exchangeRequests, setExchangeRequests] = useState([]);
    const [sentRequests, setSentRequests] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [garmentModalID, setGarmentModalID] = useState('');
    const [reservationDetails, setReservationDetails] = useState({
        pickupDate: '',
        pickupTime: '',
        pickupLocation: '',
    });
    const [selectedGarmentDetails, setSelectedGarmentDetails] = useState(null);
    const [tabPage, setTabPage] = useState(0);

    useEffect(() => {
        if (user?._id) {
            fetchExchangeRequests();
        }
    }, [user?._id]);

        //sort by date
        /*userGroups.members && 
        userGroups.members.forEach((member)=>{
            if(member.garments && member.garments.length > 0) {
                for(let garment of member.garments) {
                    //sort wearInfo by date
                    if(garment.wearInfo) {
                        garment.wearInfo.sort((obj1, obj2)=>{
                            if(obj1.wearDate < obj2.wearDate) {
                                return -1;
                            }
                            else {
                                return 1;
                            }
                        });
                    }

                    //sort washCareInstructions by date
                    if(garment.washCareInstructions) {
                        garment.washCareInstructions.sort((obj1, obj2)=>{
                            if(obj1.washDate < obj2.washDate) {
                                return -1;
                            }
                            else {
                                return 1;
                            }
                        });
                    }

                    //sort tearInfo by date
                    if(garment.tearInfo) {
                        garment.tearInfo.sort((obj1, obj2)=>{
                            if(obj1.tearDate < obj2.tearDate) {
                                return -1;
                            }
                            else {
                                return 1;
                            }
                        });
                    }
                }
            }
        });

    }, [user._id]);*/

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
        if (!user?._id) return; // Early return if user._id is not valid
    
        try {
            const response = await axios.get(`/listExchangeRequests/${user._id}`);
            const fetchedExchangeRequests = response.data.exchangeRequests;
    
            if (!Array.isArray(fetchedExchangeRequests)) {
                console.error("Fetched exchange requests is not an array.");
                return;
            }
    
            // Filter requests to include only those where the current user is either the sender or the recipient
            const relevantExchangeRequests = fetchedExchangeRequests.filter(request =>
                request.senderId === user._id || request.recipientId._id === user._id
            );
    
            setExchangeRequests(relevantExchangeRequests);
    
            const updatedSentRequests = fetchedExchangeRequests.reduce((acc, request) => {
                if (request.senderId._id === user._id) { // Checks if the current user sent the request
                    const key = `${request.recipientId._id}_${request.recipientGarmentId._id}`;
                    acc[key] = true;
                }
                return acc;
            }, {});
    
            setSentRequests(updatedSentRequests);
        } catch (error) {
            console.error('Failed to fetch exchange requests:', error);
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
                userId: user._id,
                recipientId,
                userGarmentId: userGroups?.members.find(member => member._id === user._id)?.garments[0]?._id,
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
            // Include userId in the body of the POST request
            await axios.post('/updateExchangeRequestStatus', {
                userId: user._id, // Assuming 'user' is from UserContext and contains _id
                exchangeRequestId,
                status,
            });
            fetchExchangeRequests();
        } catch (error) {
            console.error('Failed to update exchange request status:', error);
        }
    };

    function handleCardPress(garment) {
        setGarmentModalID(garment);
    }

    //console.log(userGroups.members)

    return (
        <div>
            <ScreenHeader />
            <div className='container main'>
                <div>
                    <label className="container-title">Garment Exchange</label>
                    <hr/>
                </div>
                <h3>Garments of Group Members</h3>
                <hr/>
                <div className="container-care gap m2-v">
                    {userGroups?.members?.map((member) => (

                    <div key={member._id}>
                       {member.garments && member.garments.length > 0 ? (   
                        member.garments.map((garment) => (
                <div key={garment?._id || Math.random()}>
                    <Card
                height='33em'
                imgUrl={getImageFromURL(garment?.fileFront || 'fallbackImagePath')}
                imgClassName={"container-card-img"}
                title={<p className="center text-purpleLight text-midLg">{member.username}</p>}
                titleClassName={"container-row clickable bg-purpleDark"}
                description={
                    <div>
                        <p className="card-text">Type: {findAttribute(GARMENT_TYPES, garment?.garmentType)}</p>
                        <p className="card-text">Description: {garment?.garmentDescription || 'Description not available'}</p>
                        <p className="card-text">Country: {garment?.garmentCountry || 'Country not available'}</p> 
                    </div>
                }
                DescClassName={"container-card-description"}
                footer={member._id === user._id ? <p>Your Garment</p> : 
                    <button className='button-regular'
                        onClick={() => openReservationModal(member._id, garment?._id)}
                        disabled={sentRequests[`${member._id}_${garment?._id}`]}
                    >
                        Send Exchange Request
                    </button>
                }
                isBtn={false}
                footerClassName={"center"}
                handleImgPress={() => handleCardPress(garment)}
                handleTitlePress={() => handleCardPress(garment)}
                handleDescPress={() => handleCardPress(garment)}
            />
        </div>
    ))
) : (
                            <Card
                                height='33em'
                                imgUrl={notApplicable}
                                imgClassName={"container-card-img"}
                                title={<p className="center text-purpleLight text-midLg">{member.username}</p>}
                                titleClassName={"container-row bg-purpleDark"}
                                description={<p>No garments found for this member</p>}
                                DescClassName={"container-card-description"}
                            />
                            
                        )}
                    </div>

                    ))}
                </div>

                <hr/>
                <h3>Exchange Requests</h3>
                <hr/>
                {exchangeRequests.length > 0 ? (
    <div className='container-grid-3-md gap m2-v'>
        {exchangeRequests.map((request) => (
            <div key={request._id} className="container-border clear-box">
                <p><strong>From:</strong> {request.senderId?.username || 'Unknown User'} <strong>To:</strong> {request.recipientId?.username || 'Unknown User'}</p>
                <p><strong>Your Garment:</strong> {request.userGarmentId?.garmentDescription || 'Garment not found'}</p>
                <p><strong>Exchange For:</strong> {request.recipientGarmentId?.garmentDescription || 'Garment not found'}</p>
                {request.status === 'pending' && user._id === request.recipientId?._id && (
                    <div className='container-row space-evenly'>
                        <button className="button-accept" onClick={() => handleExchangeResponse(request._id, 'accepted')}>Accept</button>
                        <button className="button-reject" onClick={() => handleExchangeResponse(request._id, 'rejected')}>Reject</button>
                    </div>
                )}
                <p><strong>Status: </strong>{request.status.charAt(0).toUpperCase() + request.status.slice(1)}</p>
                {request.pickupDate && (
                    <p><strong>Pickup Date: </strong>{request.pickupDate}</p>
                )}
                {request.pickupTime && (
                    <p><strong>Pickup Time: </strong>{request.pickupTime}</p>
                )}
                {request.pickupLocation && (
                    <p><strong>Pickup Location: </strong>{request.pickupLocation}</p>
                )}
            </div>
        ))}
    </div>
) : (
    <p className='center'>No exchange requests</p>
)}

            </div>
            

            

            
                        {/* Reservation Modal */}
                        <Modal
                            isOpen={isModalOpen}
                            onRequestClose={() => setIsModalOpen(false)}
                            contentLabel="Reservation Details"
                            style={{
                                content: {
                                    top: '20%',
                                    left: '50%',
                                    right: 'auto',
                                    bottom: 'auto',
                                    transform: 'translate(-50%, 0)',
                                    backgroundColor: "#F8E7E7",
                                    maxHeight: '65%',
                                },
                            }}
                        >
                            <h3>Enter Reservation Details</h3>
                            <form onSubmit={(e) => e.preventDefault()}>
                                <div className="form-group">
                                    <label>Date: </label>
                                    <input
                                        type="date"
                                        value={reservationDetails.pickupDate}
                                        onChange={(e) => setReservationDetails(prev => ({ ...prev, pickupDate: e.target.value }))}
                                    />
                                </div>
                                <br/>
                                <div className="form-group">
                                    <label>Time: </label>
                                    <input
                                        type="time"
                                        value={reservationDetails.pickupTime}
                                        onChange={(e) => setReservationDetails(prev => ({ ...prev, pickupTime: e.target.value }))}
                                    />
                                </div>
                                <br/>
                                <div className="form-group">
                                    <label>Location:</label>
                                    <br/>
                                    <input
                                        className='m1'
                                        type="text"
                                        value={reservationDetails.pickupLocation}
                                        placeholder="Location"
                                        onChange={(e) => setReservationDetails(prev => ({ ...prev, pickupLocation: e.target.value }))}
                                        style={{width:"80%"}}
                                    />
                                </div>
                                <br/>
                                <button className="button-regular full" onClick={handleModalSubmit}>Submit</button>
                            </form>
                        </Modal>

                        {/* Garment Details Modal */}
                        {
                            garmentModalID !== "" &&
                            <Modal
                            isOpen={garmentModalID !== ""}
                            onRequestClose={() => {
                                setGarmentModalID("");
                                setTabPage(0);
                            }}
                            contentLabel="Reservation Details"
                            style={{
                                content: {
                                    top: '20%',
                                    left: '50%',
                                    right: 'auto',
                                    bottom: 'auto',
                                    transform: 'translate(-50%, 0)',
                                    backgroundColor: "#F8E7E7",
                                    maxHeight: '65%',
                                    width: '90%'
                                },
                            }}
                        >
                            {
                                garmentModalID !== "" && (
                                <div className='container'>
                                    <hr/>
                                    <div className="container-content popup">
                                    <h3>Garment Details</h3>
                                    <hr/>
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
                                        <p className="text-purpleLight">General</p>
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
                                        <p className="text-purpleLight">Measurements</p>
                                        </div>
                                        <div id="tab2" className="container-tab-group"
                                        onClick={()=>{
                                            let e_active = document.getElementById(`tab${tabPage}`);
                                            if(e_active) {
                                            e_active.classList.toggle("active", false);
                                            }
                                            setTabPage(2);
                                            let e_div = document.getElementById(`tab2`)
                                            if(e_div) {
                                            e_div.classList.toggle("active", true);
                                            }
                                        }}
                                        >
                                        <p className="text-purpleLight">Composition</p>
                                        </div>
                                        <div id="tab3" className="container-tab-group"
                                        onClick={()=>{
                                            let e_active = document.getElementById(`tab${tabPage}`);
                                            if(e_active) {
                                            e_active.classList.toggle("active", false);
                                            }
                                            setTabPage(3);
                                            let e_div = document.getElementById(`tab3`)
                                            if(e_div) {
                                            e_div.classList.toggle("active", true);
                                            }
                                        }}
                                        >
                                        <p className="text-purpleLight">Care Instructions</p>
                                        </div>
                                        <div id="tab4" className="container-tab-group"
                                        onClick={()=>{
                                            let e_active = document.getElementById(`tab${tabPage}`);
                                            if(e_active) {
                                            e_active.classList.toggle("active", false);
                                            }
                                            setTabPage(4);
                                            let e_div = document.getElementById(`tab4`)
                                            if(e_div) {
                                            e_div.classList.toggle("active", true);
                                            }
                                        }}
                                        >
                                        <p className="text-purpleLight">Wear</p>
                                        </div>
                                        <div id="tab5" className="container-tab-group"
                                        onClick={()=>{
                                            let e_active = document.getElementById(`tab${tabPage}`);
                                            if(e_active) {
                                            e_active.classList.toggle("active", false);
                                            }
                                            setTabPage(5);
                                            let e_div = document.getElementById(`tab5`)
                                            if(e_div) {
                                            e_div.classList.toggle("active", true);
                                            }
                                        }}
                                        >
                                        <p className="text-purpleLight">Wash</p>
                                        </div>
                                        <div id="tab6" className="container-tab-group"
                                        onClick={()=>{
                                            let e_active = document.getElementById(`tab${tabPage}`);
                                            if(e_active) {
                                            e_active.classList.toggle("active", false);
                                            }
                                            setTabPage(6);
                                            let e_div = document.getElementById(`tab6`)
                                            if(e_div) {
                                            e_div.classList.toggle("active", true);
                                            }
                                        }}
                                        >
                                        <p className="text-purpleLight">Tear</p>
                                        </div>
                                    </div>

                                    {
                                        tabPage === 0 &&
                                        garmentModalID && (
                                        <General garment={garmentModalID}/>
                                        )
                                    }

                                    {
                                        tabPage === 1 &&
                                        garmentModalID &&
                                        garmentModalID.garmentSize && (
                                        <Measure garment={garmentModalID}/>
                                        )
                                    }

                                    {
                                        tabPage === 2 &&
                                        garmentModalID && (
                                        <Composition garment={garmentModalID}/>
                                        )
                                    }

                                    {
                                        tabPage === 3 &&
                                        garmentModalID && (
                                        <Care garment={garmentModalID}/>
                                        )
                                    }

                                    {
                                        tabPage === 4 &&
                                        garmentModalID &&
                                        garmentModalID.wearInfo &&
                                        garmentModalID.wearInfo.length > 0 && (
                                        <Wear garment={garmentModalID}/>
                                        )
                                    }

                                    {
                                        tabPage === 5 &&
                                        garmentModalID &&
                                        garmentModalID.washCareInstructions &&
                                        garmentModalID.washCareInstructions.length > 0 && (
                                        <Wash garment={garmentModalID}/>
                                        )
                                    }

                                    {
                                        tabPage === 6 &&
                                        garmentModalID &&
                                        garmentModalID.tearInfo &&
                                        garmentModalID.tearInfo.length > 0 && (
                                        <Tear garment={garmentModalID}/>
                                        )
                                    }

                                    </div>
                                </div>
                                )
                            }
                            
                        </Modal>
                        }
                        
                        
                    </div>
                );
            }
            
            export default GarmentExchange;
            
