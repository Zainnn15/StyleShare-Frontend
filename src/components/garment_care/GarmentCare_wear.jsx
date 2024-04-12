/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import '../../styles/main.scss';
import { toast } from 'react-hot-toast';
import ScreenHeaderIn from "../../components/common/ScreenHeaderIn";
import InfoPopup from '../../components/common/InfoPopup';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../../../context/userContext';
import { useNavigate } from "react-router-dom";
import {clickID, validatePage } from '../../constants/functions/inputHandlers';
import selectImg from '../../assets/icons/select_img.png';
import { findAttribute, formatDate } from '../../constants/functions/valueHandlers';
import { GARMENT_TYPES } from '../../constants/data/options';

export default function GarmentWear() {
    const navigate = useNavigate();
    //const {user} = useContext(UserContext);
    const { user, loading: userLoading } = useContext(UserContext);
    const [setProfile] = useState(null);
    const [garment, setGarment] = useState(null); 
    const [garmentList, setGarmentList] = useState([]);
    const [wearDate, setWearDate] = useState('');
    const [wearTime, setWearTime] = useState('');
    const [WearFront, setWearFront] = useState('');
    const [WearBack, setWearBack] = useState('');

     //get user and garment data
     useEffect(() => {
        if (!userLoading && user && user._id) {
          // Fetch user profile
          axios.get('/profile', { withCredentials: true })
          .then((response) => {
            const data = response.data;
            setProfile(data); // Assuming this sets user-specific profile details
          })
          .catch((error) => console.error('Error fetching user profile:', error));
      
          // Fetch garment details based on the user ID
          axios.get(`/getGarmentDetails/${user._id}`, { withCredentials: true })
        .then((response) => {
          const garmentData = response.data;
          //console.log('Garment Details:', garmentData);
          //setGarmentDetails(garmentData); // Assuming this sets specific garment details
          if(Array.isArray(garmentData) && garmentData.length > 0) {
            setGarmentList(garmentData);
            setGarment(garmentData[0]);
            return garmentData[0];
          }
          else {
            setGarmentList([...garmentData]); // Assuming this sets specific garment details
            setGarment(garmentData);
            return garmentData;
          }
          // No need to sort here as we'll handle sorting directly where the data is rendered to ensure reactivity
          
        })
        .catch((error) => console.error('Error fetching garment details:', error));
  
        }
  
      }, [user, userLoading]);
      //if (userLoading || garmentLoading) {
      if (userLoading) {
        return <div>Loading...</div>; // Show loading state while data is being fetched
      }
      //if (!user || !garment) {
      if (!user) {
        return <div>No user or garment data available.</div>; // Show a message or redirect if data is not available
      }

    // Function to send the garment details to the backend
    const sendGarmentDetails = async () => {
        const formData = new FormData();
        formData.append('wearDate', wearDate);
        formData.append('wearTime', wearTime);
        formData.append('userId', user._id);
        if (WearFront) formData.append('WearFront', WearFront);
        if (WearBack) formData.append('WearBack', WearBack);

        try {
            const { data } = await axios.post('/addgarmentdetails', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success(data.message);
                navigate('/garment-care');
            }
        } catch (error) {
            console.error('Error sending garment wear details:', error);
            toast.error('Failed to send garment wear details.');
        }
    };


    // Call the sendGarmentDetails function when the form is submitted
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        await sendGarmentDetails(); // Send the garment details
      };


    //handle submit button
    function validateAndSubmit(e) {
        let querySelect = "input";
        if(!validatePage(querySelect)) {
            return false;
        }
        handleSubmit(e);
        return true;
    }

    return (
    <div>
        <ScreenHeaderIn />
        <div className='container main'>
        <div>
            <label className="container-title">Garment Wear</label>
            <hr/>
        </div>
        <form onSubmit={validateAndSubmit}>
            <div className='container-content'>

            <div>
                <p className="container-subtitle-2">Selected Garment</p>
                <select
                    onChange={(e)=>{
                    if(e.target.value < garmentList.length) {
                        let data = garmentList[e.target.value];
                        setGarment(data);
                    }
                    }}
                >
                    {
                    garmentList && garmentList.length > 0 &&
                    garmentList.map((garmentOpt, index) => {
                        return (
                        <option key={"garmentOpt_"+index} value={index}>
                            {findAttribute(GARMENT_TYPES, garmentOpt.garmentType)} ({formatDate(garmentOpt.purchaseDate)})
                        </option>
                        )
                    }) 
                    }
                </select>
            </div>
            <br/>

            <div id={"dateWorn_error"} style={{textAlign:"center"}}></div>
            <label className='text-b'>Date worn:</label>
            <label className='tab'></label>
            <input type='date' id='dateWorn' value={wearDate} onChange={(e)=>setWearDate(e.target.value)} required/>
            </div>

            
            
            <div>
                <div className='container-prompt'>
                <p>How long was the garment worn?</p>
                <InfoPopup text='How many hours was the garment worn? If not known, use your best estimate'/>
                </div>
                <div id={"hoursWorn_error"} style={{textAlign:"center"}}></div>
                <div className='container-input'>
                <input
                    type='number'
                    id='hoursWorn'
                    name='hoursWorn'
                    value={wearTime}
                    onChange={(e)=>setWearTime(e.target.value)}
                    placeholder='Enter number of hours worn'
                    min={0}
                    step={0.01}
                    required
                />
                </div>
            </div>
            <br/>

            <div className="container-grid-2-md gap">
                <div>
                    <div className='container-prompt'>
                        <p>Front photo of the garment after wearing</p>
                    </div>
                    <div className='container-input-img clickable' onClick={()=>clickID("fileWearFront")}>
                        <img id='fileWearFront_img' src={WearFront ? URL.createObjectURL(WearFront) : selectImg} alt='Front Wear' />
                    </div>
                    <div className="container-input">
                        <input id="fileWearFront" type="file" onChange={(e) => setWearFront(e.target.files[0])} required />
                    </div>
                </div>

                <div>
                    <div className='container-prompt'>
                        <p>Back photo of the garment after wearing</p>
                    </div>
                    <div className='container-input-img clickable' onClick={()=>clickID("fileWearBack")}>
                        <img id='fileWearBack_img' src={WearBack ? URL.createObjectURL(WearBack) : selectImg} alt='Back Wear' />
                    </div>
                    <div className="container-input">
                        <input id="fileWearBack" type="file" onChange={(e) => setWearBack(e.target.files[0])} required />
                    </div>
                </div>
            </div>

            <br/>
            <div className='container-input'>
                <button className="button-form full" type="submit" onClick={validateAndSubmit}>
                    Save
                </button>
            </div>
        </form>
        </div>      
    </div>
    );
}