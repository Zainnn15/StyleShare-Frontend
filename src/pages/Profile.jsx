import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/userContext';
import { GroupContext } from '../../context/groupContext';
import Axios from 'axios';
import Modal from 'react-modal';
import { toast, Toaster } from 'react-hot-toast';
import '../styles/main.scss';
import ScreenHeaderIn from '../components/common/ScreenHeaderIn';
import General from '../components/profile/Garment_general';
import Composition from '../components/profile/Garment_composition';
import Care from '../components/profile/Garment_care';
import Measure from '../components/profile/Garment_measure';
import Wear from '../components/profile/Garment_wear';
import Wash from '../components/profile/Garment_wash';
import Tear from '../components/profile/Garment_tear';
import Feel from '../components/profile/Garment_feel';
import TrashIcon from '../assets/icons/trash.png';
import '../styles/marcus.css';
import {
  formatDate,
  getImageFromURL,
} from '../constants/functions/valueHandlers';
import defaultProfile from '../assets/images/profile_default.jpg';
import { clickID } from '../constants/functions/inputHandlers';

export default function Profile() {
  const { user, loading: userLoading } = useContext(UserContext);
  const { userGroups } = useContext(GroupContext);
  const [profile, setProfile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [newSchedule, setNewSchedule] = useState({
    day: '',
    start: '',
    end: '',
    location: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [garment, setGarment] = useState(null);
  const [garmentList, setGarmentList] = useState([]);
  const [tabPage, setTabPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [garmentToDelete, setGarmentToDelete] = useState(null);
  const [marketplaceGarments, setMarketplaceGarments] = useState([]); // Add this state

  const weekDays = [
    { value: 0, label: 'Sunday', short: 'Sun' },
    { value: 1, label: 'Monday', short: 'Mon' },
    { value: 2, label: 'Tuesday', short: 'Tue' },
    { value: 3, label: 'Wednesday', short: 'Wed' },
    { value: 4, label: 'Thursday', short: 'Thu' },
    { value: 5, label: 'Friday', short: 'Fri' },
    { value: 6, label: 'Saturday', short: 'Sat' },
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

  const handleNewScheduleChange = (e) => {
    const { name, value } = e.target;
    setNewSchedule((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addSchedule = async (e) => {
    e.preventDefault();

    if (!newSchedule.day || !newSchedule.start || !newSchedule.end || !newSchedule.location) {
      toast.error('Please fill in all fields');
      return;
    }

    if (newSchedule.location === 'Other' && !newSchedule.customCampus) {
      toast.error('Please fill in all fields');
      return;
    }

    if (newSchedule.location === 'Other') {
      newSchedule.location = newSchedule.customCampus;
    }

    const newAvailability = [...availability, newSchedule];

    try {
      const availabilityResult = await Axios.patch(
        `/updateAvailability/${user._id}`,
        { availability: newAvailability },
        { withCredentials: true },
      );
      setAvailability(availabilityResult.data.availability);
      toast.success('Availability added');
    } catch (error) {
      console.error('Error updating availability:', error);
      toast.error('Failed to update availability');
    }

    setNewSchedule({
      day: '',
      start: '',
      end: '',
      location: '',
      customCampus: '',
    });
  };

  const deleteSchedule = async (e, id) => {
    e.preventDefault();

    const newAvailability = availability.filter(
      (schedule) => schedule._id !== id,
    );

    try {
      const availabilityResult = await Axios.patch(
        `/updateAvailability/${user._id}`,
        { availability: newAvailability },
        { withCredentials: true },
      );
      setAvailability(availabilityResult.data.availability);
      toast.success('Availability deleted');
    } catch (error) {
      console.error('Error updating availability:', error);
      toast.error('Failed to update availability');
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('userId', user._id);
    formData.append('availability', JSON.stringify(availability));

    if (selectedImage) {
      formData.append('profilePicture', selectedImage);
      setIsModalOpen(false);
    }

    try {
      const response = await Axios.post('/updateProfile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      console.log('Profile updated:', response.data);
      toast.success(
        'Profile updated successfully, please refresh the page to see changes',
      );
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  useEffect(() => {
    if (user && user._id) {
      setAvailability(user.availability || []);
      Axios.get(`/profile/${user._id}`, { withCredentials: true })
        .then((response) => {
          const data = response.data;
          setProfile(data);
          setAvailability(data.availability || []);
          setSelectedImage(data.profilePicture);
        })
        .catch((error) => console.error('Error fetching user profile:', error));
    }
  }, [user, userLoading]);

  useEffect(() => {
    if (user && user._id) {
      Axios.get(`/profile/${user._id}`, { withCredentials: true })
        .then((response) => {
          const data = response.data;
          setProfile(data);
          setAvailability(data.availability || []);
          setSelectedImage(data.profilePicture);
        })
        .catch((error) => console.error('Error fetching user profile:', error));

      Axios.get(`/getGarmentDetails/${user._id}`, { withCredentials: true })
        .then((response) => {
          const garmentData = response.data;
          console.log('Garment Details:', garmentData);
          if (Array.isArray(garmentData) && garmentData.length > 0) {
            setGarmentList(garmentData);
            setGarment(garmentData[0]);
          } else {
            setGarmentList([]);
            setGarment(null);
          }
        })
        .catch((error) => console.error('Error fetching garment details:', error));

      // Fetch garments originally owned by the user but now with other users
      Axios.get(`/getGarmentsNotOwnedByUser/${user._id}`, { withCredentials: true })
        .then((response) => {
          const data = response.data;
          setMarketplaceGarments(data);
        })
        .catch((error) => console.error('Error fetching marketplace garments:', error));
    }
  }, [user, userLoading]);

  const handleFileChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleDeleteGarment = async () => {
    try {
      const response = await Axios.delete(`/deleteGarment/${garmentToDelete}`, {
        data: { userId: user._id },
        withCredentials: true,
      });
      console.log('Garment deleted:', response.data);
      const updatedGarmentList = garmentList.filter(
        (g) => g._id !== garmentToDelete,
      );
      setGarmentList(updatedGarmentList);
      if (updatedGarmentList.length > 0) {
        setGarment(updatedGarmentList[0]);
      } else {
        setGarment(null);
      }
      closeDeleteModal();
      toast.success('Garment deleted successfully');
    } catch (error) {
      console.error('Error deleting garment:', error);
      toast.error('Failed to delete garment');
    }
  };

  const openDeleteModal = (garmentId) => {
    setGarmentToDelete(garmentId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setGarmentToDelete(null);
  };

  if (userLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user or garment data available.</div>;
  }

  function handleChangeSchedule() {
    setEditMode(!editMode);
  }

  const garmentImageStyle = {
    width: '150px', // Set a fixed width
    height: '150px', // Set a fixed height
    objectFit: 'cover', // Ensures the image covers the area without distortion
  };

  return (
    <div>
      <Toaster />
      <ScreenHeaderIn />
      <div className="container main">
        <div>
          <label className="container-title">Profile</label>
          <hr />
        </div>
        <div className="container-row space-evenly wrap container-border greeting">
          <div
            className="container-profile-img clickable"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <img
              src={
                user.profilePicture
                  ? getImageFromURL(user.profilePicture)
                  : defaultProfile
              }
              alt="profile"
            />
          </div>
          <h3>Welcome, {user.username}</h3>
        </div>
        <hr />
        <div className="container-content popup">
          <h3>User Details</h3>
          <hr />
          <br />
          <div className="container-grid-2-md gap">
            <div className="container-border clear-box">
              <p>
                <label className="text-b">
                  Name:<label className="tab"></label>
                </label>
                {user.name}
              </p>
              <p>
                <label className="text-b">
                  Username:<label className="tab"></label>
                </label>
                {user.username}
              </p>
              <p>
                <label className="text-b">
                  Email:<label className="tab"></label>
                </label>
                {user.email}
              </p>
              <p>
                <label className="text-b">
                  Group:<label className="tab"></label>
                </label>
                {userGroups && <label>{userGroups.group_name}</label>}
                {!userGroups && <label>N/A</label>}
              </p>
            </div>
            <div className="container-border clear-box">
              <p>
                {availability.length > 0 ? (
                  <>Availability:</>
                ) : (
                  <>No Availability for user</>
                )}
              </p>
              <div id="user_schedule">
                <ul>
                  {availability.length > 0 &&
                    availability.map((schedule) => (
                      <li key={schedule._id}>
                        <label>
                          {dayMapping[schedule.day]}: {schedule.start} - {schedule.end} at {schedule.location}
                        </label>

                        <button
                          className="button-delete"
                          onClick={async (e) => deleteSchedule(e, schedule._id)}
                        >
                          <img src={TrashIcon} alt="Remove schedule" />
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="container-content">
          <button
            className={editMode ? 'button-cancel' : 'button-regular'}
            onClick={handleChangeSchedule}
          >
            {editMode ? 'Close' : 'Add Available Time and Place'}
          </button>
        </div>

        {editMode && (
          <div>
            <div className="container-prompt">
              <p>Add a new available schedule</p>
            </div>
            <div id={'timeRange_error'} style={{ textAlign: 'center' }}></div>
            <div className="container-input">
              <label>Day:</label>
              <select
                name="day"
                value={newSchedule.day}
                onChange={handleNewScheduleChange}
                className="form-control mb-sm"
              >
                <option value="">Select Day</option>
                {weekDays.map((day) => (
                  <option key={day.value} value={day.value}>
                    {day.label}
                  </option>
                ))}
              </select>
              <label>Start Time:</label>
              <input
                type="time"
                name="start"
                value={newSchedule.start}
                onChange={handleNewScheduleChange}
                className="form-control"
              />
              <label>End Time:</label>
              <input
                type="time"
                name="end"
                value={newSchedule.end}
                onChange={handleNewScheduleChange}
                className="form-control"
              />
              <label className="">Campus:</label>
              <select
                name="location"
                value={newSchedule.location}
                onChange={handleNewScheduleChange}
                className="form-control mb-sm mt-sm"
              >
                <option value="">Select a Campus or other location</option>
                <option value="Newham">Newham</option>
                <option value="York">York</option>
                <option value="King">King</option>
                <option value="Markham">Markham</option>
                <option value="Other">Other</option>
              </select>
              {newSchedule.location === 'Other' && (
                <input
                  type="text"
                  name="customCampus"
                  placeholder="Specify your location"
                  value={newSchedule.customCampus}
                  onChange={handleNewScheduleChange}
                  className="form-control mt-2 mb-sm"
                />
              )}
              <button className="button-regular" onClick={addSchedule}>
                Add Schedule
              </button>
            </div>
          </div>
        )}
        <br />

        <hr />
        <div className="container-content popup">
          <h3>Garment Details</h3>
          <hr />
        </div>
        {garmentList.length > 0 ? (
          <>
            <div>
              <p className="container-subtitle-2">Selected Garment</p>
              <select
                value={garmentList.findIndex((g) => g._id === garment?._id)}
                onChange={(e) => {
                  const selectedGarment = garmentList[e.target.value];
                  setGarment(selectedGarment);
                }}
              >
                {garmentList.map((garmentOpt, index) => {
                  return (
                    <option key={'garmentOpt_' + index} value={index}>
                      {garmentOpt.garmentDescription} (
                      {formatDate(garmentOpt.purchaseDate)})
                    </option>
                  );
                })}
              </select>
            </div>
            <br />
            <div className="container-border page-tab">
              <div className="container-tab">
                <div
                  id="tab0"
                  className="container-tab-group active"
                  onClick={() => {
                    let e_active = document.getElementById(`tab${tabPage}`);
                    if (e_active) {
                      e_active.classList.toggle('active', false);
                    }
                    setTabPage(0);
                    let e_div = document.getElementById(`tab0`);
                    if (e_div) {
                      e_div.classList.toggle('active', true);
                    }
                  }}
                >
                  <p className="text-purpleLight">General</p>
                </div>
                <div
                  id="tab1"
                  className="container-tab-group"
                  onClick={() => {
                    let e_active = document.getElementById(`tab1`);
                    if (e_active) {
                      e_active.classList.toggle('active', false);
                    }
                    setTabPage(1);
                    let e_div = document.getElementById(`tab1`);
                    if (e_div) {
                      e_div.classList.toggle('active', true);
                    }
                  }}
                >
                  <p className="text-purpleLight">Measurements</p>
                </div>
                <div
                  id="tab2"
                  className="container-tab-group"
                  onClick={() => {
                    let e_active = document.getElementById(`tab${tabPage}`);
                    if (e_active) {
                      e_active.classList.toggle('active', false);
                    }
                    setTabPage(2);
                    let e_div = document.getElementById(`tab2`);
                    if (e_div) {
                      e_div.classList.toggle('active', true);
                    }
                  }}
                >
                  <p className="text-purpleLight">Composition</p>
                </div>
                <div
                  id="tab3"
                  className="container-tab-group"
                  onClick={() => {
                    let e_active = document.getElementById(`tab${tabPage}`);
                    if (e_active) {
                      e_active.classList.toggle('active', false);
                    }
                    setTabPage(3);
                    let e_div = document.getElementById(`tab3`);
                    if (e_div) {
                      e_div.classList.toggle('active', true);
                    }
                  }}
                >
                  <p className="text-purpleLight">Care Instructions</p>
                </div>
                <div
                  id="tab4"
                  className="container-tab-group"
                  onClick={() => {
                    let e_active = document.getElementById(`tab${tabPage}`);
                    if (e_active) {
                      e_active.classList.toggle('active', false);
                    }
                    setTabPage(4);
                    let e_div = document.getElementById(`tab4`);
                    if (e_div) {
                      e_div.classList.toggle('active', true);
                    }
                  }}
                >
                  <p className="text-purpleLight">Wear</p>
                </div>
                <div
                  id="tab7"
                  className="container-tab-group"
                  onClick={() => {
                    let e_active = document.getElementById(`tab${tabPage}`);
                    if (e_active) {
                      e_active.classList.toggle('active', false);
                    }
                    setTabPage(7);
                    let e_div = document.getElementById(`tab7`);
                    if (e_div) {
                      e_div.classList.toggle('active', true);
                    }
                  }}
                >
                  <p className="text-purpleLight">Feel</p>
                </div>
                <div
                  id="tab5"
                  className="container-tab-group"
                  onClick={() => {
                    let e_active = document.getElementById(`tab${tabPage}`);
                    if (e_active) {
                      e_active.classList.toggle('active', false);
                    }
                    setTabPage(5);
                    let e_div = document.getElementById(`tab5`);
                    if (e_div) {
                      e_div.classList.toggle('active', true);
                    }
                  }}
                >
                  <p className="text-purpleLight">Care</p>
                </div>
                <div
                  id="tab6"
                  className="container-tab-group"
                  onClick={() => {
                    let e_active = document.getElementById(`tab${tabPage}`);
                    if (e_active) {
                      e_active.classList.toggle('active', false);
                    }
                    setTabPage(6);
                    let e_div = document.getElementById(`tab6`);
                    if (e_div) {
                      e_div.classList.toggle('active', true);
                    }
                  }}
                >
                  <p className="text-purpleLight">Tear</p>
                </div>
                
              </div>

              {tabPage === 0 && garment && <General garment={garment} />}

              {tabPage === 1 && garment && garment.garmentSize && (
                <Measure garment={garment} />
              )}

              {tabPage === 2 && garment && <Composition garment={garment} />}

              {tabPage === 3 && garment && <Care garment={garment} />}

              {tabPage === 4 &&
                garment &&
                garment.wearInfo &&
                garment.wearInfo.length > 0 && <Wear garment={garment} />}

              {tabPage === 5 &&
                garment &&
                garment.washCareInstructions &&
                garment.washCareInstructions.length > 0 && (
                  <Wash garment={garment} />
                )}

              {tabPage === 6 &&
                garment &&
                garment.tearInfo &&
                garment.tearInfo.length > 0 && <Tear garment={garment} />}

              {tabPage === 7 &&
                garment &&
                garment.garmentFeels &&
                garment.garmentFeels.length > 0 && <Feel garment={garment} />}
            </div>
            <div className="container-content">
              {garment.user === user._id && (
                <button
                  className="button-regular"
                  onClick={() => openDeleteModal(garment._id)}
                >
                  Delete Selected Garment
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="container-content">
            <p>
              You have no garments. Please add a garment to see the details
              here.
            </p>
          </div>
        )}

        <hr />
        <div className="container-content popup">
          <h3>Garments with Other Users</h3>
          <hr />
          <div className="container-grid-2-md gap">
            {marketplaceGarments.length > 0 ? (
              marketplaceGarments.map((garment) => (
                <div key={garment._id} className="container-border clear-box">
                  <img
                    src={garment.fileFront}
                    alt="garment front"
                    className="garment-image"
                    style={garmentImageStyle}
                  />
                  <p>
                    <strong>Description:</strong> {garment.garmentDescription}
                  </p>
                  <p>
                    <strong>Current User:</strong> {garment.user.username}
                  </p>
                </div>
              ))
            ) : (
              <p>No garments are currently held by other users.</p>
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Profile Picture Upload"
        style={{
          content: {
            top: '20%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, 0)',
            backgroundColor: '#F8E7E7',
            maxHeight: '65%',
          },
        }}
      >
        <h3>Upload Profile Picture</h3>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="container-col">
            <div
              className="container-profile-img clickable"
              onClick={() => {
                clickID('uploadProfile');
              }}
            >
              <img
                src={
                  selectedImage
                    ? URL.createObjectURL(selectedImage)
                    : defaultProfile
                }
                alt="profile"
              />
            </div>
            <div>
              <label>
                <strong>Upload Photo: </strong>
              </label>
              <br />
              <br />
              <input
                id="uploadProfile"
                type="file"
                name="profilePicture"
                onChange={handleFileChange}
                style={{ width: '80%' }}
              />
            </div>
          </div>
          <br />
          <button className="button-regular full" onClick={handleUpdateProfile}>
            Submit
          </button>
        </form>
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        contentLabel="Delete Garment Confirmation"
        style={{
          content: {
            top: '20%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, 0)',
            backgroundColor: '#F8E7E7',
            maxHeight: '65%',
          },
        }}
      >
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete this garment?</p>
        <div className="container-row">
          <button className="button-regular" onClick={handleDeleteGarment}>
            Yes
          </button>
          <button className="button-cancel" onClick={closeDeleteModal}>
            No
          </button>
        </div>
      </Modal>
    </div>
  );
}
