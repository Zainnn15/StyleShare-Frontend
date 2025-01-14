import { useState, useEffect, useContext } from 'react';
import { UserContext } from "../../context/userContext.jsx";
import axios from 'axios';
import ScreenHeader from '../components/common/ScreenHeaderIn.jsx';
import GarmentWearDetails from '../components/Admin-Comp/GarmentWearDetails.jsx';
import GarmentFeelDetails from '../components/Admin-Comp/GarmentFeelDetails.jsx';
import GarmentTearDetails from '../components/Admin-Comp/GarmentTearDetails.jsx';
import GarmentWashDetails from '../components/Admin-Comp/GarmentWashDetails.jsx';
import "../styles/marcus.css"; // We'll define new styles here if needed

// Helper to approximate creation date from MongoDB ObjectID
function getCreatedAtFromObjectId(objectId) {
  if (!objectId) return new Date(0);
  const timestampHex = objectId.toString().substring(0, 8);
  const timestamp = parseInt(timestampHex, 16) * 1000;
  return new Date(timestamp);
}

const PAGE_SIZE = 15; // how many users we show per page

const Admin = () => {
  const { user } = useContext(UserContext);

  // Loading indicator
  const [loading, setLoading] = useState(false);

  // Groups
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');

  // Garment data
  const [garmentId, setGarmentId] = useState('');
  const [groupGarments, setGroupGarments] = useState([]);

  // Exchange requests
  const [exchangeRequests, setExchangeRequests] = useState([]);

  // Tab state for group-based features
  const [activeTab, setActiveTab] = useState('members');

  // Wear details
  const [totalWearTime, setTotalWearTime] = useState(0);

  // For adding/removing members
  const [userIdentifier, setUserIdentifier] = useState('');
  const [userIdentifierRemove, setUserIdentifierRemove] = useState('');

  // For displaying all users (and sorting)
  const [allUsers, setAllUsers] = useState([]);
  const [sortOption, setSortOption] = useState('alphabetical'); // "alphabetical" or "newest"
  
  // Toggle to show/hide user list
  const [showAllUsers, setShowAllUsers] = useState(false);

  // Pagination states for "all users"
  const [page, setPage] = useState(1);

  //-----------------------------------------------------------
  // 1. On mount: fetch all users + groups
  //-----------------------------------------------------------
  useEffect(() => {
    fetchAllUsers(); 
    fetchGroups();
  }, []);

  //-----------------------------------------------------------
  // Fetch groups (admin only)
  //-----------------------------------------------------------
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

  //-----------------------------------------------------------
  // 2. Fetch exchange requests for chosen group
  //-----------------------------------------------------------
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

  //-----------------------------------------------------------
  // 3. Fetch garments for chosen group
  //-----------------------------------------------------------
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

  //-----------------------------------------------------------
  // 4. Handle group selection
  //-----------------------------------------------------------
  const handleGroupChange = (event) => {
    const groupId = event.target.value;
    setSelectedGroup(groupId);

    if (groupId) {
      fetchExchangeRequests(groupId);
      fetchGroupGarments(groupId);
    }
  };

  //-----------------------------------------------------------
  // 5. Switch between group-based tabs
  //-----------------------------------------------------------
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  //-----------------------------------------------------------
  // 6. Callback from <GarmentWearDetails>
  //-----------------------------------------------------------
  const handleWearDetailsLoaded = (wearTime) => {
    setTotalWearTime(wearTime);
  };

  //-----------------------------------------------------------
  // 7. Download group data as Excel
  //-----------------------------------------------------------
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

  //-----------------------------------------------------------
  // 8. Admin joins group
  //-----------------------------------------------------------
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

  //-----------------------------------------------------------
  // 9. Admin leaves group
  //-----------------------------------------------------------
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

  //-----------------------------------------------------------
  // 10. Admin deletes garment
  //-----------------------------------------------------------
  const handleDeleteGarment = async (garmentId) => {
    const confirmation = window.confirm("Are you sure?");
    if (!confirmation) return;

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/admin/garments/${garmentId}`,
        { withCredentials: true }
      );
      alert(response.data.message);
      setGroupGarments((prev) => prev.filter((g) => g._id !== garmentId));
    } catch (error) {
      if (error.response && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        alert('Failed to delete garment.');
      }
    }
  };

  //-----------------------------------------------------------
  // 11. Admin adds member to group
  //-----------------------------------------------------------
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

      // Refetch group data
      const updatedGroups = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/groups`,
        { withCredentials: true }
      );
      setGroups(updatedGroups.data);

      setUserIdentifier('');
    } catch (error) {
      console.error('Error adding member to group:', error);
      alert(error.response?.data?.error || 'Failed to add member.');
    } finally {
      setLoading(false);
    }
  };

  //-----------------------------------------------------------
  // 12. Admin removes member from group
  //-----------------------------------------------------------
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

      // Refetch group data
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

  //-----------------------------------------------------------
  // 13. Fetch all users
  //-----------------------------------------------------------
  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      // Make sure your backend populates group: e.g. 
      //  User.find().populate('group','group_name')
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/get-all-users`,
        { withCredentials: true }
      );
      setAllUsers(response.data);
    } catch (error) {
      console.error('Error fetching all users:', error);
      alert('Failed to fetch user list.');
    } finally {
      setLoading(false);
    }
  };

  //-----------------------------------------------------------
  // [NEW] 14. Admin deletes a user account
  //-----------------------------------------------------------
  const handleDeleteUser = async (userId) => {
    const confirmation = window.confirm("Are you sure you want to delete this user's account?");
    if (!confirmation) return;
    setLoading(true);
    try {
      // You must have a corresponding DELETE /admin/users/:userId endpoint in your backend
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/admin/users/${userId}`,
        { withCredentials: true }
      );
      alert('User deleted successfully.');

      // remove user from local state
      setAllUsers(prev => prev.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user.');
    } finally {
      setLoading(false);
    }
  };

  //-----------------------------------------------------------
  // 15. Sorting + pagination for allUsers
  //-----------------------------------------------------------
  const sortedUsers = [...allUsers].sort((a, b) => {
    if (sortOption === 'alphabetical') {
      return (a.username || '').localeCompare(b.username || '');
    } else if (sortOption === 'newest') {
      const dateA = getCreatedAtFromObjectId(a._id);
      const dateB = getCreatedAtFromObjectId(b._id);
      return dateB - dateA; // newest first
    } else {
      return 0;
    }
  });

  // Calculate pagination
  const totalPages = Math.ceil(sortedUsers.length / PAGE_SIZE);
  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentPageUsers = sortedUsers.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };
  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  // Toggle showAllUsers
  const toggleShowAllUsers = () => {
    setShowAllUsers(!showAllUsers);
  };

  return (
    <div>
      <ScreenHeader title="Admin Dashboard" />
      <div className="container admin-page">
        <div className="admin-content">
          <h1 className="container-title">Admin Dashboard</h1>

          {/* ========================================================= */}
          {/* Collapsible "All Users" Section with Pagination */}
          {/* ========================================================= */}
          <section className="container-card admin-card m2">
            <h2 className="container-subtitle">All Registered Users</h2>
            <button
              className="button-admin"
              style={{ marginBottom: '1rem' }}
              onClick={toggleShowAllUsers}
            >
              {showAllUsers ? 'Hide All Users' : 'View All Users'}
            </button>

            {showAllUsers && (
              <div className="all-users-section">
                {/* Sorting dropdown */}
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ marginRight: '8px' }}>Sort By:</label>
                  <select
                    value={sortOption}
                    onChange={(e) => {
                      setSortOption(e.target.value);
                      setPage(1); // reset to page 1 on sort change
                    }}
                  >
                    <option value="alphabetical">Alphabetical (Username)</option>
                    <option value="newest">Newest -> Oldest</option>
                  </select>
                </div>

                {loading && <p>Loading user list...</p>}
                {!loading && sortedUsers.length === 0 && (
                  <p>No users found.</p>
                )}

                {/* Display users in a table with pagination */}
                {!loading && sortedUsers.length > 0 && (
                  <>
                    <table className="users-table">
                      <thead>
                        <tr>
                          <th>Username</th>
                          <th>Email</th>
                          <th>Group</th>
                          <th>Is Admin?</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentPageUsers.map((account) => (
                          <tr key={account._id}>
                            <td>{account.username}</td>
                            <td>{account.email}</td>
                            <td>{account.group?.group_name || 'No Group'}</td>
                            <td>{account.isAdmin ? 'Yes' : 'No'}</td>
                            <td>
                              <button
                                className="button-remove"
                                disabled={loading}
                                onClick={() => handleDeleteUser(account._id)}
                              >
                                Delete Account
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Pagination controls */}
                    <div className="pagination-controls">
                      <button
                        onClick={handlePrevPage}
                        disabled={page <= 1}
                        className="button-admin"
                        style={{ marginRight: '0.5rem' }}
                      >
                        Prev
                      </button>
                      <span>
                        Page {page} of {totalPages}
                      </span>
                      <button
                        onClick={handleNextPage}
                        disabled={page >= totalPages}
                        className="button-admin"
                        style={{ marginLeft: '0.5rem' }}
                      >
                        Next
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </section>

          {/* ========================================================= */}
          {/* Data Export for the selected group */}
          {/* ========================================================= */}
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

          {/* ========================================================= */}
          {/* Groups / Members / Tabbed group-based functionalities */}
          {/* ========================================================= */}
          <section className="container-card admin-card m2">
            <h2 className="container-subtitle">Groups and Members</h2>
            {loading && <p>Loading Groups / Data...</p>}

            {!loading && (
              <>
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
                </div>

                {/* Group-based tab menu */}
                {selectedGroup && (
                  <>
                    <div className="tab-container" style={{ marginTop: '1rem' }}>
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
                      <button
                        className={`tab-button ${activeTab === 'garmentTear' ? 'active' : ''}`}
                        onClick={() => handleTabChange('garmentTear')}
                      >
                        Garment Tear Details
                      </button>
                      <button
                        className={`tab-button ${activeTab === 'garmentWash' ? 'active' : ''}`}
                        onClick={() => handleTabChange('garmentWash')}
                      >
                        Garment Wash Details
                      </button>
                      <button
                        className={`tab-button ${activeTab === 'garments' ? 'active' : ''}`}
                        onClick={() => handleTabChange('garments')}
                      >
                        Garments
                      </button>
                    </div>

                    <div className="tab-content" style={{ marginTop: '1rem' }}>
                      {/* 1. Group Members Tab */}
                      {activeTab === 'members' && (
                        <div className="group-members">
                          <h3>Group Members</h3>
                          <ul>
                            {groups
                              .find((g) => g._id === selectedGroup)
                              ?.members.map((member) => (
                                <li key={member._id}>{member.username}</li>
                              ))}
                          </ul>

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
                                onChange={(e) => setUserIdentifierRemove(e.target.value)}
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
                          {groupGarments.length === 0 ? (
                            <p>No garments found.</p>
                          ) : (
                            groupGarments.map((garment) => {
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
                                  <p>
                                    Owner: {garment?.originalOwner?.username || 'N/A'}
                                  </p>

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
                            })
                          )}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Admin;
