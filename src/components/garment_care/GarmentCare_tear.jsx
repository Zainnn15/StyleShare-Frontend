/* eslint-disable react/prop-types */
import { useState } from 'react';
import '../../styles/main.scss';
import { toast } from 'react-hot-toast';
import ScreenHeaderIn from "../../components/common/ScreenHeaderIn";
import { wearTears, repairRequests } from '../../constants/data/lists';
import InfoPopup from '../../components/common/InfoPopup';
import { addErrorMessageByID, checkOnID } from '../../constants/functions/inputHandlers';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../../../context/userContext';
import { useNavigate } from 'react-router-dom';

export default function GarmentTear() {
  const navigate = useNavigate();
  const {user} = useContext(UserContext);
  const [tearDate, setTearDate] = useState('');
  const [wantRepair, setWantRepair] = useState(false);
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
    "colorLost":"",
    "pillingArea":"",
    "pillingStrength":"",
    "shapeLossArea":"",
    "shapeLossHow":"",
    "twistingArea":"",
    "twistingSize":"",
    "twistingImg":"",
    "shrinkType":"",
    "shrinkNewSize":"",
    "discolorHow":"",
    "spandexShrinkArea":"",
    "spandexShrinkImg":"",
    "printFadeImg":"",
    "holeArea":"",
    "holeSize":"",
    "holeImg":"",
    "looseButtonArea":"",
    "looseButtonQty":"",
    "stainArea":"",
    "stainSourceKnow":"",
    "stainSource":"",
    "stainUgly":"",
    "stainImg":"",
    "tearOther":"",
  });
  const [repairRequest, setRepairRequest] = useState({
    "looseButton":"",
    "brokenZipper":"",
    "lostString":"",
    "looseHem":"",
    "other":"",
  });
  const [repairOther, setRepairOther] = useState('');

  // Function to send the garment details to the backend
  const sendGarmentDetails = async () => {
    try {
      const garmentData = {
        tearDate,
        wantRepair,
        wearTear,
        tearExtra,
        repairRequest,
        repairOther,
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


  return (
    <div>
        <ScreenHeaderIn />
        <div className='container main'>
        <div>
            <label className="container-title">Garment Tear</label>
            <hr/>
        </div>
        <form onSubmit={handleSubmit}>
            <div className='container-content'>
                <label className='text-b'>Date of Tear:</label>
                <label className='tab'></label>
                <input type='date' value={tearDate} onChange={(e)=>setTearDate(e.target.value)} />
            </div>

            <div>
                <div className="container-prompt">
                    <p>What are the wear and tears? (Check all that applies)</p>
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
                                <option value='little'>Little</option>
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
                                placeholder='Describe how the shape was lost'
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
                                placeholder='Describe where it has twisted'
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
                            <div className='container-input'>
                                <input
                                    id="twistingImg"
                                    name="twistingImg"
                                    type='file'
                                    required
                                    onChange={(e) => {
                                    setTearExtra({
                                        ...tearExtra,
                                        "twistingImg": e.target.files[0]
                                    });
                                    }}
                                />
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
                        <div>
                            <div className='container-prompt'>
                            <p>In what way did it shrink?</p>
                            </div>
                            <div className="container-input">
                            <select 
                                name="shrinkType" 
                                id="shrinkType"
                                value={tearExtra["shrinkType"]}
                                onChange={(e) => {
                                    setTearExtra({
                                    ...tearExtra,
                                    "shrinkType": e.target.value
                                    });
                                }}
                                required
                            >
                                <option value=''>Select in what way...</option>
                                <option value='length'>Length-wise</option>
                                <option value='overall'>Overall Size</option>
                            </select>
                            </div>
                            <div className='container-prompt'>
                            <p>New measurement of garment (in cm)</p>
                            </div>
                            <div className='container-input'>
                            <input
                                type='number'
                                name='shrinkNewSize'
                                value={tearExtra["shrinkNewSize"]}
                                onChange={(e)=>{
                                setTearExtra({
                                    ...tearExtra,
                                    "shrinkNewSize": e.target.value
                                });
                                }}
                                placeholder='Measurement'
                                min={0.01}
                                step={0.01}
                                required
                            />                
                            </div>
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
                                placeholder='Did the change come from other garments during wash process? Describe'
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
                    </div>
                    {wearTear.spandexShrink === 0 && <div></div>}
                    {
                        wearTear.spandexShrink === 1 && (
                        <div>
                            <div className='container-prompt'>
                            <p>Describe the area which has been affected</p>
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
                                placeholder='Which part did it shrink?'
                                required
                            />                
                            </div>
                            <div className='container-prompt'>
                                <p>Upload photo of shrinking area</p>
                            </div>
                            <div className='container-input'>
                                <input
                                    id="spandexShrinkImg"
                                    name="spandexShrinkImg"
                                    type='file'
                                    required
                                    onChange={(e) => {
                                    setTearExtra({
                                        ...tearExtra,
                                        "spandexShrinkImg": e.target.files[0]
                                    });
                                    }}
                                />
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
                            <div className='container-prompt'>
                                <p>Upload photo of the print</p>
                            </div>
                            <div className='container-input'>
                                <input
                                    id="printFadeImg"
                                    name="printFadeImg"
                                    type='file'
                                    required
                                    onChange={(e) => {
                                    setTearExtra({
                                        ...tearExtra,
                                        "printFadeImg": e.target.files[0]
                                    });
                                    }}
                                />
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
                            <p>Which part of the garment has holes?</p>
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
                                placeholder='Hole size'
                                min={0.01}
                                step={0.01}
                                required
                            />                
                            </div>
                            <div className='container-prompt'>
                                <p>Upload photo of the hole</p>
                            </div>
                            <div className='container-input'>
                                <input
                                    id="holeImg"
                                    name="holeImg"
                                    type='file'
                                    required
                                    onChange={(e) => {
                                    setTearExtra({
                                        ...tearExtra,
                                        "holeImg": e.target.files[0]
                                    });
                                    }}
                                />
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
                            <p>Describe which buttons</p>
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
                            <p>Describe the area that has the stain</p>
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
                                placeholder='Which part has the stain?'
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
                            <p>Did the stain make it too ugly to wear?</p>
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
                            <div className='container-input'>
                                <input
                                    id="stainImg"
                                    name="stainImg"
                                    type='file'
                                    required
                                    onChange={(e) => {
                                    setTearExtra({
                                        ...tearExtra,
                                        "stainImg": e.target.files[0]
                                    });
                                    }}
                                />
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
                <p>Select which repairs are needed (Check all that applies)</p>
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
              <button className="button-form full" type="submit" onClick={handleSubmit}>
                  Save
              </button>
          </div>
        </form>
      </div>      
    </div>
  );
}