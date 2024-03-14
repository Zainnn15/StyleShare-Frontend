import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { GarmentContext } from "../../context/garmentContext";
import Axios from "axios";

import '../styles/main.scss';

import ScreenHeaderIn from "../components/common/ScreenHeaderIn";
import { careInstructions, weekDays } from "../constants/data/lists";
import { addErrorMessageByID } from "../constants/functions/inputHandlers";
import { findAttribute, formatDate, formatStr, formatTemp, parseID } from "../constants/functions/valueHandlers";
import { GARMENT_TYPES } from "../constants/data/options";
import { id_instructionBleach, id_instructionDry, id_instructionDryC, id_instructionIron, id_instructionTumble, id_instructionWash, id_purchaseMethod } from "../constants/data/inputID";
import CircleImg from "../components/common/CircleImg";


export default function Profile() {
    const {user} = useContext(UserContext);
    const [profile, setProfile] = useState(null);
    const [selectedDays, setSelectedDays] = useState([]);
    const [selectedTimes, setSelectedTimes] = useState([
      {"day":0, "start":"", "end":""},
      {"day":1, "start":"", "end":""},
      {"day":2, "start":"", "end":""},
      {"day":3, "start":"", "end":""},
      {"day":4, "start":"", "end":""},
      {"day":5, "start":"", "end":""},
      {"day":6, "start":"", "end":""},
    ]); //change default to value gotten from database
    const [editMode, setEditMode] = useState(false);
    const {garment} = useContext(GarmentContext);
    const [garmentDetails, setGarmentDetails] = useState(null);

    //only show Monday-Friday
    const weeks = [];
    weekDays.forEach((day) => {
      if(day.value > 0 && day.value < 6) {
        weeks.push(day);
      }
    });

    // const handleCheckboxChange = (day) => {
    //   if (selectedDays.includes(day)) {
    //     setSelectedDays(selectedDays.filter((selectedDay) => selectedDay !== day));
    //   } else {
    //     setSelectedDays([...selectedDays, day]);
    //   }
    // };

    const handleUpdateProfile = () => {
      //validate time
      for(let time of selectedTimes) {
        if(time.start && time.end && time.start > time.end) {
          addErrorMessageByID("timeRange_error", "Time range must be sequential");
          return false;
        }
      }
      addErrorMessageByID("timeRange_error", null);
      setEditMode(false);

      // Send selectedDays as an array to the server using Axios

      Axios.post('/updateProfile', {
        userId: user.id,
        selectedDays: selectedDays,
      })
        .then((response) => {
          // Handle the response from the server, if needed
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    useEffect(() => {
      if (!profile && garmentDetails === null) {
        // Fetch user profile
        fetch('/profile', { cache: 'no-store' })
          .then((res) => res.json())
          .then((data) => {
            console.log('User Profile:', data); // Log user profile to console
            setProfile(data);
            setSelectedDays(data?.SenecaDays || []); // Load the existing SenecaDays
          })
          .catch((error) => console.error('Error fetching user profile:', error));
    
        // Fetch garment details based on the user ID
        fetch(`/getGarmentDetails/${user.id}`, { cache: 'no-store' })
        .then((res) => res.json())
        .then((garmentData) => {
          console.log('Garment Details:', garmentData); // Log garment details to console
          setGarmentDetails(garmentData);
        })
        .catch((error) => console.error('Error fetching garment details:', error));
      }
    }, []);
    
    function handleChangeSchedule() {
      if(editMode === true) {
        setSelectedDays([]);
        setSelectedTimes([
          {"day":0, "start":"", "end":""},
          {"day":1, "start":"", "end":""},
          {"day":2, "start":"", "end":""},
          {"day":3, "start":"", "end":""},
          {"day":4, "start":"", "end":""},
          {"day":5, "start":"", "end":""},
          {"day":6, "start":"", "end":""},
        ]); //change default to value gotten from database
      }
      setEditMode(!editMode);
    }

    function handleDaySelect(e) {
      let temp = selectedDays;
      if(e.target.checked) {
        if(!selectedDays.includes(e.target.value)) {
          temp.push(e.target.value);
          temp.sort();
        }
      }
      else {
        let index = selectedDays.indexOf(e.target.value);
        if(index > -1) {
          temp.splice(index, 1);
        }
      }
      setSelectedDays([...temp]);
    }

  return (
    <div>
      <ScreenHeaderIn />
      <div className="container main">
          <div>
              <label className="container-title">Profile</label>
              <hr/>
          </div>
          <div className="container-border greeting">
            <h3>Welcome, {user.name}</h3>
          </div>        
          <hr/>
          <div className="container-content popup">
            <h3>User Details</h3>
            <hr/>
            <br/>
            <div className="container-grid-2-md gap">
              <div className="container-border clear-box">
                <p><label className="text-b">Name:<label className="tab"></label></label>{user.name}</p>
                <p><label className="text-b">Username:<label className="tab"></label></label>{user.username}</p>
                <p><label className="text-b">Email:<label className="tab"></label></label>{user.email}</p>
                <p><label className="text-b">Group #:<label className="tab"></label></label></p>
              </div>
              <div className="container-border clear-box">
                <p className="text-b">Available times in Seneca:</p>
                <div id="user_schedule">
                  <ul>
                  {
                    selectedTimes.length > 0 &&
                    selectedTimes.map((schedule, index) => {
                      return(
                        schedule.start && schedule.end && (
                        <li key={"sched_"+index}>
                          <label>
                            {weekDays[schedule.day].label}:
                            <label className="tab"></label>
                            <label>{`${schedule.start} - ${schedule.end}`}</label>
                          </label>
                        </li>)
                      )
                    })
                  }
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <br/>

          {/* Button to toggle edit mode */}
          <div className="container-content">
            <button className={editMode ? "button-cancel" : "button-regular"} 
              onClick={handleChangeSchedule}
            >
                {editMode ? "Cancel" : "Change Seneca Days"}
            </button>
          </div>

        {/* Section to select days */}
        {editMode && (
          <div>
            <div className="container-prompt">
              <p>Select your available days</p>
            </div>
            <div id={"timeRange_error"} style={{textAlign:"center"}}></div>
            <div className="container-input">
                {weeks.map((day, index) => {
                  return(
                    <label key={"chooseDay_"+index} className="clickable">
                      <input
                        type="checkbox"
                        value={day.value}
                        defaultChecked={selectedDays.includes((day.value).toString())}
                        onChange={handleDaySelect}
                      />
                      {day.label}
                    </label>
                  )
                })}
              <button className="button-regular" onClick={handleUpdateProfile}>Save</button>
            </div>

            <div className="container-grid-2-md">
            {selectedDays.map((dayNum, index) => {
                  return(
                    <div key={"chooseTime_"+index}>
                      <div className="container-prompt">
                        <p>{weekDays[dayNum].label} Available Time</p>
                      </div>
                      <div className="container-content">
                        <div className="container-grid-2-md center">
                          <div>
                            <p>Start Time</p>
                            <input type="time" value={selectedTimes[dayNum].start}
                              onChange={(e)=>{
                                let temp = selectedTimes;
                                temp[dayNum].start = e.target.value;
                                setSelectedTimes(temp);
                                
                              }}
                              onBlur={(e)=>{
                                e.target.value = selectedTimes[dayNum].start;
                              }}
                            />
                          </div>
                          <div>
                            <p>End Time</p>
                            <input type="time" value={selectedTimes[dayNum].end}
                              onChange={(e)=>{
                                let temp = selectedTimes;
                                temp[dayNum].end = e.target.value;
                                setSelectedTimes(temp);
                              }}
                              onBlur={(e)=>{
                                e.target.value = selectedTimes[dayNum].end;
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )
              })}
            </div>
            
          </div>
        )}

        <br/>
        {
          garment && (
            <div>
              <hr/>
              <div className="container-content popup">
                <h3>Garment Details</h3>
                <hr/>
              </div>
              <div className="container-grid-2-md gap container-border clear-box">
                <div>
                  <p>
                    <label className="text-b">Type:<label className="tab"></label></label>
                    {findAttribute(GARMENT_TYPES, garment.garmentType)}
                  </p>
                  <p>
                    <label className="text-b">Description:<label className="tab"></label></label>
                    <div className="container-border m1-v">
                      <label>{garment.garmentDescription}</label>
                    </div>
                  </p>
                  <p>
                    <label className="text-b">Country of Origin:<label className="tab"></label></label>
                    {garment.garmentCountry}
                  </p>
                </div>

                <div>
                  <p>
                    <label className="text-b">Store:<label className="tab"></label></label>
                    {garment.purchaseLocation}
                  </p>
                  <p>
                    <label className="text-b">Purchase Date:<label className="tab"></label></label>
                    {
                      formatDate(garment.purchaseDate)
                    }
                  </p>
                  <p>
                    <label className="text-b">Purchase Method:<label className="tab"></label></label>
                    {id_purchaseMethod[garment.purchaseMethod]}
                  </p>
                  <p>
                    <label className="text-b">Cost:<label className="tab"></label></label>
                    $ {garment.garmentCost}
                    {garment.garmentDiscount === "discount_yes" && (<label> (Discounted)</label>)}
                  </p>
                  {
                    garment.garmentDiscount === "discount_yes" &&
                    (
                      <p>
                        <label className="tab"></label>
                        <label className="text-b">Original Price:<label className="tab"></label></label>
                        $ {garment.garmentOgCost}
                      </p>
                    )
                  }
                </div>
              </div>
              <br/>
                  
              <label className="container-subtitle-2">Garment Composition</label>
              <div className="container-border clear-box">
                <div className="container-grid-3-md center gap m1-v">
                  <div>
                    <label className="text-b text-u">Main</label>
                    <ul>
                    {
                      garment.compositionMain.map((comp, index)=>{
                        return (
                          <li key={"main_"+index}>
                              <label>{comp.value}:</label>
                              <label className="tab"></label>
                              <label>{comp.percent}%</label>
                          </li>
                        )
                      })
                    }
                    </ul>
                  </div>

                  <div>
                    <label className="text-b text-u">Lining</label>
                    {!garment.hasLining && <p>N/A</p>}
                    <ul>
                    {
                      garment.hasLining &&
                      garment.compositionLining.map((comp, index)=>{
                        return (
                          <li key={"lining_"+index}>
                              <label>{comp.value}:</label>
                              <label className="tab"></label>
                              <label>{comp.percent}%</label>
                          </li>
                        )
                      })
                    }
                    </ul>
                  </div>

                  <div>
                    <label className="text-b text-u">Padding/Stuffing</label>
                    {!garment.hasPadding && <p>N/A</p>}
                    <ul>
                    {
                      garment.hasPadding &&
                      garment.compositionPadding.map((comp, index)=>{
                        return (
                          <li key={"padding_"+index}>
                              <label>{comp.value}:</label>
                              <label className="tab"></label>
                              <label>{comp.percent}%</label>
                          </li>
                        )
                      })
                    }
                    </ul>
                  </div>

                </div>
              </div>

            </div>
          )
        }

        <br/><br/>
        {
          garment &&  (
            <div>
              <hr/>
              <div className="container-content popup">
                <h3>Care Instructions</h3>
                <hr/>
              </div>

              <label className="container-subtitle-2">Washing Instructions</label>
              <div className="container-border">
                <div className="container-care">
                    <div className="container-care-group">
                      <span className="container-care-img">
                        <CircleImg className="img-care" 
                            iconUrl={careInstructions[id_instructionWash[garment.instructionWash["Wash"]]].img} 
                            width="50%"/>
                        <label>{careInstructions[id_instructionWash[garment.instructionWash["Wash"]]].name}</label>
                      </span>
                    </div>

                    {
                      garment.instructionWash["Wash"] === "wash_yes" &&
                      <div className="container-care-group">
                        <span className="container-care-img">
                          <CircleImg className="img-care" 
                              iconUrl={careInstructions[id_instructionWash[garment.instructionWash["Machine"]]].img} 
                              width="50%"/>
                          <label>{careInstructions[id_instructionWash[garment.instructionWash["Machine"]]].name}</label>
                        </span>
                      </div>
                    }

                    {
                      garment.instructionWash["Wash"] === "wash_yes" &&
                      garment.instructionWash["Heat"] !== "wash_heat_xx" &&
                      garment.instructionWash["Heat"] &&
                      <div className="container-care-group">
                      <span className="container-care-img">
                        <CircleImg className="img-care" 
                            iconUrl={careInstructions[id_instructionWash[garment.instructionWash["Heat"]]].img} 
                            width="50%"/>
                        <label>{careInstructions[id_instructionWash[garment.instructionWash["Heat"]]].name}</label>
                      </span>
                    </div>
                    }

                    {
                      garment.instructionWash["Wash"] === "wash_yes" &&
                      //garment.instructionWash["Temp"] === "wash_heat_xx" &&
                      garment.instructionWash["Temp"] &&
                      <div className="container-care-group">
                        <span className="container-care-img">
                          <CircleImg className="img-care" 
                              iconUrl={careInstructions["washHeatXX"].img} 
                              width="50%"/>
                          <label>
                            {
                              formatTemp(garment.instructionWash["Temp"])
                            }
                          </label>
                        </span>
                      </div>
                    }

                </div>
              </div>
              <br/>
          
              <label className="container-subtitle-2">Tumble Drying Instructions</label>
              <div className="container-border">
                <div className="container-care">
                    <div className="container-care-group">
                      <span className="container-care-img">
                        <CircleImg className="img-care" 
                            iconUrl={careInstructions[id_instructionTumble[garment.instructionTumble["Tumble"]]].img} 
                            width="50%"/>
                        <label>{careInstructions[id_instructionTumble[garment.instructionTumble["Tumble"]]].name}</label>
                      </span>
                    </div>

                    {
                      garment.instructionTumble["Tumble"] === "tumble_no" &&
                      <div className="container-care-group">
                      <span className="container-care-img">
                        <CircleImg className="img-care" 
                            iconUrl={careInstructions[id_instructionDry[garment.instructionTumble?.["Air"]] ?? "defaultKey"]?.img ?? "path/to/default/image.png"} 
                            width="50%"/>
                        <label>{careInstructions[id_instructionDry[garment.instructionTumble?.["Air"]] ?? "defaultKey"]?.name ?? "Default Name"}</label>
                      </span>
                    </div>
                    }
  
                    {
                      garment.instructionTumble["Tumble"] === "tumble_no" &&
                      garment.instructionTumble["Air"] === "dry_shade" &&
                        <div className="container-care-group">
                          <span className="container-care-img">
                            <CircleImg className="img-care" 
                                iconUrl={careInstructions[id_instructionDry[garment.instructionTumble["Shade"]]].img} 
                                width="50%"/>
                            <label>{careInstructions[id_instructionDry[garment.instructionTumble["Shade"]]].name}</label>
                          </span>
                        </div>
                    }

                    {
                      garment.instructionTumble["Tumble"] === "tumble_yes" &&
                        <div className="container-care-group">
                          <span className="container-care-img">
                            <CircleImg className="img-care" 
                                iconUrl={careInstructions[id_instructionTumble[garment.instructionTumble["Delicate"]]].img} 
                                width="50%"/>
                            <label>{careInstructions[id_instructionTumble[garment.instructionTumble["Delicate"]]].name}</label>
                          </span>
                        </div>    
                    }

                    {
                      garment.instructionTumble["Tumble"] === "tumble_yes" &&
                      <div className="container-care-group">
                        <span className="container-care-img">
                          <CircleImg className="img-care" 
                              iconUrl={careInstructions[id_instructionTumble[garment.instructionTumble["Heat"]]].img} 
                              width="50%"/>
                          <label>{careInstructions[id_instructionTumble[garment.instructionTumble["Heat"]]].name}</label>
                        </span>
                      </div>
                    }

                </div>
              </div>
              <br/>

              <label className="container-subtitle-2">Dry Cleaning Instructions</label>
              <div className="container-border">
                <div className="container-care">
                  <div className="container-care-group">
                    <span className="container-care-img">
                      <CircleImg className="img-care" 
                          iconUrl={careInstructions[id_instructionDryC[garment.instructionDryC["DryC"]]].img} 
                          width="50%"/>
                      <label>{careInstructions[id_instructionDryC[garment.instructionDryC["DryC"]]].name}</label>
                    </span>
                  </div>

                  {
                    garment.instructionDryC["DryC"] === "dryC_yes" &&
                    <div className="container-care-group">
                    <span className="container-care-img">
                      <CircleImg className="img-care" 
                          iconUrl={careInstructions[id_instructionDryC[garment.instructionDryC["Solvent"]]].img} 
                          width="50%"/>
                      <label>{careInstructions[id_instructionDryC[garment.instructionDryC["Solvent"]]].name}</label>
                    </span>
                  </div>
                  }

                  {
                    garment.instructionDryC["DryC"] === "dryC_yes" &&
                    <div className="container-care-group">
                    <span className="container-care-img">
                      <CircleImg className="img-care" 
                          iconUrl={careInstructions[id_instructionDryC[garment.instructionDryC["Care"]]].img} 
                          width="50%"/>
                      <label>{careInstructions[id_instructionDryC[garment.instructionDryC["Care"]]].name}</label>
                    </span>
                  </div>
                  }

                </div>
              </div>
              <br/>

              <label className="container-subtitle-2">Ironing Instructions</label>
              <div className="container-border">
                <div className="container-care">
                    <div className="container-care-group">
                      <span className="container-care-img">
                        <CircleImg className="img-care" 
                            iconUrl={careInstructions[id_instructionIron[garment.instructionIron["Iron"]]].img} 
                            width="50%"/>
                        <label>{careInstructions[id_instructionIron[garment.instructionIron["Iron"]]].name}</label>
                      </span>
                    </div>

                    {
                      garment.instructionIron["Iron"] === "iron_yes" &&
                      <div className="container-care-group">
                        <span className="container-care-img">
                          <CircleImg className="img-care" 
                              iconUrl={careInstructions[id_instructionIron[garment.instructionIron["Heat"]]].img} 
                              width="50%"/>
                          <label>{careInstructions[id_instructionIron[garment.instructionIron["Heat"]]].name}</label>
                        </span>
                      </div>
                    }

                </div>
              </div>
              <br/>

              {console.log(careInstructions[id_instructionBleach[garment.instructionBleach["Bleach"]]])}
              <label className="container-subtitle-2">Bleaching Instructions</label>
              <div className="container-border">
                <div className="container-care">
                  <div className="container-care-group">
                    <span className="container-care-img">
                      <CircleImg className="img-care" 
                          iconUrl={careInstructions[id_instructionBleach[garment.instructionBleach["Bleach"]]].img} 
                          width="50%"/>
                      <label>{careInstructions[id_instructionBleach[garment.instructionBleach["Bleach"]]].name}</label>
                    </span>
                  </div>
                </div>
              </div>

            </div>
        )}

      </div>
    </div>
  )

}
