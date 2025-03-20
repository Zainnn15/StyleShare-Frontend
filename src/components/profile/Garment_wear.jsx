/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  formatDate,
  getImageFromURL,
} from '../../constants/functions/valueHandlers.jsx';
import '../../styles/main.scss';
import Axios from 'axios';

const Garment_wear = ({ garment }) => {
  const [wearInfo, setWearInfo] = useState(garment ? garment.wearInfo : []);
  const [originalOwner, setOriginalOwner] = useState('');
  const navigate = useNavigate();

  // Navigate to the "Add" page
  const handleEdit = () => {
    navigate('/garment-wear/', { state: 3 });
  };

  // Delete single wear entry both in the backend and in local state
  const handleDelete = (wearId) => {
    // Make sure we have garment._id before proceeding
    if (!garment || !garment._id) return;

    // Ask for confirmation
    if (window.confirm('Are you sure you want to delete this item?')) {
      Axios.delete(`/garments/${garment._id}/wear/${wearId}`)
        .then((res) => {
          // On success, remove from local state
          const updatedWearInfo = wearInfo.filter((w) => w._id !== wearId);
          setWearInfo(updatedWearInfo);
        })
        .catch((err) => {
          console.error('Error deleting wear entry:', err);
          alert('Failed to delete wear entry from the server.');
        });
    }
  };

  useEffect(() => {
    if (!garment?.originalOwner) {
      setOriginalOwner('n/a');
      return;
    }

    // If there's an originalOwner, fetch their name
    Axios.get(`/profile/${garment.originalOwner}`)
      .then((res) => {
        setOriginalOwner(res.data.user?.name || 'n/a');
      })
      .catch((err) => {
        console.log(err);
        setOriginalOwner('n/a');
      });
  }, [garment]);

  return (
    <div className="m1">
      {wearInfo.map((wear) => (
        <div key={wear._id}>
          <label className="container-subtitle-2">
            {formatDate(wear.wearDate)}
          </label>
          <div className="container-grid-3-md gap container-border clear-box">
            <div>
              <p>
                <label className="text-b">
                  Wear Time (hours):<label className="tab"></label>
                </label>
                {wear.wearTime}
              </p>
              {wear.modifier ? (
                <p>
                  <label className="text-b">
                    Wear Username:<label className="tab"></label>
                  </label>
                  {wear.modifier}
                </p>
              ) : null}
              {garment?.originalOwner ? (
                <p>
                  <label className="text-b">
                    Owner:<label className="tab"></label>
                  </label>
                  {originalOwner}
                </p>
              ) : null}
            </div>
            <div>
              <p>
                <label className="text-b">
                  Front Photo:<label className="tab"></label>
                </label>
              </p>
              <div className="container-input-img img-size-sm">
                <img src={getImageFromURL(wear.wearFront)} alt="front" />
              </div>
            </div>
            <div>
              <p>
                <label className="text-b">
                  Back Photo:<label className="tab"></label>
                </label>
              </p>
              <div className="container-input-img img-size-sm">
                <img src={getImageFromURL(wear.wearBack)} alt="back" />
              </div>
            </div>
          </div>
          <div>
            <button
              className="button-regular"
              style={{ margin: '5px' }}
              onClick={handleEdit}
            >
              Add
            </button>
            <button
              className="button-regular"
              onClick={() => handleDelete(wear._id)}
            >
              Delete
            </button>
          </div>
          <br />
        </div>
      ))}
      <br />
    </div>
  );
};

export default Garment_wear;
