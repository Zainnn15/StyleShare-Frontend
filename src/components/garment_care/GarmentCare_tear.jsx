/* eslint-disable react/prop-types */
import { useState } from 'react';
import '../../styles/main.scss';
import { toast } from 'react-hot-toast';
import ScreenHeaderIn from "../../components/common/ScreenHeaderIn";
import { wearTears, repairRequests} from '../../constants/data/lists';
import InfoPopup from '../../components/common/InfoPopup';
import { addErrorMessageByID, checkOnID, clickID } from '../../constants/functions/inputHandlers';
import { GARMENT_TYPES } from '../../constants/data/options';
import { measurementTypes } from '../../constants/data/lists';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../../../context/userContext';
import { GarmentContext } from '../../../context/garmentContext';
import { useNavigate } from 'react-router-dom';
import PopupImg from '../common/PopupImg';
import CircleBtn from '../common/CircleBtn';
import info from '../../assets/icons/info.png';
import selectImg from '../../assets/icons/select_img.png';
import img_twisting from '../../assets/images/twisting.png';
import img_shrinking from '../../assets/images/spandex_shrink.png';
import img_pilling from '../../assets/images/pilling.png';


export default function GarmentTear() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { garment } = useContext(GarmentContext);
    const [tearDate, setTearDate] = useState('');
    const [wantRepair, setWantRepair] = useState(false);
    const measureTypes = garment ? getSetByCategory(getCategory(garment?.garmentType)) : [];
    const [measures] = useState([...measureTypes]);
    const [twistingImg, setTwistingImg] = useState(null);
    const [spandexShrinkImg, setSpandexShrinkImg] = useState(null);
    const [printFadeImg, setPrintFadeImg] = useState(null);
    const [holeImg, setHoleImg] = useState(null);
    const [stainImg, setStainImg] = useState(null);
    const [wearTear, setWearTear] = useState({
      'colorFade': 0,
      'pilling': 0,
      'shapeLoss': 0,
      'twisting': 0,
      'washShrink': 0,
      'washDiscolor': 0,
      'spandexShrink': 0,
      'printFade': 0,
      'hole': 0,
      'labelItching': 0,
      'looseButton':0,
      'stain': 0,
      'other': 0,
    });
    const [tearExtra, setTearExtra] = useState({
      
    });
    const [repairRequest, setRepairRequest] = useState({
      "looseButton": "",
      "brokenZipper": "",
      "lostString": "",
      "looseHem": "",
      "other": "",
    });
    const [repairOther, setRepairOther] = useState('');
  
    const sendGarmentDetails = async () => {
        const formData = new FormData();
        formData.append('tearDate', tearDate);
        formData.append('wantRepair', wantRepair);
        formData.append('wearTear', JSON.stringify(wearTear));
        formData.append('tearExtra', JSON.stringify(tearExtra));
        formData.append('repairRequest', JSON.stringify(repairRequest));
        formData.append('repairOther', repairOther);
    if (twistingImg) formData.append('twistingImg', twistingImg);
    if (spandexShrinkImg) formData.append('spandexShrinkImg', spandexShrinkImg);
    if (printFadeImg) formData.append('printFadeImg', printFadeImg);
    if (holeImg) formData.append('holeImg', holeImg);
    if (stainImg) formData.append('stainImg', stainImg);
    
        // Append images and other file inputs dynamically
        Object.entries(tearExtra).forEach(([key, value]) => {
          if (value instanceof File) {
            formData.append(key, value);
          }
        });
    
        formData.append('userId', user.id);
    
        try {
          const { data } = await axios.post('/addgarmentdetails', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
    
          if (data.error) {
            toast.error(data.error);
          } else {
            toast.success('Garment details updated successfully');
            navigate("/garment-care"); // Adjust as needed
          }
        } catch (error) {
          console.error('Error sending garment details:', error);
          toast.error('An error occurred while updating garment details.');
        }
    };
    
    function getCategory(val) {
        const category = GARMENT_TYPES.find(option => option.value === val)?.cat;
        console.log(`Category found: ${category}`);
        return category;
    }
    
    function getSetByCategory(catID) {
        const objArr = measurementTypes.filter(obj => obj.categories.includes(catID));
        console.log(`objArr returned: `, objArr);
        return objArr;
    }

    const validatePage = (selector) => {
        // Assuming this function is supposed to select elements and validate them
        const elements = document.querySelectorAll(selector);
        let isValid = true;
        elements.forEach(el => {
            // Example validation check for an input
            if(el.type === 'text' && !el.value.trim()) {
                console.error(`Validation failed for ${el.name}: Field is empty.`);
                isValid = false;
            }
            // Add other validation checks as needed
        });
        return isValid;
    };
    
    // New validateAndSubmit function similar to GarmentWear
    function validateAndSubmit(e) {
        e.preventDefault(); // Prevent the default form submission behavior
    
        // Perform your validation check here
        if (!validatePage("input[type='text'],input[type='number'],input[type='date'],select")) {
            console.error('Validation failed. Please check your input.');
            toast.error('Validation failed. Please check your input.');
            // Log detailed information here
            console.log('Inspecting inputs for failure reasons:');
            // Potentially call a more detailed validation check here that logs specific failures
            return; // Stop execution if validation fails
        }
    
        console.log('Validation passed, proceeding with sending garment details.');
        sendGarmentDetails();
    }
    

  return (
    <div>
        <ScreenHeaderIn />
        <div className='container main'>
        <div>
            <label className="container-title">Garment Tear</label>
            <hr/>
        </div>
        <form onSubmit={validateAndSubmit}>
            <div className='container-content'>
                <label className='text-b'>Date of Tear:</label>
                <label className='tab'></label>
                <input type='date' value={tearDate} onChange={(e)=>setTearDate(e.target.value)} required/>
            </div>

            <div>
                <div className="container-prompt">
                    <p>What are the wear and tear issues? (Check all that apply)</p>
                </div>
                <div id={"wearTear_error"} style={{textAlign:"center"}}></div>
                <div className="container-radio">
                {//wear and tears
                    /*colorFade*/
                    <div className='container-grid-2-md' style={{width:'100%'}}>
                    <div className="container-radio-group m2-h">
                        <input type="checkbox" id={"tear_"+wearTears[0].value} name="wearTear[]"
                            value={wearTears[0].value} 
                            onClick={(e) => {
                                setWearTear({
                                ...wearTear,
                                [wearTears[0].value]: Number(e.target.checked)
                                });
                                addErrorMessageByID("wearTear_error", null);
                            }}
                        />
                        <label htmlFor={"tear_"+wearTears[0].value}>{wearTears[0].label}</label>
                    </div>
                    {wearTear.colorFade === 0 && <div></div>}
                    {
                        wearTear.colorFade === 1 && (
                        <div>
                            <div className='container-prompt'>
                            <p>How much percent of the color has been lost?</p>
                            </div>
                            <div className='container-input'>
                            <input
                                type='number'
                                name='colorLost'
                                value={tearExtra["colorLost"]}
                                onChange={(e)=>{
                                setTearExtra({
                                    ...tearExtra,
                                    "colorLost": e.target.value
                                });
                                }}
                                placeholder='Enter percent'
                                min={1}
                                max={100}
                                step={1}
                                required
                            />                
                            <label>%</label>
                            </div>
                        </div>
                        ) 
                    }
                    
                    {/*pilling*/}
                    <div className="container-radio-group m2-h">
                        <input type="checkbox" id={"tear_"+wearTears[1].value} name="wearTear[]"
                            value={wearTears[1].value} 
                            onClick={(e) => {
                                setWearTear({
                                ...wearTear,
                                [wearTears[1].value]: Number(e.target.checked)
                                });
                                addErrorMessageByID("wearTear_error", null);
                            }}
                        />
                        <label htmlFor={"tear_"+wearTears[1].value}>{wearTears[1].label}</label>
                        <CircleBtn
                            iconUrl={info}
                            className="button-info"
                            width="1em"
                            handlePress={() => {
                                let e = document.getElementById("info_pilling");
                                if (e) {
                                    e.classList.toggle("hide", false);
                                }
                            }}
                        />
                        <PopupImg
                            id="info_pilling"
                            className="container-popup"
                            iconUrl={img_pilling}
                            height="75%"
                            width="75%"
                        />
                    </div>
                    {wearTear.pilling === 0 && <div></div>}
                    {
                        wearTear.pilling === 1 && (
                        <div>
                            <div className='container-prompt'>
                            <p>Where is the area of pilling?</p>
                            </div>
                            <div className='container-input'>
                            <input
                                type='text'
                                name='pillingArea'
                                value={tearExtra["pillingArea"]}
                                onChange={(e)=>{
                                setTearExtra({
                                    ...tearExtra,
                                    "pillingArea": e.target.value
                                });
                                }}
                                placeholder='i.e. arms, sides under the arm, front, etc...'
                                required
                            />                
                            </div>
                            <div className='container-prompt'>
                            <p>Strength of pilling</p>
                            </div>
                            <div className="container-input">
                            <select 
                                name="pillingStrength" 
                                id="pillingStrength"
                                value={tearExtra["pillingStrength"]}
                                onChange={(e) => {
                                    setTearExtra({
                                    ...tearExtra,
                                    "pillingStrength": e.target.value
                                    });
                                }}
                                required
                            >
                                <option value=''>Select a strength...</option>
                                <option value='hardlyVisible'>Hardly Visible</option>
                                <option value='visible'>Visible</option>
                                <option value='stronglyVisible'>Strongly Visible</option>
                            </select>
                            </div>
                        </div>
                        ) 
                    }

                    {/*shapeLoss*/}
                    <div className="container-radio-group m2-h">
                        <input type="checkbox" id={"tear_"+wearTears[2].value} name="wearTear[]"
                            value={wearTears[2].value} 
                            onClick={(e) => {
                                setWearTear({
                                ...wearTear,
                                [wearTears[2].value]: Number(e.target.checked)
                                });
                                addErrorMessageByID("wearTear_error", null);
                            }}
                        />
                        <label htmlFor={"tear_"+wearTears[2].value}>{wearTears[2].label}</label>
                    </div>
                    {wearTear.shapeLoss === 0 && <div></div>}
                    {
                        wearTear.shapeLoss === 1 && (
                        <div>
                            <div className='container-prompt'>
                            <p>Which part of the garment lost its shape?</p>
                            </div>
                            <div className='container-input'>
                            <input
                                type='text'
                                name='shapeLossArea'
                                value={tearExtra["shapeLossArea"]}
                                onChange={(e)=>{
                                setTearExtra({
                                    ...tearExtra,
                                    "shapeLossArea": e.target.value
                                });
                                }}
                                placeholder='Describe where it lost shape'
                                required
                            />                
                            </div>
                            <div className='container-prompt'>
                            <p>How did it lose its shape?</p>
                            </div>
                            <div className='container-input'>
                            <input
                                type='text'
                                name='shapeLossHow'
                                value={tearExtra["shapeLossHow"]}
                                onChange={(e)=>{
                                setTearExtra({
                                    ...tearExtra,
                                    "shapeLossHow": e.target.value
                                });
                                }}
                                placeholder='Describe how the shape is different'
                                required
                            />                
                            </div>
                        </div>
                    )}

                    {/*twisting*/}
                    <div className="container-radio-group m2-h">
                        <input type="checkbox" id={"tear_"+wearTears[3].value} name="wearTear[]"
                            value={wearTears[3].value} 
                            onClick={(e) => {
                                setWearTear({
                                ...wearTear,
                                [wearTears[3].value]: Number(e.target.checked)
                                });
                                addErrorMessageByID("wearTear_error", null);
                            }}
                        />
                        <label htmlFor={"tear_"+wearTears[3].value}>{wearTears[3].label}</label>
                        <CircleBtn
                            iconUrl={info}
                            className="button-info"
                            width="1em"
                            handlePress={() => {
                                let e = document.getElementById("info_twisting");
                                if (e) {
                                    e.classList.toggle("hide", false);
                                }
                            }}
                        />
                        <PopupImg
                            id="info_twisting"
                            className="container-popup"
                            iconUrl={img_twisting}
                            height="75%"
                            width="75%"
                        />
                    </div>
                    {wearTear.twisting === 0 && <div></div>}
                    {
                        wearTear.twisting === 1 && (
                        <div>
                            <div className='container-prompt'>
                            <p>Which part of the garment twisted?</p>
                            </div>
                            <div className='container-input'>
                            <input
                                type='text'
                                name='twistingArea'
                                value={tearExtra["twistingArea"]}
                                onChange={(e)=>{
                                setTearExtra({
                                    ...tearExtra,
                                    "twistingArea": e.target.value
                                });
                                }}
                                placeholder='Describe where it twisted'
                                required
                            />                
                            </div>
                            <div className='container-prompt'>
                            <p>How much has it twisted? (in cm)</p>
                            </div>
                            <div className='container-input'>
                            <input
                                type='number'
                                name='twistingSize'
                                value={tearExtra["twistingSize"]}
                                onChange={(e)=>{
                                setTearExtra({
                                    ...tearExtra,
                                    "twistingSize": e.target.value
                                });
                                }}
                                placeholder='Twisting size'
                                min={0.01}
                                step={0.01}
                                required
                            />                
                            </div>
                            <div className='container-prompt'>
                                <p>Upload photo of twisting area</p>
                            </div>
                            <div className='container-input-img clickable' onClick={()=>clickID("twistingImg")}>
                                <img className='clickable' id='twistingImg' src={selectImg} alt='upload photo'/>
                            </div>
                            <div className="container-input">
                             <input id="twistingImg" type="file" onChange={(e) => setTwistingImg(e.target.files[0])} required />
                            </div>
                        </div>
                    )}

                    {/*washShrink*/}
                    <div className="container-radio-group m2-h">
                        <input type="checkbox" id={"tear_"+wearTears[4].value} name="wearTear[]"
                            value={wearTears[4].value} 
                            onClick={(e) => {
                                setWearTear({
                                ...wearTear,
                                [wearTears[4].value]: Number(e.target.checked)
                                });
                                addErrorMessageByID("wearTear_error", null);
                            }}
                        />
                        <label htmlFor={"tear_"+wearTears[4].value}>{wearTears[4].label}</label>
                    </div>
                    {wearTear.washShrink === 0 && <div></div>}
                    {
                        wearTear.washShrink === 1 && (
                            <div className="container-grid-2-md">
                                {measures.map((measureType, index) => {
                                    return (
                                        <div key={"measureSet_" + measureType.value + "_" + index}>
                                            <PopupImg
                                                id={"info_temp_"+index}
                                                className="container-popup"
                                                iconUrl={measureType.img}
                                                height="75%"
                                                width="75%"
                                                description={measureType.description}
                                            />
                                            <div className="container-prompt">
                                                <p>{measureType.label}</p>
                                                <CircleBtn
                                                    iconUrl={info}
                                                    className="button-info"
                                                    width="1em"
                                                    handlePress={() => {
                                                        let e = document.getElementById("info_temp_"+index);
                                                        if (e) {
                                                            e.classList.toggle("hide", false);
                                                        }
                                                    }}
                                                />
                                            </div>
                                            <div className="container-measure-group">
                                                <input
                                                    id={"measure_" + measureType.value + "_" + index}
                                                    name={"measure_" + measureType.value}
                                                    type='number'
                                                    min={0}
                                                    step={0.01}
                                                    required
                                                />
                                                <select
                                                    id={"unit_" + measureType.value + "_" + index}
                                                    name={"unit_" + measureType.value}
                                                >
                                                    <option value='cm'> cm </option>
                                                    <option value='inches'> in </option>
                                                </select>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                    )}

                    {/*washDiscolor*/}
                    <div className="container-radio-group m2-h">
                        <input type="checkbox" id={"tear_"+wearTears[5].value} name="wearTear[]"
                            value={wearTears[5].value} 
                            onClick={(e) => {
                                setWearTear({
                                ...wearTear,
                                [wearTears[5].value]: Number(e.target.checked)
                                });
                                addErrorMessageByID("wearTear_error", null);
                            }}
                        />
                        <label htmlFor={"tear_"+wearTears[5].value}>{wearTears[5].label}</label>
                    </div>
                    {wearTear.washDiscolor === 0 && <div></div>}
                    {
                        wearTear.washDiscolor === 1 && (
                        <div>
                            <div className='container-prompt'>
                            <p>How did it change color?</p>
                            </div>
                            <div className="container-input">
                            <textarea 
                                name="discolorHow" 
                                id="discolorHow"
                                value={tearExtra["discolorHow"]}
                                onChange={(e) => {
                                    setTearExtra({
                                    ...tearExtra,
                                    "discolorHow": e.target.value
                                    });
                                }}
                                placeholder='Describe the change in color'
                                rows={3}
                                required
                            >
                            </textarea>
                            </div>
                        </div>
                    )}

                    {/*spandexShrink*/}
                    <div className="container-radio-group m2-h">
                        <input type="checkbox" id={"tear_"+wearTears[6].value} name="wearTear[]"
                            value={wearTears[6].value} 
                            onClick={(e) => {
                                setWearTear({
                                ...wearTear,
                                [wearTears[6].value]: Number(e.target.checked)
                                });
                                addErrorMessageByID("wearTear_error", null);
                            }}
                        />
                        <label htmlFor={"tear_"+wearTears[6].value}>{wearTears[6].label}</label>
                        <CircleBtn
                            iconUrl={info}
                            className="button-info"
                            width="1em"
                            handlePress={() => {
                                let e = document.getElementById("info_shrinking");
                                if (e) {
                                    e.classList.toggle("hide", false);
                                }
                            }}
                        />
                        <PopupImg
                            id="info_shrinking"
                            className="container-popup"
                            iconUrl={img_shrinking}
                            height="75%"
                            width="75%"
                        />
                    </div>
                    {wearTear.spandexShrink === 0 && <div></div>}
                    {
                        wearTear.spandexShrink === 1 && (
                        <div>
                            <div className='container-prompt'>
                            <p>Describe the area that has been affected</p>
                            </div>
                            <div className='container-input'>
                            <input
                                type='text'
                                id='spandexShrinkArea'
                                name='spandexShrinkArea'
                                value={tearExtra["spandexShrinkArea"]}
                                onChange={(e)=>{
                                setTearExtra({
                                    ...tearExtra,
                                    "spandexShrinkArea": e.target.value
                                });
                                }}
                                placeholder='Which area shrunk?'
                                required
                            />                
                            </div>
                            <div className='container-prompt'>
                                <p>Upload photo of shrinking area</p>
                            </div>
                            <div className='container-input-img clickable' onClick={()=>clickID("spandexShrinkImg")}>
                                <img className='clickable' id='spandexShrinkImg_img' src={selectImg} alt='upload photo'/>
                            </div>
                            <div className="container-input">
                            <input id="spandexShrinkImg" type="file" onChange={(e) => setSpandexShrinkImg(e.target.files[0])} required />
                            </div>
                        </div>
                    )}

                    
                    {/*printFade*/}
                    <div className="container-radio-group m2-h">
                        <input type="checkbox" id={"tear_"+wearTears[7].value} name="wearTear[]"
                            value={wearTears[7].value} 
                            onClick={(e) => {
                                setWearTear({
                                ...wearTear,
                                [wearTears[7].value]: Number(e.target.checked)
                                });
                                addErrorMessageByID("wearTear_error", null);
                            }}
                        />
                        <label htmlFor={"tear_"+wearTears[7].value}>{wearTears[7].label}</label>
                    </div>
                    {wearTear.printFade === 0 && <div></div>}
                    {
                        wearTear.printFade === 1 && (
                        <div>
                            <div>
                                <div className='container-prompt'>
                                <p>How much percent of the print faded?</p>
                                <InfoPopup text='How much of the print area has faded? 0% means nothing has faded and 100% means it is completely faded. If not known, use your best estimate'/>
                                </div>
                                <div className='container-input'>
                                <input
                                    type='number'
                                    name='printFade'
                                    value={tearExtra["printFade"]}
                                    onChange={(e)=>{
                                    setTearExtra({
                                        ...tearExtra,
                                        "printFade": e.target.value
                                    });
                                    }}
                                    placeholder='Enter percent'
                                    min={1}
                                    max={100}
                                    step={1}
                                    required
                                />                
                                <label>%</label>
                                </div>
                            </div>
                            <div className='container-prompt'>
                                <p>Upload photo of the print</p>
                            </div>
                            <div className='container-input-img clickable' onClick={()=>clickID("printFadeImg")}>
                                <img className='clickable' id='printFadeImg_img' src={selectImg} alt='upload photo'/>
                            </div>
                            <div className="container-input">
                            <input id="printFadeImg" type="file" onChange={(e) => setPrintFadeImg(e.target.files[0])} required />
                            </div>
                        </div>
                    )}

                    {/*hole*/}
                    <div className="container-radio-group m2-h">
                        <input type="checkbox" id={"tear_"+wearTears[8].value} name="wearTear[]"
                            value={wearTears[8].value} 
                            onClick={(e) => {
                                setWearTear({
                                ...wearTear,
                                [wearTears[8].value]: Number(e.target.checked)
                                });
                                addErrorMessageByID("wearTear_error", null);
                            }}
                        />
                        <label htmlFor={"tear_"+wearTears[8].value}>{wearTears[8].label}</label>
                    </div>
                    {wearTear.hole === 0 && <div></div>}
                    {
                        wearTear.hole === 1 && (
                        <div>
                            <div className='container-prompt'>
                            <p>Which part of the garment has a hole?</p>
                            </div>
                            <div className='container-input'>
                            <input
                                type='text'
                                name='holeArea'
                                value={tearExtra["holeArea"]}
                                onChange={(e)=>{
                                setTearExtra({
                                    ...tearExtra,
                                    "holeArea": e.target.value
                                });
                                }}
                                placeholder='Describe where it has holes'
                                required
                            />                
                            </div>
                            <div className='container-prompt'>
                            <p>What is the size of the hole? (in cm)</p>
                            </div>
                            <div className='container-input'>
                            <input
                                type='number' 
                                name='holeSize'
                                value={tearExtra["holeSize"]}
                                onChange={(e)=>{
                                setTearExtra({
                                    ...tearExtra,
                                    "holeSize": e.target.value
                                });
                                }}
                                placeholder='Enter size of hole'
                                min={0.01}
                                step={0.01}
                                required
                            />
                                </div>
                            <div className='container-prompt'>
                                <p>Upload photo of the hole</p>
                            </div>
                            <div className='container-input-img clickable' onClick={()=>clickID("holeImg")}>
                                <img className='clickable' id='holeImg_img' src={selectImg} alt='upload photo'/>
                            </div>
                            <div className="container-input">
                            <input id="holeImg" type="file" onChange={(e) => setHoleImg(e.target.files[0])} required />
                            </div>
                        </div>
                    )}

                    {/*labelItching*/}
                    <div className="container-radio-group m2-h">
                        <input type="checkbox" id={"tear_"+wearTears[9].value} name="wearTear[]"
                            value={wearTears[9].value} 
                            onClick={(e) => {
                                setWearTear({
                                ...wearTear,
                                [wearTears[9].value]: Number(e.target.checked)
                                });
                                addErrorMessageByID("wearTear_error", null);
                            }}
                        />
                        <label htmlFor={"tear_"+wearTears[9].value}>{wearTears[9].label}</label>
                    </div>
                    <div></div>
                    
                    {/*looseButton*/}
                    <div className="container-radio-group m2-h">
                        <input type="checkbox" id={"tear_"+wearTears[10].value} name="wearTear[]"
                            value={wearTears[10].value} 
                            onClick={(e) => {
                                setWearTear({
                                ...wearTear,
                                [wearTears[10].value]: Number(e.target.checked)
                                });
                                addErrorMessageByID("wearTear_error", null);
                            }}
                        />
                        <label htmlFor={"tear_"+wearTears[10].value}>{wearTears[10].label}</label>
                    </div>
                    {wearTear.looseButton === 0 && <div></div>}
                    {
                        wearTear.looseButton === 1 && (
                        <div>
                            <div className='container-prompt'>
                            <p>Where on the garment?</p>
                            </div>
                            <div className='container-input'>
                            <input
                                type='text'
                                name='looseButtonArea'
                                value={tearExtra["looseButtonArea"]}
                                onChange={(e)=>{
                                setTearExtra({
                                    ...tearExtra,
                                    "looseButtonArea": e.target.value
                                });
                                }}
                                placeholder='Describe the area with loose buttons'
                                required
                            />                
                            </div>
                            <div className='container-prompt'>
                            <p>How many buttons?</p>
                            </div>
                            <div className='container-input'>
                            <input
                                type='number'
                                name='looseButtonQty'
                                value={tearExtra["looseButtonQty"]}
                                onChange={(e)=>{
                                setTearExtra({
                                    ...tearExtra,
                                    "looseButtonQty": e.target.value
                                });
                                }}
                                placeholder='# of buttons'
                                min={1}
                                step={1}
                                required
                            />                
                            </div>
                        </div>
                    )}

                    {/*stain*/}
                    <div className="container-radio-group m2-h">
                        <input type="checkbox" id={"tear_"+wearTears[11].value} name="wearTear[]"
                            value={wearTears[11].value} 
                            onClick={(e) => {
                                setWearTear({
                                ...wearTear,
                                [wearTears[11].value]: Number(e.target.checked)
                                });
                                addErrorMessageByID("wearTear_error", null);
                            }}
                        />
                        <label htmlFor={"tear_"+wearTears[11].value}>{wearTears[11].label}</label>
                    </div>
                    {wearTear.stain === 0 && <div></div>}
                    {
                        wearTear.stain === 1 && (
                        <div>
                            <div className='container-prompt'>
                            <p>Describe the stained area</p>
                            </div>
                            <div className='container-input'>
                            <input
                                type='text'
                                name='stainArea'
                                value={tearExtra["stainArea"]}
                                onChange={(e)=>{
                                setTearExtra({
                                    ...tearExtra,
                                    "stainArea": e.target.value
                                });
                                }}
                                placeholder='Where is the stain?'
                                required
                            />                
                            </div>
                            <div className='container-prompt'>
                            <p>Do you know the source of the stain?</p>
                            </div>
                            <div className="container-radio">
                            <div className="container-radio-group">
                                <input type="radio" id="stainSourceKnow_yes" name="stainSourceKnow"
                                    value={1} 
                                    onClick={(e)=>{
                                        setTearExtra({
                                        ...tearExtra,
                                        "stainSourceKnow": e.target.id
                                        });
                                    }}
                                    defaultChecked={checkOnID("stainSourceKnow_yes", tearExtra.stainSourceKnow)}
                                />
                                <label htmlFor="stainSourceKnow_yes">Yes</label>
                            </div>
                            <div className="container-radio-group">
                                <input type="radio" id="stainSourceKnow_no" name="stainSourceKnow"
                                    value={0} 
                                    onClick={(e)=>{
                                        setTearExtra({
                                        ...tearExtra,
                                        "stainSourceKnow": e.target.id
                                        });
                                    }}
                                    defaultChecked={checkOnID("stainSourceKnow_no", tearExtra.stainSourceKnow)}
                                />
                                <label htmlFor="stainSourceKnow_no">No</label>
                            </div>
                            </div>
                            {
                            tearExtra.stainSourceKnow === "stainSourceKnow_yes" && (
                                <div>
                                <div className='container-prompt'>
                                    <p>What caused the stain?</p>
                                </div>
                                <div className='container-input'>
                                    <input
                                    type='text'
                                    name='stainSource'
                                    value={tearExtra["stainSource"]}
                                    onChange={(e)=>{
                                        setTearExtra({
                                        ...tearExtra,
                                        "stainSource": e.target.value
                                        });
                                    }}
                                    placeholder='Source of stain'
                                    required
                                    />                
                                </div>
                                </div>
                            )
                            }
                            <div className='container-prompt'>
                            <p>Does the stain make it too ugly to wear?</p>
                            </div>
                            <div className="container-radio">
                            <div className="container-radio-group">
                                <input type="radio" id="stainUgly_yes" name="stainUgly"
                                    value={1} 
                                    onClick={(e)=>{
                                        setTearExtra({
                                        ...tearExtra,
                                        "stainUgly": e.target.id
                                        });
                                    }}
                                    defaultChecked={checkOnID("stainUgly_yes", tearExtra.stainUgly)}
                                />
                                <label htmlFor="stainUgly_yes">Yes</label>
                            </div>
                            <div className="container-radio-group">
                                <input type="radio" id="stainUgly_no" name="stainUgly"
                                    value={0} 
                                    onClick={(e)=>{
                                        setTearExtra({
                                        ...tearExtra,
                                        "stainUgly": e.target.id
                                        });
                                    }}
                                    defaultChecked={checkOnID("stainUgly_no", tearExtra.stainUgly)}
                                />
                                <label htmlFor="stainUgly_no">No</label>
                            </div>
                            </div>

                            <div className='container-prompt'>
                                <p>Upload photo of the stain</p>
                            </div>
                            <div className='container-input-img clickable' onClick={()=>clickID("stainImg")}>
                                <img className='clickable' id='stainImg_img' src={selectImg} alt='upload photo'/>
                            </div>
                            <div className="container-input">
                            <input id="stainImg" type="file" onChange={(e) => setStainImg(e.target.files[0])} required />
                            </div>
                        </div>
                    )}

                    {/*other*/}
                    <div className="container-radio-group m2-h">
                        <input type="checkbox" id={"tear_"+wearTears[12].value} name="wearTear[]"
                            value={wearTears[12].value} 
                            onClick={(e) => {
                                setWearTear({
                                ...wearTear,
                                [wearTears[12].value]: Number(e.target.checked)
                                });
                                addErrorMessageByID("wearTear_error", null);
                            }}
                        />
                        <label htmlFor={"tear_"+wearTears[12].value}>{wearTears[12].label}</label>
                    </div>
                    {wearTear.other === 0 && <div></div>}
                    {
                        wearTear.other === 1 && (
                        <div>
                            <div className='container-prompt'>
                            <p>What is the tear?</p>
                            </div>
                            <div className='container-input'>
                            <input
                                type='text'
                                name='tearOther'
                                value={tearExtra["tearOther"]}
                                onChange={(e)=>{
                                setTearExtra({
                                    ...tearExtra,
                                    "tearOther": e.target.value
                                });
                                }}
                                placeholder='Enter a tear'
                                required
                            />                
                            </div>
                        </div>
                    )}

                    </div>
                }
                </div>
            </div>

        <br/>

        <div className='container-content'>
        <label className='text-b clickable' htmlFor='wantRepair'>Require garment repair?</label>
        <label className='tab'></label>
        <input type='checkbox' id="wantRepair" name='wantRepair' checked={wantRepair} onChange={(e)=>setWantRepair(e.target.checked)} />
        <InfoPopup text='Damage which require support such as lost buttons, missing strings, broken zipper, etc.'/>
        </div>

        {
        wantRepair && (
            <div>
            <div className="container-prompt">
                <p>Select which repairs are needed (Check all that apply)</p>
            </div>
            <div id={"repair_error"} style={{textAlign:"center"}}></div>
            {
                repairRequests.map((repair, index)=>{
                return(
                    <div  key={"repair_"+index} className="container-radio-group m2-h">
                    <input type="checkbox" id={"repair_"+repair.value} name="repairs[]"
                        value={repair.value} 
                        onClick={(e) => {
                            setRepairRequest({
                                ...repairRequest,
                                [repair.value]: Number(e.target.checked)
                            });
                            addErrorMessageByID("repair_error", null);
                        }}
                    />
                    <label htmlFor={"repair_"+repair.value}>{repair.label}</label>
                    </div>
                )
                })
            }
            {
                repairRequest.other === 1 && (
                <div>
                    <div className='container-prompt'>
                    <p>Specify request</p>
                    </div>
                    <div className='container-input'>
                    <input
                        type='text'
                        name='repairOther'
                        value={repairOther}
                        onChange={(e)=>setRepairOther(e.target.value)}
                        placeholder='Enter your request'
                        required
                    />                
                    </div>
                </div>
            )}
            </div>
            )
          }

          <br/>
          <div className='container-input'>
              <button className="button-form full" type="submit">
                  Save
              </button>
          </div>
        </form>
      </div>      
    </div>
  );
}