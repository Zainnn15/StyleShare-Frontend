/* eslint-disable react/prop-types */
import { useState } from 'react';
import '../../styles/main.scss';
import { toast } from 'react-hot-toast';
import ScreenHeaderIn from "../../components/common/ScreenHeaderIn";
import { CARE_DRY_METHODS, CARE_WASH_METHODS } from '../../constants/data/options';
import InfoPopup from '../../components/common/InfoPopup';
import { addErrorMessageByID, checkOnID, validateInpName, validatePage } from '../../constants/functions/inputHandlers';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../../../context/userContext';
import { useNavigate } from "react-router-dom";

export default function GarmentWash() {
    const navigate = useNavigate();
    const {user} = useContext(UserContext);
    const [washDate, setWashDate] = useState('');
    const [washMethod, setWashMethod] = useState('');
    const [dryerMethod, setDryerMethod] = useState('');
    const [useIron, setUseIron] = useState(false);
    const [ironDuration, setIronDuration] = useState('');
    const [ironDegree, setIronDegree] = useState('');
    const [ironTemp, setIronTemp] = useState('');
    const [isVentilated, setIsVentilated] = useState(false);
    const [ventilatedTime, setVentilatedTime] = useState('');

    // Function to send the garment details to the backend
    const sendGarmentDetails = async () => {
        try {
        const garmentData = {
            washDate,
            washMethod,
            dryerMethod,
            useIron,
            ironDuration,
            ironDegree,
            ironTemp,
            isVentilated,
            ventilatedTime,
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
        sendGarmentDetails();
        navigate("/garment-care");
    };

    
    //handle submit button
    function validateAndSubmit(e) {
        let querySelect = "input[type='text'],input[type='number'],input[type='date'],select";
        if(!validatePage(querySelect)) {
            return false;
        }
        if(useIron && !validateInpName("ironDegree", ironDegree)) {
            e.preventDefault();
            return false;
        }
        if(isVentilated && !validateInpName("ventilatedTime", ventilatedTime)) {
            e.preventDefault();
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
                <label className="container-title">Garment Wash</label>
                <hr/>
            </div>
            <form onSubmit={validateAndSubmit}>
                <div className='container-content'>
                    <label className='text-b'>Wash Date:</label>
                    <label className='tab'></label>
                    <input type='date' id='washDate' value={washDate} onChange={(e)=>setWashDate(e.target.value)} required />
                </div>

                <div className='container-grid-2-md'>
                    <div>
                    <div className='container-prompt'>
                        <p>Wash Method</p>
                        <InfoPopup text='Select the method used to wash the garment' />
                    </div>
                    <div className='container-input'>
                        <select id='washMethod' 
                        name='washMethod' 
                        value={washMethod} 
                        onChange={(e)=>setWashMethod(e.target.value)}
                        required
                        >
                        <option key='wash_null' value=''>Select a wash method...</option>
                        {CARE_WASH_METHODS.map((opt) => {
                            return (
                                <option key={"wash_" + opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            )
                        })}
                        </select> 
                    </div>
                    </div>

                    <div>
                    <div className='container-prompt'>
                        <p>Dryer Method</p>
                        <InfoPopup text='Select the method used for drying the garment'/>
                    </div>
                    <div className='container-input'>
                        <select id='dryMethod' 
                        name='dryMethod' 
                        value={dryerMethod} 
                        onChange={(e)=>setDryerMethod(e.target.value)}
                        required
                        >
                        <option key='dry_null' value=''>Select a dryer method...</option>
                        {CARE_DRY_METHODS.map((opt) => {
                            return (
                                <option key={"dry_" + opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            )
                        })}
                        </select> 
                    </div>
                    </div>
                </div>
            
                <div className='container-grid-2-md'>
                    <div className='container-content'>
                    <label className='text-b clickable' htmlFor='isIroned'>Use Iron:</label>
                    <label className='tab'></label>
                    <input type='checkbox' id="isIroned" name="isIroned" value={1} checked={useIron} 
                        onChange={(e)=>setUseIron(e.target.checked)} />
                    <InfoPopup text='Check if an iron was used on the garment after washing'/>
                    </div>

                    {useIron && (
                    <div>
                        <div>
                        <div className='container-prompt'>
                            <p>Ironing duration (in minutes)</p>
                            <InfoPopup text='Enter the duration for which the garment was ironed'/>
                        </div>
                        <div className='container-input'>
                            <input
                            type='number'
                            id='ironDuration'
                            name='ironDuration'
                            value={ironDuration}
                            onChange={(e)=>setIronDuration(e.target.value)}
                            placeholder='Enter duration'
                            min={0}
                            step={1}
                            required
                            />                
                        </div>
                        </div>

                        <div>
                            <div className="container-prompt">
                                <p>Iron Heat Unit</p>
                            </div>
                            <div id={"ironDegree_error"} style={{textAlign:"center"}}></div>
                            <div className="container-radio">
                                <div className="container-radio-group">
                                    <input type="radio" id="iron_degree_c" name="ironDegree"
                                        value={"C"} 
                                        onClick={(e) => {
                                            setIronDegree(e.target.id);
                                            addErrorMessageByID("ironDegree_error", null);
                                        }}
                                        defaultChecked={checkOnID("iron_degree_c", ironDegree)}
                                    />
                                    <label htmlFor="iron_degree_c">Celsius</label>
                                </div>
                                <div className="container-radio-group">
                                    <input type="radio" id="iron_degree_f" name="ironDegree"
                                        value={"F"} 
                                        onClick={(e) => {
                                            setIronDegree(e.target.id);
                                            addErrorMessageByID("ironDegree_error", null);
                                        }}
                                        defaultChecked={checkOnID("iron_degree_f", ironDegree)}
                                    />
                                    <label htmlFor="iron_degree_f">Fahrenheit</label>
                                </div>
                            </div>

                            {
                            ironDegree !== ""  && (
                                <div>
                                <div className='container-prompt'>
                                    <p>Iron Temperature</p>
                                    <InfoPopup text='Enter the temperature in which the garment was ironed'/>
                                </div>
                                <div className='container-input'>
                                    <input
                                    type='number'
                                    id='ironTemp'
                                    name='ironTemp'
                                    value={ironTemp}
                                    onChange={(e)=>setIronTemp(e.target.value)}
                                    placeholder='Enter Temperature'
                                    min={0}
                                    step={1}
                                    required
                                    />
                                    <label>{String.fromCharCode(176)}{ironDegree === "iron_degree_c" ? "C" : "F"}</label>                
                                </div>
                                </div>
                            )
                            }
                        </div>
                    </div>
                    )}
                </div>

                <div className='container-grid-2-md'>
                    <div className='container-content'>
                    <label className='text-b clickable' htmlFor='isVentilated'>Was Ventilated:</label>
                    <label className='tab'></label>
                    <input type='checkbox' id='isVentilated' name="isVentilated" value={1} checked={isVentilated} 
                        onChange={(e)=>setIsVentilated(e.target.checked)} />
                    <InfoPopup text='Check if the garment was ventilated'/>
                    </div>

                    {isVentilated &&
                        <div>
                        <div className='container-prompt'>
                            <p>Ventilated Time (in hours)</p>
                            <InfoPopup text='Enter the duration for which the garment was ventilated'/>
                        </div>
                        <div className='container-input'>
                            <input
                            type='number'
                            id='ventilationTime'
                            name='ventilationTime'
                            value={ventilatedTime}
                            onChange={(e)=>setVentilatedTime(e.target.value)}
                            placeholder='Enter hours'
                            min={0}
                            step={0.01}
                            required
                            />                
                        </div>
                        </div>
                    }
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