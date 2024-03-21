import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { GarmentContext } from "../../context/garmentContext";
import { GroupContext } from "../../context/groupContext";
import Axios from "axios";

import '../styles/main.scss';

import ScreenHeaderIn from "../components/common/ScreenHeaderIn";
import General from "../components/profile/Garment_general";
import Composition from "../components/profile/Garment_composition";
import Care from "../components/profile/Garment_care";
import Measure from "../components/profile/Garment_measure";

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
    const [tabPage, setTabPage] = useState(0);
    const [selectedCampus, setSelectedCampus] = useState('');
const [customCampus, setCustomCampus] = useState('');

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

    const handleCampusChange = (event) => {
      // Convert the HTMLOptionsCollection into an array and filter selected options
      const selectedOptions = Array.from(event.target.options).filter(option => option.selected);
      // Map over selected options to create an array of values
      const selectedValues = selectedOptions.map(option => option.value);
      setSelectedCampus(selectedValues);
  };

  const handleUpdateProfile = async () => {
    // Validation logic...

    // Preparing the payload for the backend
    const payload = {
        userId: user.id,
        selectedDays,
        selectedTimes: selectedTimes.filter(t => t.start && t.end),
        campuses: selectedCampus.includes('Other') ? selectedCampus.filter(c => c !== 'Other') : selectedCampus,
        customCampus: selectedCampus.includes('Other') ? customCampus : '',
    };

    try {
        const response = await Axios.post('/updateProfile', payload);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
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

    console.log(garment);

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
                {/* Campus Selection */}
                {editMode && (
                <div className="container-input">
                    <label htmlFor="campuses">Campus:</label>
                    <select multiple id="campuses" value={selectedCampus} onChange={handleCampusChange} className="form-control">
                        <option value="Newham">Newham</option>
                        <option value="York">York</option>
                        <option value="King">King</option>
                        <option value="Other">Other</option>
                    </select>
                    {selectedCampus.includes('Other') && (
                        <input
                            type="text"
                            placeholder="Specify your location"
                            value={customCampus}
                            onChange={e => setCustomCampus(e.target.value)}
                            className="form-control mt-2"
                        />
                    )}
                </div>
            )}
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
              <p className="text-purpleLight">Wear & Tear</p>
            </div>
          </div>

          {
            tabPage === 0 &&
            garment && (
              <General garment={garment}/>
            )
          }

          {
            tabPage === 1 &&
            garment && (
              <Measure garment={garment}/>
            )
          }

          {
            tabPage === 2 &&
            garment && (
              <Composition garment={garment}/>
            )
          }

          {
            tabPage === 3 &&
            garment && (
              <Care garment={garment}/>
            )
          }

          {
            tabPage === 4 &&
            garment && (
              <div className="m1">
                <label className="container-subtitle-2">Wear</label>
                <div className="container-border">
                </div>
                <br/>

                <label className="container-subtitle-2">Wash</label>
                <div className="container-border">
                </div>
                <br/>

                <label className="container-subtitle-2">Tear</label>
                <div className="container-border">
                </div>
                <br/>

              </div>
            )
          }

        </div>
        
      </div>
    </div>
  )

}
