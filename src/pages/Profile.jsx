import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { GarmentContext } from "../../context/garmentContext";
import Axios from "axios";

import '../styles/main.scss';

import ScreenHeaderIn from "../components/common/ScreenHeaderIn";
import { weekDays } from "../constants/data/lists";
import { addErrorMessageByID } from "../constants/functions/inputHandlers";


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
        <hr/>
        <div>
          {garment && garment.purchaseLocation}
        </div>
      </div>
    </div>
  )

}
