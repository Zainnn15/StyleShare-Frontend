import { useState, useEffect, useContext } from 'react';
import { UserContext } from "../../context/userContext.jsx";
import axios from 'axios';
import ScreenHeader from '../components/common/ScreenHeaderIn.jsx';
import GarmentWearDetails from '../components/Admin-Comp/GarmentWearDetails.jsx';
import GarmentFeelDetails from '../components/Admin-Comp/GarmentFeelDetails.jsx'; // New component for garment feel
import "../styles/marcus.css";

const Admin = () => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [garmentId, setGarmentId] = useState('');
  const [groupGarments, setGroupGarments] = useState([]);
  const [exchangeRequests, setExchangeRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('members');
  const [totalWearTime, setTotalWearTime] = useState(0);

  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/groups`, {
          withCredentials: true,
        });
        setGroups(response.data);
      } catch (error) {
        console.error('Error fetching groups:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGroups();
  }, []);

  const fetchExchangeRequests = async (groupId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/exchange-requests/${groupId}`, {
        withCredentials: true,
      });
      setExchangeRequests(response.data);
    } catch (error) {
      console.error('Error fetching exchange requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchGroupGarments = async (groupId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/group-garments/${groupId}`, {
        withCredentials: true,
      });
      setGroupGarments(response.data);
    } catch (error) {
      console.error('Error fetching group garments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGroupChange = (event) => {
    const groupId = event.target.value;
    setSelectedGroup(groupId);
    if (groupId) {
      fetchExchangeRequests(groupId);
      fetchGroupGarments(groupId);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleWearDetailsLoaded = (wearTime) => {
    setTotalWearTime(wearTime); 
  };

  const handleDownload = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/download-garment-data`, {
        responseType: 'blob',
        withCredentials: true,
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'garment_data.xlsx');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error downloading data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ScreenHeader title="Admin Dashboard" />
      <div className="container admin-page">
        <div className="admin-content">
          <h1 className="container-title">Admin Dashboard</h1>
          <section className="container-card admin-card m2">
            <h2 className="container-subtitle">Data Export</h2>
            <button
              className="button-regular admin-button"
              onClick={handleDownload}
              disabled={loading}
            >
              {loading ? 'Generating Excel...' : 'Download Garment Data'}
            </button>
          </section>

          <section className="container-card admin-card m2">
            <h2 className="container-subtitle">Groups and Members</h2>
            {loading ? (
              <p>Loading groups...</p>
            ) : (
              <div className="groups-list">
                <label htmlFor="group-select">Select Group:</label>
                <select
                  id="group-select"
                  className="group-dropdown"
                  value={selectedGroup}
                  onChange={handleGroupChange}
                >
                  <option value="">-- Select a group --</option>
                  {groups.map(group => (
                    <option key={group._id} value={group._id}>
                      {group.group_name}
                    </option>
                  ))}
                </select>

                {selectedGroup && (
                  <>
                    <div className="tab-container">
                      <button
                        className={`tab-button ${activeTab === 'members' ? 'active' : ''}`}
                        onClick={() => handleTabChange('members')}
                      >
                        Group Members
                      </button>
                      <button
                        className={`tab-button ${activeTab === 'exchange' ? 'active' : ''}`}
                        onClick={() => handleTabChange('exchange')}
                      >
                        Exchange Requests
                      </button>
                      <button
                        className={`tab-button ${activeTab === 'garmentWear' ? 'active' : ''}`}
                        onClick={() => handleTabChange('garmentWear')}
                      >
                        Garment Wear Details
                      </button>
                      <button
                        className={`tab-button ${activeTab === 'garmentFeel' ? 'active' : ''}`}
                        onClick={() => handleTabChange('garmentFeel')}
                      >
                        Garment Feel Details
                      </button>
                    </div>

                    <div className="tab-content">
                      {activeTab === 'members' && (
                        <div className="group-members">
                          <h3>Group Members</h3>
                          <ul>
                            {groups
                              .find(group => group._id === selectedGroup)
                              ?.members.map(member => (
                                <li key={member._id}>{member.username}</li>
                              ))}
                          </ul>
                        </div>
                      )}

                      {activeTab === 'exchange' && (
                        <div className="exchange-requests">
                          <h3>Exchange Requests for Selected Group</h3>
                          {exchangeRequests.length > 0 ? (
                            exchangeRequests.map(request => (
                              <div className="exchange-card" key={request._id}>
                                <div className="exchange-header">
                                  <span className="exchange-field">
                                    <strong>Sender:</strong> {request.senderId?.username || request.senderId?.email || 'N/A'}
                                  </span>
                                  <span className="exchange-field">
                                    <strong>Recipient:</strong> {request.recipientId?.username || request.recipientId?.email || 'N/A'}
                                  </span>
                                </div>
                                <div className="exchange-body">
                                  <div className="exchange-field">
                                    <strong>User Garment:</strong> {request.userGarmentId ? request.userGarmentId.garmentDescription : 'N/A'}
                                  </div>
                                  <div className="exchange-field">
                                    <strong>Recipient Garment:</strong> {request.recipientGarmentId ? request.recipientGarmentId.garmentDescription : 'N/A'}
                                  </div>
                                  <div className="exchange-field">
                                    <strong>Pickup Date:</strong> {request.pickupDate}
                                  </div>
                                  <div className="exchange-field">
                                    <strong>Pickup Time:</strong> {request.pickupTime}
                                  </div>
                                  <div className="exchange-field">
                                    <strong>Pickup Location:</strong> {request.pickupLocation}
                                  </div>
                                  <div className={`exchange-status ${request.status.toLowerCase()}`}>
                                    <strong>Status:</strong> {request.status}
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p>No exchange requests found for this group.</p>
                          )}
                        </div>
                      )}

                      {activeTab === 'garmentWear' && (
                        <div className="garment-wear-details">
                          <h3>Garment Wear Details</h3>
                          <label htmlFor="garment-select">Select Garment:</label>
                          <select
                            id="garment-select"
                            className="garment-dropdown"
                            value={garmentId}
                            onChange={(e) => setGarmentId(e.target.value)}
                          >
                            <option value="">-- Select a garment --</option>
                            {groupGarments.map(garment => (
                              <option key={garment._id} value={garment._id}>
                                {garment.garmentDescription || 'No Description'}
                              </option>
                            ))}
                          </select>

                          {garmentId && (
                            <div className="wear-details-container">
                                                            <GarmentWearDetails 
                                garmentId={garmentId} 
                                groupId={selectedGroup} 
                                onWearDetailsLoaded={handleWearDetailsLoaded} 
                              />
                              <div className="total-wear-time">
                                <strong>Total Wear Time for Garment: </strong>
                                {totalWearTime} hours
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {activeTab === 'garmentFeel' && (
                        <div className="garment-feel-details">
                          <h3>Garment Feel Details</h3>
                          <label htmlFor="garment-select">Select Garment:</label>
                          <select
                            id="garment-select"
                            className="garment-dropdown"
                            value={garmentId}
                            onChange={(e) => setGarmentId(e.target.value)}
                          >
                            <option value="">-- Select a garment --</option>
                            {groupGarments.map(garment => (
                              <option key={garment._id} value={garment._id}>
                                {garment.garmentDescription || 'No Description'}
                              </option>
                            ))}
                          </select>

                          {garmentId && (
                            <div className="feel-details-container">
                              <GarmentFeelDetails 
                                garmentId={garmentId} 
                                groupId={selectedGroup}
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Admin;
