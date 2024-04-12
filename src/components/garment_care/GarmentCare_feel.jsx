/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import '../../styles/main.scss';
import { toast } from 'react-hot-toast';
import ScreenHeaderIn from "../common/ScreenHeaderIn";
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../../../context/userContext';
import { useNavigate } from "react-router-dom";
import {addErrorMessageByID, scrollToID, selectID, validate, validatePage } from '../../constants/functions/inputHandlers';
import { findAttribute, formatDate } from '../../constants/functions/valueHandlers';
import { GARMENT_TYPES } from '../../constants/data/options';

export default function GarmentFeel() {
    const navigate = useNavigate();
    //const {user} = useContext(UserContext);
    const { user, loading: userLoading } = useContext(UserContext);
    const [setProfile] = useState(null);
    const [garment, setGarment] = useState(null); 
    const [garmentList, setGarmentList] = useState([]);
    const [feelDate, setFeelDate] = useState('');
    const [feelComfyExp, setFeelComfyExp] = useState('');
    const [feelHasComment, setFeelHasComment] = useState('');
    const [feelComment, setFeelComment] = useState('');
    const [feelInOccasion, setFeelInOccasion] = useState('');
    const [feelOccasion, setFeelOccasion] = useState('');
    const [feelOccasionExp, setFeelOccasionExp] = useState('');
    const [feelHasOccur, setFeelHasOccur] = useState('');
    const [feelOccur, setFeelOccur] = useState('');

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
        navigate('/garment-care');

        // const formData = new FormData();
        // formData.append('wearDate', wearDate);
        // formData.append('wearTime', wearTime);
        // formData.append('userId', user._id);
        // if (WearFront) formData.append('WearFront', WearFront);
        // if (WearBack) formData.append('WearBack', WearBack);

        // try {
        //     const { data } = await axios.post('/addgarmentdetails', formData, {
        //         headers: {
        //             'Content-Type': 'multipart/form-data',
        //         },
        //     });

        //     if (data.error) {
        //         toast.error(data.error);
        //     } else {
        //         toast.success(data.message);
        //         navigate('/garment-care');
        //     }
        // } catch (error) {
        //     console.error('Error sending garment wear details:', error);
        //     toast.error('Failed to send garment wear details.');
        // }
    };


    // Call the sendGarmentDetails function when the form is submitted
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        await sendGarmentDetails(); // Send the garment details
      };


    //handle submit button
    function validateAndSubmit(e) {
        let querySelect = "input[type='text'],input[type='date']";
        if(!validatePage(querySelect)) {
            return false;
        }

        //validate comfy exp
        if(feelComfyExp === '') {
            e.preventDefault();
            addErrorMessageByID("feelComfyExp_error", "Select an option");
            scrollToID("feelComfyExp_error");
            return false;
        }

        //validate has comment
        if(feelHasComment === '') {
            e.preventDefault();
            addErrorMessageByID("feelHasComment_error", "Select an option");
            scrollToID("feelHasComment_error");
            return false;
        }
        
        //validate special occasion
        if(feelInOccasion === '') {
            addErrorMessageByID("feelInOccasion_error", "Select an option");
            scrollToID("feelInOccasion_error");
            e.preventDefault();
            return false;
        }
        //validate special occasion exp
        if(feelInOccasion === 'Yes' && feelOccasionExp === '') {
            e.preventDefault();
            addErrorMessageByID("feelOccasionExp_error", "Select an option");
            scrollToID("feelOccasionExp_error");
            return false;
        }

        //validate occurrence
        if(feelHasOccur === '') {
            e.preventDefault();
            addErrorMessageByID("feelHasOccur_error", "Select an option");
            scrollToID("feelHasOccur_error");
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
            <label className="container-title">Garment Feel</label>
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
            <input type='date' id='dateWorn' value={feelDate} onChange={(e)=>setFeelDate(e.target.value)} required/>
            </div> 
            
            <div>
                <div className='container-prompt'>
                <p>Did you feel particularly comfortable or unpleasant while wearing the garment?</p>
                </div>
                <div id={"feelComfyExp_error"} style={{textAlign:"center"}}></div>
                <div className="container-radio">
                    <div className="container-radio-group">
                        <input type="radio" id="feelComfyExp_2" name="feelComfyExp"
                            value={"Extremely comfortable"} 
                            onClick={(e) => {
                                setFeelComfyExp(e.target.value);
                                addErrorMessageByID("feelComfyExp_error", null);
                            }}
                        />
                        <label htmlFor="feelComfyExp_2">Extremely comfortable</label>
                    </div>
                    <div className="container-radio-group">
                        <input type="radio" id="feelComfyExp_1" name="feelComfyExp"
                            value={"Comfortable"} 
                            onClick={(e) => {
                                setFeelComfyExp(e.target.value);
                                addErrorMessageByID("feelComfyExp_error", null);
                            }}
                        />
                        <label htmlFor="feelComfyExp_1">Comfortable</label>
                    </div>
                    <div className="container-radio-group">
                        <input type="radio" id="feelComfyExp_0" name="feelComfyExp"
                            value={"Nothing special"} 
                            onClick={(e) => {
                                setFeelComfyExp(e.target.value);
                                addErrorMessageByID("feelComfyExp_error", null);
                            }}
                        />
                        <label htmlFor="feelComfyExp_0">Nothing special</label>
                    </div>
                    <div className="container-radio-group">
                        <input type="radio" id="feelComfyExp_-1" name="feelComfyExp"
                            value={"Unpleasant"} 
                            onClick={(e) => {
                                setFeelComfyExp(e.target.value);
                                addErrorMessageByID("feelComfyExp_error", null);
                            }}
                        />
                        <label htmlFor="feelComfyExp_-1">Unpleasant</label>
                    </div>
                    <div className="container-radio-group">
                        <input type="radio" id="feelComfyExp_-2" name="feelComfyExp"
                            value={"Extremely unpleasant"} 
                            onClick={(e) => {
                                setFeelComfyExp(e.target.value);
                                addErrorMessageByID("feelComfyExp_error", null);
                            }}
                        />
                        <label htmlFor="feelComfyExp_-2">Extremely unpleasant</label>
                    </div>
                </div>
            </div>

            <div>
                <div className='container-prompt'>
                <p>Did you receive any comments while wearing the garment?</p>
                </div>
                <div id={"feelHasComment_error"} style={{textAlign:"center"}}></div>
                <div className="container-radio">
                    <div className="container-radio-group">
                        <input type="radio" id="feelHasComment_yesPositive" name="feelHasComment"
                            value={"Positive comments"} 
                            onClick={(e) => {
                                setFeelHasComment(e.target.value);
                                addErrorMessageByID("feelHasComment_error", null);
                            }}
                        />
                        <label htmlFor="feelHasComment_yesPositive">Yes, positive comments</label>
                    </div>
                    <div className="container-radio-group">
                        <input type="radio" id="feelHasComment_yesNegative" name="feelHasComment"
                            value={"Negative comments"} 
                            onClick={(e) => {
                                setFeelHasComment(e.target.value);
                                addErrorMessageByID("feelHasComment_error", null);
                            }}
                        />
                        <label htmlFor="feelHasComment_yesNegative">Yes, negative comments</label>
                    </div>
                    <div className="container-radio-group">
                        <input type="radio" id="feelHasComment_no" name="feelHasComment"
                            value={"No comments"} 
                            onClick={(e) => {
                                setFeelHasComment(e.target.value);
                                addErrorMessageByID("feelHasComment_error", null);
                            }}
                        />
                        <label htmlFor="feelHasComment_no">No comments</label>
                    </div>
                </div>
            </div>

            {
            feelHasComment !== "" &&
            (feelHasComment === 'Positive comments' || feelHasComment === 'Negative comments') && (
                <div>
                    <div className="container-prompt" onClick={()=>selectID("feelComment")}>
                        <p>Please share your experience (compliments or critiques)</p>
                    </div>
                    <div id={"feelComment_error"} style={{textAlign:"center"}}></div>
                    <div className="container-input">
                        <input type="text" name="feelComment" id="feelComment"
                            placeholder="Enter comment about garment" 
                            value={feelComment} 
                            onChange={(e) => {
                                setFeelComment(e.target.value);
                                validate("feelComment");
                            }}
                            required 
                        />
                    </div>
                    <br/>
                </div>
            )
            }

            <div>
                <div className='container-prompt'>
                <p>Did you wear the garment on a special occasion (e.g., a party, a family event, your first day at work or college)?</p>
                </div>
                <div id={"feelInOccasion_error"} style={{textAlign:"center"}}></div>
                <div className="container-radio">
                    <div className="container-radio-group">
                        <input type="radio" id="feelInOccasion_yes" name="feelInOccasion"
                            value={"Yes"} 
                            onClick={(e) => {
                                setFeelInOccasion(e.target.value);
                                addErrorMessageByID("feelInOccasion_error", null);
                            }}
                        />
                        <label htmlFor="feelInOccasion_yes">Yes</label>
                    </div>
                    <div className="container-radio-group">
                        <input type="radio" id="feelInOccasion_no" name="feelInOccasion"
                            value={"No"} 
                            onClick={(e) => {
                                setFeelInOccasion(e.target.value);
                                addErrorMessageByID("feelInOccasion_error", null);
                            }}
                        />
                        <label htmlFor="feelInOccasion_no">No</label>
                    </div>
                </div>
            </div>

            {
            feelInOccasion === 'Yes' && (
                <div>
                    <div>
                        <div className="container-prompt" onClick={()=>selectID("feelOccasion")}>
                            <p>Please share on what occasion you wore the garment</p>
                        </div>
                        <div id={"feelOccasion_error"} style={{textAlign:"center"}}></div>
                        <div className="container-input">
                            <input type="text" name="feelOccasion" id="feelOccasion"
                                placeholder="Enter the occasion where you wore the garment" 
                                value={feelOccasion} 
                                onChange={(e) => {
                                    setFeelOccasion(e.target.value);
                                    validate("feelOccasion");
                                }}
                                required 
                            />
                        </div>
                    </div>

                    <div>
                        <div className="container-prompt">
                            <p>How do you remember the garment you were wearing on the special occasion?</p>
                        </div>
                        <div id={"feelOccasionExp_error"} style={{textAlign:"center"}}></div>
                        <div className="container-radio">
                            <div className="container-radio-group">
                                <input type="radio" id="feelOccasionExp_2" name="feelOccasionExp"
                                    value={"Very positive"} 
                                    onClick={(e) => {
                                        setFeelOccasionExp(e.target.value);
                                        addErrorMessageByID("feelOccasionExp_error", null);
                                    }}
                                />
                                <label htmlFor="feelOccasionExp_2">Very positive</label>
                            </div>
                            <div className="container-radio-group">
                                <input type="radio" id="feelOccasionExp_1" name="feelOccasionExp"
                                    value={"Positive"} 
                                    onClick={(e) => {
                                        setFeelOccasionExp(e.target.value);
                                        addErrorMessageByID("feelOccasionExp_error", null);
                                    }}
                                />
                                <label htmlFor="feelOccasionExp_1">Positive</label>
                            </div>
                            <div className="container-radio-group">
                                <input type="radio" id="feelOccasionExp_0" name="feelOccasionExp"
                                    value={"Neutral"} 
                                    onClick={(e) => {
                                        setFeelOccasionExp(e.target.value);
                                        addErrorMessageByID("feelOccasionExp_error", null);
                                    }}
                                />
                                <label htmlFor="feelOccasionExp_0">Neutral</label>
                            </div>
                            <div className="container-radio-group">
                                <input type="radio" id="feelOccasionExp_-1" name="feelOccasionExp"
                                    value={"Negative"} 
                                    onClick={(e) => {
                                        setFeelOccasionExp(e.target.value);
                                        addErrorMessageByID("feelOccasionExp_error", null);
                                    }}
                                />
                                <label htmlFor="feelOccasionExp_-1">Negative</label>
                            </div>
                            <div className="container-radio-group">
                                <input type="radio" id="feelOccasionExp_-2" name="feelOccasionExp"
                                    value={"Very negative"} 
                                    onClick={(e) => {
                                        setFeelOccasionExp(e.target.value);
                                        addErrorMessageByID("feelOccasionExp_error", null);
                                    }}
                                />
                                <label htmlFor="feelOccasionExp_-2">Very negative</label>
                            </div>
                        </div>
                    </div>
                </div>
                
            )
            }

            <div>
                <div className='container-prompt'>
                <p>Did you have any occurrences or experiences while wearing the garment?</p>
                </div>
                <div id={"feelHasOccur_error"} style={{textAlign:"center"}}></div>
                <div className="container-radio">
                    <div className="container-radio-group">
                        <input type="radio" id="feelHasOccur_yes" name="feelHasOccur"
                            value={"Yes"} 
                            onClick={(e) => {
                                setFeelHasOccur(e.target.value);
                                addErrorMessageByID("feelHasOccur_error", null);
                            }}
                        />
                        <label htmlFor="feelHasOccur_yes">Yes</label>
                    </div>
                    <div className="container-radio-group">
                        <input type="radio" id="feelHasOccur_no" name="feelHasOccur"
                            value={"No"} 
                            onClick={(e) => {
                                setFeelHasOccur(e.target.value);
                                addErrorMessageByID("feelHasOccur_error", null);
                            }}
                        />
                        <label htmlFor="feelHasOccur_no">No</label>
                    </div>
                </div>
            </div>

            {
            feelHasOccur === 'Yes' && (
                <div>
                    <div className="container-prompt" onClick={()=>selectID("feelOccur")}>
                        <p>Please share your occurrences or experiences when you were wearing the garment</p>
                    </div>
                    <div id={"feelOccur_error"} style={{textAlign:"center"}}></div>
                    <div className="container-input">
                        <input type="text" name="feelOccur" id="feelOccur"
                            placeholder="Enter the occurrence that happened while wearing the garment" 
                            value={feelOccur} 
                            onChange={(e) => {
                                setFeelOccur(e.target.value);
                                validate("feelOccur");
                            }}
                            required 
                        />
                    </div>
                </div>
            )
            }

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