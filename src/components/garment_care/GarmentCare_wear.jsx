/* eslint-disable react/prop-types */
import { useState } from 'react';
import '../../styles/main.scss';
import { toast } from 'react-hot-toast';
import ScreenHeaderIn from "../../components/common/ScreenHeaderIn";
import InfoPopup from '../../components/common/InfoPopup';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../../../context/userContext';
import { useNavigate } from "react-router-dom";
import { clickID, readURL, selectID, validate, validatePage } from '../../constants/functions/inputHandlers';
import selectImg from '../../assets/icons/select_img.png';

export default function GarmentWear() {
    const navigate = useNavigate();
    const {user} = useContext(UserContext);
    const [wearDate, setWearDate] = useState('');
    const [wearTime, setWearTime] = useState('');
    const [fileWearFront, setFileWearFront] = useState('');
    const [fileWearBack, setFileWearBack] = useState('');

    // Function to send the garment details to the backend
    const sendGarmentDetails = async () => {
        try {
        const garmentData = {
            wearDate,
            wearTime,
            fileWearFront,
            fileWearBack,
        };

        // Spread garmentData at the same level as userId
        const {data} = await axios.post('/addgarmentdetails', {...garmentData, userId: user.id});

        if (data.error) {
            toast.error(data.error);
        } else {
            toast.success(data.message);
        }
        } catch (error) {
        console.log('Error sending garment details to the backend:', error);
        }
    };

    // Call the sendGarmentDetails function when the form is submitted
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submitting");
        sendGarmentDetails();
        navigate('/garment-care');
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
            <div id={"dateWorn_error"} style={{textAlign:"center"}}></div>
            <label className='text-b'>Date worn:</label>
            <label className='tab'></label>
            <input type='date' id='dateWorn' value={wearDate} onChange={(e)=>setWearDate(e.target.value)} required/>
            </div>

            
            
            <div>
                <div className='container-prompt'>
                <p>How long was the garment worn? (in hours)</p>
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
                <div className="container-prompt" onClick={()=>selectID("fileWearFront")}>
                    <p>Front photo of the garment after wearing</p>
                </div>
                <div id={"fileWearFront_error"} style={{textAlign:"center"}}></div>
                <div className='container-input-img clickable' onClick={()=>clickID("fileWearFront")}>
                    <img className='clickable' id='fileWearFront_img' src={selectImg} alt='current photo'/>
                </div>
                <div className="container-input">
                    <input  type="file" id="fileWearFront" name="fileWearFront" 
                        onChange={(e) => {
                            setFileWearFront(e.target.files[0]);
                            if(e.target.files[0]) {
                                readURL("fileWearFront", "fileWearFront_img");
                                validate("fileWearFront");
                            }
                        }}
                        required
                    />
                </div>
            </div>

            <div>
                <div className="container-prompt" onClick={()=>selectID("fileWearBack")}>
                    <p>Back photo of the garment after wearing</p>
                </div>
                <div id={"fileWearBack_error"} style={{textAlign:"center"}}></div>
                <div className='container-input-img clickable' onClick={()=>clickID("fileWearBack")}>
                    <img className='clickable' id='fileWearBack_img' src={selectImg} alt='current photo'/>
                </div>
                <div className="container-input">
                    <input  type="file" id="fileWearBack" name="fileWearBack" 
                        onChange={(e) => {
                            setFileWearBack(e.target.files[0]);
                            if(e.target.files[0]) {
                                readURL("fileWearBack", "fileWearBack_img");
                                validate("fileWearBack");
                            }
                        }}
                        required
                    />
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