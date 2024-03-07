import Axios from "axios";
import { useState, useEffect } from "react";
import ScreenHeader from "../components/common/ScreenHeader";

export default function UserSearch() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleSearch = () => {
        Axios.post(`/searchUser`, { query: searchQuery })
          .then((response) => {
            setSearchResults(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      };

      const handleUserClick = (userId) => {
        // Fetch detailed information for the selected user
        Axios.get(`/getUserDetails/${userId}`)
          .then((response) => {
            setSelectedUser(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      };

      useEffect(() => {
        setSelectedUser(null);
      }, [searchQuery]);
    
    return (
      <div>
        <ScreenHeader/>
        <div className="container main">
          <div>
              <label className="container-title">User Search</label>
              <hr/>
          </div>
          <div className="container-input">
            <input
              type="text"
              placeholder="Enter username or email"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="container-content center">
            <button className="button-form" onClick={handleSearch}>Search</button>
          </div>

          {searchResults.length > 0 && (
            <div>
              <h2>Search Results:</h2>
              <ul>
                {searchResults.map((user) => (
                  <li key={user._id} onClick={() => handleUserClick(user._id)}>
                    {user.name}
                    <button onClick={() => handleUserClick(user._id)}>View Details</button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {selectedUser && (
            <div className="popup">
              <h2>User Details</h2>
              <p>UserName: {selectedUser.username}</p>
              <p>Days going to Seneca: {selectedUser.SenecaDays.join(", ")}</p>
              <button onClick={() => setSelectedUser(null)}>Close</button>
            </div>
          )}
        </div>
      
      </div>
    );
}