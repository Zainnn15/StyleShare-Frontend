/* eslint-disable react/prop-types */
import { formatDate } from '../../constants/functions/valueHandlers';
import '../../styles/main.scss';

const GarmentFeel = ({ garment }) => {
  return (
    <div className="m1">
      {garment && garment.garmentFeels && garment.garmentFeels.map((feel) => (
        <div key={feel._id}>
          <label className="container-subtitle-2">{formatDate(feel.feelDate)}</label>
          <div className="container-grid-2-md gap container-border clear-box">
            <div>
              <p>
                <label className="text-b">Wear experience:<label className="tab"></label></label>
                {feel.feelComfyExp}
              </p>
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
          <br />
        </div>
      ))}
      <br />
    </div>
  );
};

export default GarmentFeel;
