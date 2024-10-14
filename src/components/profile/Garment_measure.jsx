/* eslint-disable react/prop-types */
import '../../styles/main.scss';
import { findAttribute, formatDate, getElemByMaxAttr } from '../../constants/functions/valueHandlers';
import { GARMENT_SIZE_TYPES, GARMENT_TYPES } from '../../constants/data/options';
import { useEffect, useState } from 'react';
import { measurementTypes } from '../../constants/data/lists';

const Garment_measure = ({ garment }) => {
  const [maxTearInfo, setMaxTearInfo] = useState(null);

  useEffect(() => {
    if (garment.tearInfo && garment.tearInfo.length > 0) {
      setMaxTearInfo(getElemByMaxAttr(garment.tearInfo, 'tearDate', true));
    } else {
      // Reset maxTearInfo when there is no tear information
      setMaxTearInfo(null);
    }
  }, [garment]);

  console.log('Garment Data in Garment_measure component:', garment);

  return (
    <div className="m1">
      <label className="container-subtitle-2">
        Original ({formatDate(garment.purchaseDate)})
      </label>
      <div className="container-grid-2-md gap container-border clear-box">
        <div>
          <p>
            <label className="text-b">
              Garment Type:<label className="tab"></label>
            </label>
            {findAttribute(GARMENT_TYPES, garment.garmentType)}
          </p>
          <p>
            <label className="text-b">
              Garment Size:<label className="tab"></label>
            </label>
            {garment.garmentSize} ({findAttribute(GARMENT_SIZE_TYPES, garment.garmentSizeType)})
          </p>
          <p>
            <label className="text-b">
              Garment Fit:<label className="tab"></label>
            </label>
            {garment.garmentFit}
          </p>
        </div>

        <div>
          {garment.garmentMeasurements && garment.garmentMeasurements.length > 0 ? (
            garment.garmentMeasurements.map((type, index) => (
              <div key={'measureType_' + index}>
                <div>
                  <p>
                    <label className="text-b">
                      {type.measureType}:<label className="tab"></label>
                    </label>
                    {`${type.value} ${type.unit}`}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No measurements available</p>
          )}
        </div>
      </div>

      {maxTearInfo && maxTearInfo.tearDate && maxTearInfo.tearExtra && maxTearInfo.tearExtra.washShrinkMeasurements && (
        <div>
          <br />
          <label className="container-subtitle-2">
            Latest ({formatDate(maxTearInfo.tearDate)})
          </label>
          <div className="container-grid-2-md gap container-border clear-box">
            <div>
              <p>
                <label className="text-b">
                  Cause of Change:<label className="tab"></label>
                </label>
                <label>Shrink from Washing</label>
              </p>
            </div>

            <div>
              {maxTearInfo.tearExtra.washShrinkMeasurements.map((type, index) => (
                <div key={'measureTypeLatest_' + index}>
                  <div>
                    <p>
                      <label className="text-b">
                        {findAttribute(measurementTypes, type.measureType)}:<label className="tab"></label>
                      </label>
                      {`${type.value} ${type.unit}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Garment_measure;
