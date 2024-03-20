import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { GarmentContext } from "../../context/garmentContext";
import { GroupContext } from "../../context/groupContext";
import Axios from "axios";

import '../styles/main.scss';

import ScreenHeaderIn from "../components/common/ScreenHeaderIn";
import { addErrorMessageByID } from "../constants/functions/inputHandlers";
import { findAttribute, formatDate, formatTemp, getAttrByInpID} from "../constants/functions/valueHandlers";
import { GARMENT_TYPES } from "../constants/data/options";
import { id_instructionBleach, id_instructionDry, id_instructionDryC, id_instructionIron, id_instructionTumble, id_instructionWash, id_purchaseMethod } from "../constants/data/inputID";
import CircleImg from "../components/common/CircleImg";


export default function Profile() {
    const {user} = useContext(UserContext);
    const {userGroups} = useContext(GroupContext);
    const {garment} = useContext(GarmentContext);
    const [profile, setProfile] = useState(null);
    const [selectedDays, setSelectedDays] = useState([]);
    const [selectedTimes, setSelectedTimes] = useState([
      { day: 0, start: "", end: "" },
      { day: 1, start: "", end: "" },
      { day: 2, start: "", end: "" },
      { day: 3, start: "", end: "" },
      { day: 4, start: "", end: "" },
      { day: 5, start: "", end: "" },
      { day: 6, start: "", end: "" },
    ]);
    const [editMode, setEditMode] = useState(false);
    const [garmentDetails, setGarmentDetails] = useState(null); //used for?
    const [instructions, setInstructions] = useState({
      "Wash": "",
      "Tumble":"",
      "DryC":"",
      "Iron":"",
      "Bleach":""
    })

    const weekDays = [
      { value: 0, label: "Sunday", short: "Sun" },
      { value: 1, label: "Monday", short: "Mon" },
      { value: 2, label: "Tuesday", short: "Tue" },
      { value: 3, label: "Wednesday", short: "Wed" },
      { value: 4, label: "Thursday", short: "Thu" },
      { value: 5, label: "Friday", short: "Fri" },
      { value: 6, label: "Saturday", short: "Sat" },
    ];
  
    const dayMapping = {
      0: 'Sunday',
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednesday',
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday',
    };
  
    const weeks = weekDays.filter((day) => day.value > 0 && day.value < 6);

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
        selectedTimes: selectedTimes.filter(time => time.start && time.end), // Filter out times without start/end
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
          setProfile(data);
          setSelectedDays(data?.SenecaDays || []);
          setSelectedTimes(data?.SenecaTimes.filter(time => time.start && time.end) || []); // Correct filtering logic
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

      if(garment) {
        setInstructions({
          ...instructions, 
          "Wash": JSON.parse(garment.instructionWash[0]),
          "Tumble": JSON.parse(garment.instructionTumble[0]),
          "DryC": JSON.parse(garment.instructionDryC[0]),
          "Iron": JSON.parse(garment.instructionIron[0]),
          "Bleach": JSON.parse(garment.instructionBleach[0]),
        });
      }
    }, []);
    
    function handleChangeSchedule() {
      if(editMode === true) {
        setSelectedDays([]);
        setSelectedTimes([
          { day: 0, start: "", end: "" },
          { day: 1, start: "", end: "" },
          { day: 2, start: "", end: "" },
          { day: 3, start: "", end: "" },
          { day: 4, start: "", end: "" },
          { day: 5, start: "", end: "" },
          { day: 6, start: "", end: "" },
        ]);
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

    const handleTimeChange = (day, field, value) => {
      const temp = [...selectedTimes];
      const index = temp.findIndex((time) => time.day === day);
      temp[index][field] = value;
      setSelectedTimes(temp);
    };

    console.log()

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
                <p><label className="text-b">Group:<label className="tab"></label></label>
                  {
                    userGroups &&
                    <label>{userGroups.group_name}</label>
                  }
                  {
                    !userGroups &&
                    <label>N/A</label>
                  }
                </p>
              </div>
              <div className="container-border clear-box">
              <p>Days going to Seneca: {selectedDays.map(dayNum => dayMapping[dayNum]).join(", ")}</p>
        <div id="user_schedule">
          <ul>
            {selectedTimes.length > 0 &&
              selectedTimes.map((schedule, index) => {
                // Display information for a specific day (e.g., Thursday)
                //if (schedule.day === 4) {
                  return (
                    schedule.start &&
                    schedule.end && (
                      <li key={"sched_" + index}>
                        <label>
                          {dayMapping[schedule.day]}:
                          <label className="tab"></label>
                          <label>{`${schedule.start} - ${schedule.end}`}</label>
                        </label>
                      </li>
                    )
                  );
                //}
               // return null; // Don't render if it's not the specified day
              })}
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
              return (
                <div key={"chooseTime_" + index}>
                  <div className="container-prompt">
                    <p>{weekDays[dayNum].label} Available Time</p>
                  </div>
                  <div className="container-content">
                    <div className="container-grid-2-md center">
                      <div>
                        <p>Start Time</p>
                        <input
                          type="time"
                          value={selectedTimes[dayNum]?.start || ""}
                          onChange={(e) =>
                            handleTimeChange(
                              weekDays[dayNum].value,
                              "start",
                              e.target.value
                            )
                          }
                          onBlur={(e) => {
                            e.target.value = selectedTimes[dayNum]?.start || "";
                          }}
                            />
                          </div>
                          <div>
                            <p>End Time</p>
                            <input type="time" value={selectedTimes[dayNum].end}
                            onChange={(e) =>
                              handleTimeChange(
                                weekDays[dayNum].value,
                                "end",
                                e.target.value
                              )
                            }
                            onBlur={(e) => {
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
                  </p>
                  <div className="container-border m1-v">
                      <label>{garment.garmentDescription}</label>
                  </div>
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
                <div className="container-grid-3-md gap m1-v">
                  <div>
                    <p className="text-b text-u center m0">Main</p>
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
                    <p className="text-b text-u center m0">Lining</p>
                    {!garment.compositionLining.length > 0 && <p>N/A</p>}
                    <ul>
                    {
                      garment.compositionLining.length > 0 &&
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
                    <p className="text-b text-u center m0">Padding/Stuffing</p>
                    {!garment.compositionPadding.length > 0 && <p>N/A</p>}
                    <ul>
                    {
                      garment.compositionPadding.length > 0 &&
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
                            iconUrl={getAttrByInpID(instructions.Wash["Wash"], id_instructionWash)}
                            width="50%"/>
                        <label>
                          {getAttrByInpID(instructions.Wash["Wash"], id_instructionWash, "name")}
                        </label>
                      </span>
                    </div>

                    {
                      instructions.Wash["Wash"] === "wash_yes" &&
                      <div className="container-care-group">
                        <span className="container-care-img">
                          <CircleImg className="img-care" 
                              iconUrl={getAttrByInpID(instructions.Wash["Machine"], id_instructionWash)}
                              width="50%"/>
                          <label>
                            {getAttrByInpID(instructions.Wash["Machine"], id_instructionWash, "name")}
                          </label>
                        </span>
                      </div>
                    }

                    {
                      instructions.Wash["Wash"] === "wash_yes" &&
                      instructions.Wash["Heat"] !== "wash_heat_xx" &&
                      instructions.Wash["Heat"] !== "" &&
                      <div className="container-care-group">
                      <span className="container-care-img">
                        <CircleImg className="img-care" 
                            iconUrl={getAttrByInpID(instructions.Wash["Heat"], id_instructionWash)} 
                            width="50%"/>
                        <label>
                          {getAttrByInpID(instructions.Wash["Heat"], id_instructionWash, "name")}
                        </label>
                      </span>
                    </div>
                    }

                    {
                      instructions.Wash["Wash"] === "wash_yes" &&
                      instructions.Wash["Heat"] === "wash_heat_xx" &&
                      instructions.Wash["Temp"] !== "" &&
                      <div className="container-care-group">
                        <span className="container-care-img">
                          <CircleImg className="img-care" 
                              iconUrl={getAttrByInpID(instructions.Wash["Temp"], id_instructionWash)} 
                              width="50%"/>
                          <label>
                            {
                              formatTemp(getAttrByInpID(instructions.Wash["Temp"], id_instructionWash, "name"))
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
                            iconUrl={getAttrByInpID(instructions.Tumble["Tumble"], id_instructionTumble)}
                            width="50%"/>
                        <label>
                          {getAttrByInpID(instructions.Tumble["Tumble"], id_instructionTumble, "name")}
                        </label>
                      </span>
                    </div>

                    {
                      instructions.Tumble["Tumble"] === "tumble_no" &&
                      <div className="container-care-group">
                      <span className="container-care-img">
                        <CircleImg className="img-care" 
                            iconUrl={getAttrByInpID(instructions.Tumble["Air"], id_instructionDry)} 
                            width="50%"/>
                        <label>
                          {getAttrByInpID(instructions.Tumble["Air"], id_instructionDry, "name")}
                        </label>
                      </span>
                    </div>
                    }
  
                    {
                      instructions.Tumble["Tumble"] === "tumble_no" &&
                      instructions.Tumble["Air"] === "dry_shade" &&
                        <div className="container-care-group">
                          <span className="container-care-img">
                            <CircleImg className="img-care" 
                                iconUrl={getAttrByInpID(instructions.Tumble["Shade"], id_instructionDry)} 
                                width="50%"/>
                            <label>
                              {getAttrByInpID(instructions.Tumble["Shade"], id_instructionDry, "name")}
                            </label>
                          </span>
                        </div>
                    }

                    {
                      instructions.Tumble["Tumble"] === "tumble_yes" &&
                        <div className="container-care-group">
                          <span className="container-care-img">
                            <CircleImg className="img-care" 
                                iconUrl={getAttrByInpID(instructions.Tumble["Delicate"], id_instructionTumble)} 
                                width="50%"/>
                            <label>
                              {getAttrByInpID(instructions.Tumble["Delicate"], id_instructionTumble, "name")}
                            </label>
                          </span>
                        </div>    
                    }

                    {
                      instructions.Tumble["Tumble"] === "tumble_yes" &&
                      <div className="container-care-group">
                        <span className="container-care-img">
                          <CircleImg className="img-care" 
                              iconUrl={getAttrByInpID(instructions.Tumble["Heat"], id_instructionTumble)} 
                              width="50%"/>
                          <label>
                            {getAttrByInpID(instructions.Tumble["Heat"], id_instructionTumble, "name")}
                          </label>
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
                        iconUrl={getAttrByInpID(instructions.DryC["DryC"], id_instructionDryC)} 
                        width="50%"
                      />
                      <label>
                        {getAttrByInpID(instructions.DryC["DryC"], id_instructionDryC, "name")}
                      </label>
                    </span>
                  </div>

                  {
                    instructions.DryC["DryC"] === "dryC_yes" &&
                    <div className="container-care-group">
                    <span className="container-care-img">
                      <CircleImg className="img-care" 
                          iconUrl={getAttrByInpID(instructions.DryC["Solvent"], id_instructionDryC)} 
                          width="50%"/>
                      <label>
                        {getAttrByInpID(instructions.DryC["Solvent"], id_instructionDryC, "name")}
                      </label>
                    </span>
                  </div>
                  }

                  {
                    instructions.DryC["DryC"] === "dryC_yes" &&
                    <div className="container-care-group">
                    <span className="container-care-img">
                      <CircleImg className="img-care" 
                          iconUrl={getAttrByInpID(instructions.DryC["Care"], id_instructionDryC)} 
                          width="50%"/>
                      <label>
                        {getAttrByInpID(instructions.DryC["Care"], id_instructionDryC, "name")}
                      </label>
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
                          iconUrl={getAttrByInpID(instructions.Iron["Iron"], id_instructionIron)} 
                          width="50%"
                        />
                        <label>
                          {getAttrByInpID(instructions.Iron["Iron"], id_instructionIron, "name")}
                        </label>
                      </span>
                    </div>

                    {
                      instructions.Iron["Iron"] === "iron_yes" &&
                      <div className="container-care-group">
                        <span className="container-care-img">
                          <CircleImg className="img-care" 
                              iconUrl={getAttrByInpID(instructions.Iron["Heat"], id_instructionIron)} 
                              width="50%"/>
                          <label>
                            {getAttrByInpID(instructions.Iron["Heat"], id_instructionIron, "name")}
                          </label>
                        </span>
                      </div>
                    }

                </div>
              </div>
              <br/>

              <label className="container-subtitle-2">Bleaching Instructions</label>
              <div className="container-border">
                <div className="container-care">
                  <div className="container-care-group">
                    <span className="container-care-img">
                      <CircleImg className="img-care" 
                        iconUrl={getAttrByInpID(instructions.Bleach["Bleach"], id_instructionBleach)} 
                        width="50%"
                      />
                      <label>
                        {getAttrByInpID(instructions.Bleach["Bleach"], id_instructionBleach, "name")}
                      </label>
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
