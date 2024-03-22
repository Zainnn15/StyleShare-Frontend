/* eslint-disable react/prop-types */
import { useState } from 'react';
import '../../styles/main.scss';
import { toast } from 'react-hot-toast';
import ScreenHeaderIn from "../../components/common/ScreenHeaderIn";
import { CARE_DRYC_METHODS, CARE_DRY_METHODS, CARE_IRON_METHODS, CARE_WASH_METHODS, WASH_TEMP_C, WASH_TEMP_F } from '../../constants/data/options';
import InfoPopup from '../../components/common/InfoPopup';
import { addErrorMessageByID, validatePage } from '../../constants/functions/inputHandlers';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../../../context/userContext';
import { useNavigate } from "react-router-dom";

export default function GarmentWash() {
    const navigate = useNavigate();
    const {user} = useContext(UserContext);
    const [washDate, setWashDate] = useState('');
    const [careWash, setCareWash] = useState({
        "Method":"",
        "Heat":"",
        "Temp":""
    });
    const [careDry, setCareDry] = useState({
        "Method":"",
        "Air":"",
        "Shade":"",
        "Heat":"",
    });
    const [careDryC, setCareDryC] = useState({
        "Solvent":"",
        "Care":"",
    });
    const [careIron, setCareIron] = useState({
        "Heat":"",
    });
    const [useDryC, setUseDryC] = useState(false);
    const [useIron, setUseIron] = useState(false);
    const [ironDuration, setIronDuration] = useState('');
    const [isVentilated, setIsVentilated] = useState(false);
    const [ventilatedTime, setVentilatedTime] = useState('');

    // Function to send the garment details to the backend
    const sendGarmentDetails = async () => {
        try {
            const garmentData = {
                washDate,
                careWash: JSON.stringify(careWash),
                careDry: JSON.stringify(careDry),
                careDryC: JSON.stringify(careDryC),
                careIron: JSON.stringify(careIron),
                useIron,
                ironDuration,
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
                    <div id={"washDate_error"} style={{textAlign:"center"}}></div>
                    <label className='text-b'>Wash Date:</label>
                    <label className='tab'></label>
                    <input type='date' id='washDate' value={washDate} 
                        onChange={(e)=>{
                            setWashDate(e.target.value)
                            addErrorMessageByID("washDate_error", null);
                        }} 
                        required 
                    />
                </div>

                <div className='container-grid-2-md'>
                    <div>
                        <div className='container-prompt'>
                            <p>Wash Method</p>
                            <InfoPopup text='Select the method used to wash the garment' />
                        </div>
                        <div id={"washMethod_error"} style={{textAlign:"center"}}></div>
                        <div className='container-input'>
                            <select id='washMethod' 
                            name='washMethod' 
                            value={careWash.Method} 
                            onChange={(e)=>{
                                setCareWash({...careWash, "Method":e.target.value});
                                addErrorMessageByID("washMethod_error", null);
                            }}
                            required
                            >
                            <option key='washMethod_null' value=''>Select a wash method...</option>
                            {CARE_WASH_METHODS.Wash.map((opt) => {
                                return (
                                    <option key={"washMethod_" + opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                )
                            })}
                            </select> 
                        </div>
                    </div>

                    {
                        (careWash.Method === "" ||
                        careWash.Method === "noWash" || careWash.Method === "washHand") && (
                            <div></div>
                        )
                    }
                    {
                        careWash.Method !== "" &&
                        careWash.Method !== "noWash" && careWash.Method !== "washHand" && (
                            <div>
                                <div className='container-prompt'>
                                    <p>Wash Heat</p>
                                    <InfoPopup text='Select the heat used in washing the garment' />
                                </div>
                                <div id={"washHeat_error"} style={{textAlign:"center"}}></div>
                                <div className='container-input'>
                                    <select id='washHeat' 
                                    name='washHeat' 
                                    value={careWash.Heat} 
                                    onChange={(e)=>{
                                        setCareWash({...careWash, "Heat":e.target.value});
                                        addErrorMessageByID("washHeat_error", null);
                                    }}
                                    required
                                    >
                                    <option key='washHeat_null' value=''>Select a wash heat...</option>
                                    {CARE_WASH_METHODS.Heat.map((opt) => {
                                        return (
                                            <option key={"washHeat_" + opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        )
                                    })}
                                    </select> 
                                </div>
                                {
                                    careWash.Heat === "washHeatXXC" && (
                                        <div>
                                            <div className="container-prompt">
                                                <p>Select temperature</p>
                                                <InfoPopup text='Select the temperature in Celsius' />
                                            </div>
                                            <div id={"wash_temp_c_error"} style={{textAlign:"center"}}></div>
                                            <div className="container-input">
                                                <select 
                                                    name="washTemp" 
                                                    id="wash_temp_c"
                                                    value={careWash.Temp}
                                                    onChange={(e) => {
                                                        setCareWash({
                                                            ...careWash,
                                                            "Temp": e.target.value
                                                        });
                                                        addErrorMessageByID("wash_temp_c_error", null);
                                                    }}
                                                    required
                                                >
                                                    <option key='temp_c_null' value=''>Select a temperature...</option>
                                                    {WASH_TEMP_C.map((opt) => {
                                                        return <option key={"temp_c_" + opt.value} value={opt.value}>{opt.label}</option>
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                    )
                                }
                                {
                                    careWash.Heat === "washHeatXXF" && (
                                        <div>
                                            <div className="container-prompt">
                                                <p>Select temperature</p>
                                                <InfoPopup text='Select the temperature in Fahrenheit' />
                                            </div>
                                            <div id={"wash_temp_f_error"} style={{textAlign:"center"}}></div>
                                            <div className="container-input">
                                                <select 
                                                    name="washTemp" 
                                                    id="wash_temp_f"
                                                    value={careWash.Temp}
                                                    onChange={(e) => {
                                                        setCareWash({
                                                            ...careWash,
                                                            "Temp": e.target.value
                                                        });
                                                        addErrorMessageByID("wash_temp_f_error", null);
                                                    }}
                                                    required
                                                >
                                                    <option key='temp_f_null' value=''>Select a temperature...</option>
                                                    {WASH_TEMP_F.map((opt) => {
                                                        return <option key={"temp_f_" + opt.value} value={opt.value}>{opt.label}</option>
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        )
                    }


                    <div>
                        <div className='container-prompt'>
                            <p>Dry Method</p>
                            <InfoPopup text='Select the method used to dry the garment' />
                        </div>
                        <div id={"dryMethod_error"} style={{textAlign:"center"}}></div>
                        <div className='container-input'>
                            <select id='dryMethod' 
                            name='dryMethod' 
                            value={careDry.Method} 
                            onChange={(e)=>{
                                setCareDry({...careDry, "Method":e.target.value});
                                addErrorMessageByID("dryMethod_error", null);
                            }}
                            required
                            >
                            <option key='dry_null' value=''>Select a dry method...</option>
                            {CARE_DRY_METHODS.Tumble.map((opt) => {
                                return (
                                    <option key={"dryMethod_" + opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                )
                            })}
                            </select> 
                        </div>
                    </div>

                    {
                        careDry.Method === "noTumble" &&  (
                            <div>
                                <div className='container-prompt'>
                                    <p>Air Dry Type</p>
                                    <InfoPopup text='Select the type of air dry done on the garment' />
                                </div>
                                <div id={"dryAir_error"} style={{textAlign:"center"}}></div>
                                <div className='container-input'>
                                    <select id='dryAir' 
                                    name='dryAir' 
                                    value={careDry.Air} 
                                    onChange={(e)=>{
                                        setCareDry({...careDry, "Air":e.target.value});
                                        addErrorMessageByID("dryAir_error", null);
                                    }}
                                    required
                                    >
                                    <option key='dryAir_null' value=''>Select an air dry...</option>
                                    {CARE_DRY_METHODS.Air.map((opt) => {
                                        return (
                                            <option key={"dryAir_" + opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        )
                                    })}
                                    </select> 
                                </div>

                                {
                                    careDry.Air === "dryShade" && (
                                        <div>
                                            <div className='container-prompt'>
                                                <p>Air Dry in Shade Type</p>
                                                <InfoPopup text='Select the type of air dry in shade done on the garment' />
                                            </div>
                                            <div id={"dryShade_error"} style={{textAlign:"center"}}></div>
                                            <div className='container-input'>
                                                <select id='dryShade' 
                                                name='dryShade' 
                                                value={careDry.Shade} 
                                                onChange={(e)=>{
                                                    setCareDry({...careDry, "Shade":e.target.value});
                                                    addErrorMessageByID("dryShade_error", null);
                                                }}
                                                required
                                                >
                                                <option key='dryShade_null' value=''>Select an air dry in shade...</option>
                                                {CARE_DRY_METHODS.Shade.map((opt) => {
                                                    return (
                                                        <option key={"dryShade_" + opt.value} value={opt.value}>
                                                            {opt.label}
                                                        </option>
                                                    )
                                                })}
                                                </select> 
                                            </div>
                                        </div>
                                    )
                                }
                               
                            </div>
                        )
                    }

                    {
                        careDry.Method !== "" &&
                        careDry.Method !== "noTumble" && (
                            <div>
                                <div className='container-prompt'>
                                    <p>Tumble Dry Heat</p>
                                    <InfoPopup text='Select the heat used to dry the garment' />
                                </div>
                                <div id={"dryHeat_error"} style={{textAlign:"center"}}></div>
                                <div className='container-input'>
                                    <select id='dryHeat' 
                                    name='dryHeat' 
                                    value={careDry.Heat} 
                                    onChange={(e)=>{
                                        setCareDry({...careDry, "Heat":e.target.value});
                                        addErrorMessageByID("dryHeat_error", null);
                                    }}
                                    required
                                    >
                                    <option key='dryHeat_null' value=''>Select a heat...</option>
                                    {CARE_DRY_METHODS.Heat.map((opt) => {
                                        return (
                                            <option key={"dryHeat_" + opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        )
                                    })}
                                    </select> 
                                </div>
                            </div>
                        )
                    }

                </div>


                <div className='container-grid-2-md'>
                    <div className='container-content'>
                    <label className='text-b clickable' htmlFor='isDryC'>Use Dry Clean:</label>
                    <label className='tab'></label>
                    <input type='checkbox' id="isDryC" name="isDryC" value={1} checked={useDryC} 
                        onChange={(e)=>setUseDryC(e.target.checked)} />
                    <InfoPopup text='Check if the garment was dry cleaned'/>
                    </div>

                    {useDryC && (
                    <div>
                        <div>
                            <div className='container-prompt'>
                                <p>Dry Cleaning Method</p>
                                <InfoPopup text='Select the dry cleaning method applied to the garment' />
                            </div>
                            <div id={"dryCSolvent_error"} style={{textAlign:"center"}}></div>
                            <div className='container-input'>
                                <select id='dryCSolvent' 
                                name='dryCSolvent' 
                                value={careDryC.Solvent} 
                                onChange={(e)=>{
                                    setCareDryC({...careDryC, "Solvent":e.target.value});
                                    addErrorMessageByID("dryCSolvent_error", null);
                                }}
                                required
                                >
                                <option key='dryCSolvent_null' value=''>Select a method...</option>
                                {CARE_DRYC_METHODS.Solvent.map((opt) => {
                                    return (
                                        <option key={"dryCSolvent_" + opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    )
                                })}
                                </select> 
                            </div>
                        </div>

                        <div>
                            <div className='container-prompt'>
                                <p>Dry Cleaning Extra Care</p>
                                <InfoPopup text='Select the extra care applied during dry cleaning' />
                            </div>
                            <div id={"dryCCare_error"} style={{textAlign:"center"}}></div>
                            <div className='container-input'>
                                <select id='dryCCare' 
                                name='dryCCare' 
                                value={careDryC.Care} 
                                onChange={(e)=>{
                                    setCareDryC({...careDryC, "Care":e.target.value});
                                    addErrorMessageByID("dryCCare_error", null);
                                }}
                                required
                                >
                                <option key='dryCCare_null' value=''>Select an extra care...</option>
                                {CARE_DRYC_METHODS.Care.map((opt) => {
                                    return (
                                        <option key={"dryCCare_" + opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    )
                                })}
                                </select> 
                            </div>
                        </div>
                    </div>
                    )}
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
                        <div id={"ironDuration_error"} style={{textAlign:"center"}}></div>
                        <div className='container-input'>
                            <input
                            type='number'
                            id='ironDuration'
                            name='ironDuration'
                            value={ironDuration}
                            onChange={(e)=>{
                                setIronDuration(e.target.value);
                                addErrorMessageByID("ironDuration_error", null);
                            }}
                            placeholder='Enter duration'
                            min={0}
                            step={1}
                            required
                            />                
                        </div>
                        </div>

                        <div>
                            <div className='container-prompt'>
                                <p>Iron Heat</p>
                                <InfoPopup text='Select the iron heat used on the garment' />
                            </div>
                            <div id={"ironHeat_error"} style={{textAlign:"center"}}></div>
                            <div className='container-input'>
                                <select id='ironHeat' 
                                name='ironHeat' 
                                value={careIron.Heat} 
                                onChange={(e)=>{
                                    setCareIron({...careIron, "Heat":e.target.value});
                                    addErrorMessageByID("ironHeat_error", null);
                                }}
                                required
                                >
                                <option key='ironHeat_null' value=''>Select a heat...</option>
                                {CARE_IRON_METHODS.Heat.map((opt) => {
                                    return (
                                        <option key={"ironHeat_" + opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    )
                                })}
                                </select> 
                            </div>
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
                        <div id={"ventilationTime_error"} style={{textAlign:"center"}}></div>
                        <div className='container-input'>
                            <input
                            type='number'
                            id='ventilationTime'
                            name='ventilationTime'
                            value={ventilatedTime}
                            onChange={(e)=>{
                                setVentilatedTime(e.target.value);
                                addErrorMessageByID("ventilatedTime_error", null);
                            }}
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