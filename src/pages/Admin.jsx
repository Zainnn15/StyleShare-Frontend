import { useState, useEffect, useContext } from 'react';
import { UserContext } from "../../context/userContext.jsx";
import axios from 'axios';
import ScreenHeader from '../components/common/ScreenHeaderIn.jsx';
import GarmentWearDetails from '../components/Admin-Comp/GarmentWearDetails.jsx';
import GarmentFeelDetails from '../components/Admin-Comp/GarmentFeelDetails.jsx';
import GarmentTearDetails from '../components/Admin-Comp/GarmentTearDetails.jsx';
import GarmentWashDetails from '../components/Admin-Comp/GarmentWashDetails.jsx';
import "../styles/marcus.css"; // We'll define new button styles here

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

  // For adding/removing members
  const [userIdentifier, setUserIdentifier] = useState('');
  const [userIdentifierRemove, setUserIdentifierRemove] = useState('');

  // 1. Fetch all groups on mount
  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/admin/groups`,
          { withCredentials: true }
        );
        setGroups(response.data);
      } catch (error) {
        console.error('Error fetching groups:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGroups();
  }, []);

  // 2. Fetch exchange requests for a group
  const fetchExchangeRequests = async (groupId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/exchange-requests/${groupId}`,
        { withCredentials: true }
      );
      setExchangeRequests(response.data);
    } catch (error) {
      console.error('Error fetching exchange requests:', error);
    } finally {
      setLoading(false);
    }
  };

  // 3. Fetch garments for a group
  const fetchGroupGarments = async (groupId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/group-garments/${groupId}`,
        { withCredentials: true }
      );
      setGroupGarments(response.data);
    } catch (error) {
      console.error('Error fetching group garments:', error);
    } finally {
      setLoading(false);
    }
  };

  // 4. Handle group change
  const handleGroupChange = (event) => {
    const groupId = event.target.value;
    setSelectedGroup(groupId);
    if (groupId) {
      fetchExchangeRequests(groupId);
      fetchGroupGarments(groupId);
    }
  };

  // 5. Switch between tabs
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // 6. Callback from GarmentWearDetails
  const handleWearDetailsLoaded = (wearTime) => {
    setTotalWearTime(wearTime);
  };

  // 7. Download group data as Excel
  const handleDownloadGroupData = async () => {
    if (!selectedGroup) {
      alert('Please select a group to download its data.');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/download-group-data/${selectedGroup}`,
        {
          responseType: 'blob',
          withCredentials: true,
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `group_data_${selectedGroup}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error downloading group data:', error);
    } finally {
      setLoading(false);
    }
  };

  // 8. Admin joins group
  const handleAdminJoinGroup = async () => {
    if (!selectedGroup) {
      alert('Please select a group to join as admin.');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/groups/${selectedGroup}/joinAsAdmin`,
        {},
        { withCredentials: true }
      );
      alert(response.data.message);
    } catch (error) {
      console.error('Error joining group as admin:', error);
      alert('Failed to join group as admin.');
    } finally {
      setLoading(false);
    }
  };

  // 9. Admin leaves group
  const handleAdminLeaveGroup = async () => {
    if (!selectedGroup) {
      alert('Please select a group to leave as admin.');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/groups/${selectedGroup}/leaveAsAdmin`,
        {},
        { withCredentials: true }
      );
      alert(response.data.message);
    } catch (error) {
      console.error('Error leaving group as admin:', error);
      alert('Failed to leave group as admin.');
    } finally {
      setLoading(false);
    }
  };

  // 10. Delete a garment as admin
  const handleDeleteGarment = async (garmentId) => {
    const confirmation = window.confirm("Are you sure?");
    if (!confirmation) return;

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/admin/garments/${garmentId}`,
        { withCredentials: true }
      );
      alert(response.data.message);
      // remove from local state
      setGroupGarments((prev) => prev.filter((g) => g._id !== garmentId));
    } catch (error) {
      if (error.response && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        alert('Failed to delete garment.');
      }
    }
  };

  // *****************************
  // 11. Add Member to Group (Admin)
  // *****************************
  const handleAddMember = async () => {
    if (!selectedGroup) {
      alert('Please select a group first.');
      return;
    }
    if (!userIdentifier) {
      alert('Please enter a user email or user ID to add.');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/groups/${selectedGroup}/addMember`,
        { userIdOrEmail: userIdentifier },
        { withCredentials: true }
      );
      alert(response.data.message);

      // Optionally refetch group data to update the member list
      const updatedGroups = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/groups`,
        { withCredentials: true }
      );
      setGroups(updatedGroups.data);

      setUserIdentifier(''); // clear input
    } catch (error) {
      console.error('Error adding member to group:', error);
      alert(error.response?.data?.error || 'Failed to add member.');
    } finally {
      setLoading(false);
    }
  };

  // *****************************
  // 12. Remove Member from Group (Admin)
  // *****************************
  const handleRemoveMember = async () => {
    if (!selectedGroup) {
      alert('Please select a group first.');
      return;
    }
    if (!userIdentifierRemove) {
      alert('Please enter a user email or user ID to remove.');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/groups/${selectedGroup}/removeMember`,
        { userIdOrEmail: userIdentifierRemove },
        { withCredentials: true }
      );
      alert(response.data.message);

      // Optionally refetch group data
      const updatedGroups = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/groups`,
        { withCredentials: true }
      );
      setGroups(updatedGroups.data);

      setUserIdentifierRemove('');
    } catch (error) {
      console.error('Error removing member from group:', error);
      alert(error.response?.data?.error || 'Failed to remove member.');
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

          {/* Export Data for the selected group */}
          <section className="container-card admin-card m2">
            <h2 className="container-subtitle">Data Export for Selected Group</h2>
            <button
              className="button-regular admin-button"
              onClick={handleDownloadGroupData}
              disabled={loading || !selectedGroup}
            >
              {loading ? 'Generating Excel...' : 'Download Selected Group Data'}
            </button>
          </section>

          {/* Groups and Members */}
          <section className="container-card admin-card m2">
            <h2 className="container-subtitle">Groups and Members</h2>
            {loading && <p>Loading...</p>}
            {!loading && (
              <div className="groups-list">
                <label htmlFor="group-select">Select Group:</label>
                <select
                  id="group-select"
                  className="group-dropdown"
                  value={selectedGroup}
                  onChange={handleGroupChange}
                >
                  <option value="">-- Select a group --</option>
                  {groups.map((group) => (
                    <option key={group._id} value={group._id}>
                      {group.group_name}
                    </option>
                  ))}
                </select>

                {/* Admin can join/leave group */}
                {user && user.isAdmin && selectedGroup && (
                  <div className="admin-actions">
                    <button
                      className="button-admin"
                      onClick={handleAdminJoinGroup}
                      disabled={loading}
                    >
                      Join Group as Admin
                    </button>
                    <button
                      className="button-admin"
                      onClick={handleAdminLeaveGroup}
                      disabled={loading}
                    >
                      Leave Group as Admin
                    </button>
                  </div>
                )}

                {/* Tab Navigation */}
                {selectedGroup && (
                  <>
                    <div className="tab-container">
                      <button
                        className={`tab-button ${
                          activeTab === 'members' ? 'active' : ''
                        }`}
                        onClick={() => handleTabChange('members')}
                      >
                        Group Members
                      </button>
                      <button
                        className={`tab-button ${
                          activeTab === 'exchange' ? 'active' : ''
                        }`}
                        onClick={() => handleTabChange('exchange')}
                      >
                        Exchange Requests
                      </button>
                      <button
                        className={`tab-button ${
                          activeTab === 'garmentWear' ? 'active' : ''
                        }`}
                        onClick={() => handleTabChange('garmentWear')}
                      >
                        Garment Wear Details
                      </button>
                      <button
                        className={`tab-button ${
                          activeTab === 'garmentFeel' ? 'active' : ''
                        }`}
                        onClick={() => handleTabChange('garmentFeel')}
                      >
                        Garment Feel Details
                      </button>
                      <button
                        className={`tab-button ${
                          activeTab === 'garmentTear' ? 'active' : ''
                        }`}
                        onClick={() => handleTabChange('garmentTear')}
                      >
                        Garment Tear Details
                      </button>
                      <button
                        className={`tab-button ${
                          activeTab === 'garmentWash' ? 'active' : ''
                        }`}
                        onClick={() => handleTabChange('garmentWash')}
                      >
                        Garment Wash Details
                      </button>
                      {/* New "Garments" tab */}
                      <button
                        className={`tab-button ${
                          activeTab === 'garments' ? 'active' : ''
                        }`}
                        onClick={() => handleTabChange('garments')}
                      >
                        Garments
                      </button>
                    </div>

                    {/* Tab Content */}
                    <div className="tab-content">
                      {/* 1. Group Members Tab */}
                      {activeTab === 'members' && (
                        <div className="group-members">
                          <h3>Group Members</h3>
                          <ul>
                            {groups
                              .find((g) => g._id === selectedGroup)
                              ?.members.map((member) => (
                                <li key={member._id}>
                                  {member.username}
                                </li>
                              ))}
                          </ul>

                          {/* Add/Remove participants */}
                          <div className="add-remove-user-container">
                            <h4>Add Member</h4>
                            <div className="add-remove-row">
                              <input
                                type="text"
                                placeholder="Enter user email or ID"
                                value={userIdentifier}
                                onChange={(e) => setUserIdentifier(e.target.value)}
                              />
                              <button
                                className="button-add"
                                onClick={handleAddMember}
                                disabled={loading}
                              >
                                Add
                              </button>
                            </div>
                          </div>

                          <div className="add-remove-user-container">
                            <h4>Remove Member</h4>
                            <div className="add-remove-row">
                              <input
                                type="text"
                                placeholder="Enter user email or ID"
                                value={userIdentifierRemove}
                                onChange={(e) =>
                                  setUserIdentifierRemove(e.target.value)
                                }
                              />
                              <button
                                className="button-remove"
                                onClick={handleRemoveMember}
                                disabled={loading}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 2. Exchange Requests Tab */}
                      {activeTab === 'exchange' && (
                        <div className="exchange-requests">
                          <h3>Exchange Requests for Selected Group</h3>
                          {exchangeRequests.length > 0 ? (
                            exchangeRequests.map((request) => (
                              <div className="exchange-card" key={request._id}>
                                <div className="exchange-header">
                                  <span className="exchange-field">
                                    <strong>Sender:</strong>{' '}
                                    {request.senderId?.username ||
                                      request.senderId?.email ||
                                      'N/A'}
                                  </span>
                                  <span className="exchange-field">
                                    <strong>Recipient:</strong>{' '}
                                    {request.recipientId?.username ||
                                      request.recipientId?.email ||
                                      'N/A'}
                                  </span>
                                </div>
                                <div className="exchange-body">
                                  <div className="exchange-field">
                                    <strong>User Garment:</strong>{' '}
                                    {request.userGarmentId
                                      ? request.userGarmentId.garmentDescription
                                      : 'N/A'}
                                  </div>
                                  <div className="exchange-field">
                                    <strong>Recipient Garment:</strong>{' '}
                                    {request.recipientGarmentId
                                      ? request.recipientGarmentId.garmentDescription
                                      : 'N/A'}
                                  </div>
                                  <div className="exchange-field">
                                    <strong>Pickup Date:</strong>{' '}
                                    {request.pickupDate}
                                  </div>
                                  <div className="exchange-field">
                                    <strong>Pickup Time:</strong>{' '}
                                    {request.pickupTime}
                                  </div>
                                  <div className="exchange-field">
                                    <strong>Pickup Location:</strong>{' '}
                                    {request.pickupLocation}
                                  </div>
                                  <div
                                    className={`exchange-status ${request.status.toLowerCase()}`}
                                  >
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

                      {/* 3. Garment Wear Details Tab */}
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
                            {groupGarments.map((garment) => (
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

                      {/* 4. Garment Feel Details Tab */}
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
                            {groupGarments.map((garment) => (
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

                      {/* 5. Garment Tear Details Tab */}
                      {activeTab === 'garmentTear' && (
                        <div className="garment-tear-details">
                          <h3>Garment Tear Details</h3>
                          <label htmlFor="garment-select">Select Garment:</label>
                          <select
                            id="garment-select"
                            className="garment-dropdown"
                            value={garmentId}
                            onChange={(e) => setGarmentId(e.target.value)}
                          >
                            <option value="">-- Select a garment --</option>
                            {groupGarments.map((garment) => (
                              <option key={garment._id} value={garment._id}>
                                {garment.garmentDescription || 'No Description'}
                              </option>
                            ))}
                          </select>

                          {garmentId && (
                            <div className="tear-details-container">
                              <GarmentTearDetails
                                garmentId={garmentId}
                                groupId={selectedGroup}
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {/* 6. Garment Wash Details Tab */}
                      {activeTab === 'garmentWash' && (
                        <div className="garment-wash-details">
                          <h3>Garment Wash Details</h3>
                          <label htmlFor="garment-select">Select Garment:</label>
                          <select
                            id="garment-select"
                            className="garment-dropdown"
                            value={garmentId}
                            onChange={(e) => setGarmentId(e.target.value)}
                          >
                            <option value="">-- Select a garment --</option>
                            {groupGarments.map((garment) => (
                              <option key={garment._id} value={garment._id}>
                                {garment.garmentDescription || 'No Description'}
                              </option>
                            ))}
                          </select>

                          {garmentId && (
                            <div className="wash-details-container">
                              <GarmentWashDetails
                                garmentId={garmentId}
                                groupId={selectedGroup}
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {/* 7. Garments Tab */}
                      {activeTab === 'garments' && (
                        <div className="garments-list">
                          <h3>All Garments in This Group</h3>
                          {groupGarments.length === 0 && <p>No garments found.</p>}
                          {groupGarments.map((garment) => {
                            const wearCount = garment.wearInfo?.length || 0;
                            const feelCount = garment.garmentFeels?.length || 0;
                            const tearCount = garment.tearInfo?.length || 0;
                            const washCount = garment.washCareInstructions?.length || 0;

                            return (
                              <div key={garment._id} className="garment-card">
                                <p>
                                  <strong>
                                    {garment.garmentDescription || 'No Description'}
                                  </strong>
                                </p>
                                <p>Owner: {garment?.originalOwner?.username || 'N/A'}</p>

                                <div className="garment-usage">
                                  <p><strong>Wear Entries:</strong> {wearCount}</p>
                                  <p><strong>Feel Entries:</strong> {feelCount}</p>
                                  <p><strong>Tear Entries:</strong> {tearCount}</p>
                                  <p><strong>Wash Entries:</strong> {washCount}</p>
                                </div>

                                <button
                                  className="button-reject"
                                  disabled={loading}
                                  onClick={() => handleDeleteGarment(garment._id)}
                                >
                                  Delete Garment
                                </button>
                              </div>
                            );
                          })}
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
