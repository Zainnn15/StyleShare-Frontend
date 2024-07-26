/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../constants/functions/valueHandlers';
import '../../styles/main.scss';
import Axios from 'axios';

const GarmentFeel = ({ garment }) => {
  const [feelInfo, setFeelInfo] = useState(garment ? garment.garmentFeels : []);
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/garment-feel/`);
  };

  const handleDelete = (id) => {
    const updatedFeelInfo = feelInfo.filter(feel => feel._id !== id);
    setFeelInfo(updatedFeelInfo);

    // TODO: Add logic to delete from backend if needed
  };

  const [originalOwner, setOriginalOwner] = useState('')

  useEffect(() => {
      setOriginalOwner('')
      if (!garment.originalOwner) {
      setOriginalOwner('n/a')
      return
      }

      console.log('UPDATING', garment.garmentDescription)
      Axios.get(`/profile/${garment.originalOwner}`)
      .then((res) => {
          setOriginalOwner(res.data.user.name)
      })
      .catch((err) => {
          console.log(err)
          setOriginalOwner('n/a')
      })
  }, [garment])

  return (
    <div className="m1">
      {feelInfo.map((feel) => (
        <div key={feel._id}>
          <label className="container-subtitle-2">{formatDate(feel.feelDate)}</label>
          <div className="container-grid-2-md gap container-border clear-box">
            <div>
              <p>
                <label className="text-b">Wear experience:<label className="tab"></label></label>
                {feel.feelComfyExp}
              </p>
              {garment?.originalOwner ? (
                  <p>
                      <label className='text-b'>Owner:<label className='tab'></label></label>
                      {/* {garment.user.name} */}
                      {originalOwner}
                  </p>
               ) : null} 
            </div>

            <div>
              <p>
                <label className="text-b">Comment received:<label className="tab"></label></label>
                {feel.feelHasComment}
              </p>
              {(feel.feelHasComment === 'Positive comments' || feel.feelHasComment === 'Negative comments') && (
                <div>
                  <p>
                    <label className="tab"></label>
                    <label className="text-b">Comment:<label className="tab"></label></label>
                    {feel.feelComment}
                  </p>
                </div>
              )}
            </div>

            <div>
              <p>
                <label className="text-b">Worn during special occasion:<label className="tab"></label></label>
                {feel.feelInOccasion}
              </p>
              {feel.feelInOccasion === 'Yes' && (
                <div>
                  <p>
                    <label className="tab"></label>
                    <label className="text-b">Special Occasion:<label className="tab"></label></label>
                    {feel.feelOccasion}
                  </p>
                  <p>
                    <label className="tab"></label>
                    <label className="text-b">Wear experience:<label className="tab"></label></label>
                    {feel.feelOccasionExp}
                  </p>
                </div>
              )}
            </div>

            <div>
              <p>
                <label className="text-b">Has occurrences while wearing:<label className="tab"></label></label>
                {feel.feelHasOccur}
              </p>
              {feel.feelHasOccur === 'Yes' && (
                <div>
                  <p>
                    <label className="tab"></label>
                    <label className="text-b">Occurrence:<label className="tab"></label></label>
                    {feel.feelOccur}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div>
            <button className="button-regular" style={{ margin: '5px' }} onClick={handleEdit}>Add</button>
            <button 
              className="button-regular" 
              onClick={() => {
                if (window.confirm('Are you sure delete this item?')) {
                  handleDelete(feel._id);
                  }
                }}>Delete</button>
          </div>
          <br />
        </div>
      ))}
      <br />
    </div>
  );
};

export default GarmentFeel;
