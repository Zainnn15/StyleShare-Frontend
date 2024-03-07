import NavbarIn from "../components/NavbarIn";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { GarmentContext } from "../../context/garmentContext";
import Axios from "axios";


export default function Profile() {
    const {user} = useContext(UserContext);
    const [profile, setProfile] = useState(null);
    const [selectedDays, setSelectedDays] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const {garment} = useContext(GarmentContext);
    const [garmentDetails, setGarmentDetails] = useState(null);

    const handleCheckboxChange = (day) => {
        if (selectedDays.includes(day)) {
          setSelectedDays(selectedDays.filter((selectedDay) => selectedDay !== day));
        } else {
          setSelectedDays([...selectedDays, day]);
        }
      };

      const handleUpdateProfile = () => {
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
    


  return (
    
    <div>
    <NavbarIn />
    <h1>Profile</h1>
    <h2>Welcome, {user.name}</h2>
   
        <div className="popup">
          <h2>User Details</h2>
          <p>Name: {user.name}</p>
            <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Days going to Seneca: {selectedDays.join(", ")}</p>
        </div>
 

     {/* Button to toggle edit mode */}
     <button onClick={() => setEditMode(!editMode)}>
        {editMode ? "Cancel" : "Change Seneca Days"}
      </button>

    {/* Section to select days */}
    {editMode && (
    <div>
      <h3>Select your available days:</h3>
      <label>
        <input
          type="checkbox"
          value="Monday"
          checked={selectedDays.includes('Monday')}
          onChange={() => handleCheckboxChange('Monday')}
        />
        Monday
      </label>
      <label>
        <input
          type="checkbox"
          value="Tuesday"
          checked={selectedDays.includes('Tuesday')}
          onChange={() => handleCheckboxChange('Tuesday')}
        />
        Tuesday
      </label>
      <label>
        <input
          type="checkbox"
          value="wednesday"
          checked={selectedDays.includes('wednesday')}
          onChange={() => handleCheckboxChange('wednesday')}
        />
        wednesday
      </label>
      <label>
        <input
          type="checkbox"
          value="Thursday"
          checked={selectedDays.includes('Thursday')}
          onChange={() => handleCheckboxChange('Thursday')}
        />
        Thursday
      </label>
      <label>
        <input
          type="checkbox"
          value="Friday"
          checked={selectedDays.includes('Friday')}
          onChange={() => handleCheckboxChange('Friday')}
        />
        Friday
      </label>
      <button onClick={handleUpdateProfile}>Save</button>
    </div>
     )}
       <hr /> {/* Horizontal line */}
          <div>
            <p>Purchase Location: {garment.purchaseLocation}</p>
            <p>Purchase Method: {garment.purchaseMethod}</p>
            {/* Add more details based on your garment schema */}
          </div>
  </div>
  )

}
