/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { measurementTypes, repairRequests } from '../../constants/data/lists';
import { findAttribute, formatDate, getImageFromURL } from '../../constants/functions/valueHandlers';
import '../../styles/main.scss';

const GarmentTear = ({ garment }) => {
  const [tearInfo, setTearInfo] = useState(garment ? garment.tearInfo : []);
  const navigate = useNavigate();

  const handleEdit = () => {
      navigate(`/garment-tear/`);
  };

  const handleDelete = (id) => {
      const updatedTearInfo = tearInfo.filter(tear => tear._id !== id);
      setTearInfo(updatedTearInfo);
  };

  return (
    <div className="m1">
      {
      // garment && garment.tearInfo && garment.tearInfo.map((tear) => (
        tearInfo.map((tear) => (
        tear.tearDate && (
          <div key={tear._id}>
            <label className="container-subtitle-2">{formatDate(tear.tearDate)}</label>
            <div className='container-border clear-box'>
              <div>
                <p className='container-subtitle-2'>Tears</p>
              </div>
              <div className="container-grid-3-md gap container-border clear-box">
                {garment?.user?.name ? (
                    <p>
                        <label className='text-b'>Username:<label className='tab'></label></label>
                        {garment.user.name}
                    </p>
                ) : null}
                {tear.colorFading === 1 && (
                  <div>
                    <p>
                      <label className="text-b text-u">Color Fading</label>
                    </p>
                    <p>
                      <label className="tab"></label>
                      <label className="text-b">Color Lost:<label className="tab"></label></label>
                      <label>{tear.tearExtra.colorLost}%</label>
                    </p>
                  </div>
                )}

                {tear.pillingArea && (
                  <div>
                    <p>
                      <label className="text-b text-u">Pilling</label>
                    </p>
                    <p>
                      <label className="tab"></label>
                      <label className="text-b">Area:<label className="tab"></label></label>
                      <label>{tear.pillingArea}</label>
                    </p>
                    <p>
                      <label className="tab"></label>
                      <label className="text-b">Strength:<label className="tab"></label></label>
                      <label>{tear.pillingStrength}</label>
                    </p>
                  </div>
                )}

                {tear.shapeLossArea && (
                  <div>
                    <p>
                      <label className="text-b text-u">Shape Loss</label>
                    </p>
                    <p>
                      <label className="tab"></label>
                      <label className="text-b">Area:<label className="tab"></label></label>
                      <label>{tear.shapeLossArea}</label>
                    </p>
                    <p>
                      <label className="tab"></label>
                      <label className="text-b">How:<label className="tab"></label></label>
                      <label>{tear.shapeLossHow}</label>
                    </p>
                  </div>
                )}

                {tear.twistingArea && (
                  <div>
                    <p>
                      <label className="text-b text-u">Twisting</label>
                    </p>
                    <p>
                      <label className="tab"></label>
                      <label className="text-b">Area:<label className="tab"></label></label>
                      <label>{tear.twistingArea}</label>
                    </p>
                    <p>
                      <label className="tab"></label>
                      <label className="text-b">Size:<label className="tab"></label></label>
                      <label>{tear.twistingSize} cm</label>
                    </p>
                    {tear.twistingImg && (
                      <p>
                        <label className="tab"></label>
                        <label className="text-b">Photo:<label className="tab"></label></label>
                        <div className='container-input-img img-size-sm'>
                          <img src={getImageFromURL(tear.twistingImg)} alt="twisting" />
                        </div>
                      </p>
                    )}
                  </div>
                )}

                {tear.tearExtra?.washShrinkMeasurements && Array.isArray(tear.tearExtra.washShrinkMeasurements) && (
                  <div>
                    <p>
                      <label className="text-b text-u">Shrink from Wash</label>
                    </p>
                    {tear.tearExtra.washShrinkMeasurements.map((measure) => (
                      <div key={"shrink_" + measure.measureType}>
                        <p>
                          <label className="tab"></label>
                          <label className="text-b">{findAttribute(measurementTypes, measure.measureType)}:<label className="tab"></label></label>
                          <label>{measure.value} {measure.unit}</label>
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {tear.tearExtra.discolorHow && (
                  <div>
                    <p>
                      <label className="text-b text-u">Discolored from Wash</label>
                    </p>
                    <p>
                      <label className="tab"></label>
                      <label className="text-b">How:<label className="tab"></label></label>
                      <label>{tear.tearExtra.discolorHow}</label>
                    </p>
                  </div>
                )}

                {tear.tearExtra.spandexShrinkArea && (
                  <div>
                    <p>
                      <label className="text-b text-u">Elastane/Spandex Shrink</label>
                    </p>
                    <p>
                      <label className="tab"></label>
                      <label className="text-b">Area:<label className="tab"></label></label>
                      <label>{tear.tearExtra.spandexShrinkArea}</label>
                    </p>
                    {tear.spandexShrinkImg && (
                      <p>
                        <label className="tab"></label>
                        <label className="text-b">Photo:<label className="tab"></label></label>
                        <div className='container-input-img img-size-sm'>
                          <img src={getImageFromURL(tear.spandexShrinkImg)} alt="spandex shrink" />
                        </div>
                      </p>
                    )}
                  </div>
                )}

                {tear.printWashingOut && (
                  <div>
                    <p>
                      <label className="text-b text-u">Print Washing Out</label>
                    </p>
                    <p>
                      <label className="tab"></label>
                      <label className="text-b">Print Lost:<label className="tab"></label></label>
                      <label>{tear.printWashingOut}</label>
                    </p>
                    {tear.printFadeImg && (
                      <p>
                        <label className="tab"></label>
                        <label className="text-b">Photo:<label className="tab"></label></label>
                        <div className='container-input-img img-size-sm'>
                          <img src={getImageFromURL(tear.printFadeImg)} alt="print fade" />
                        </div>
                      </p>
                    )}
                  </div>
                )}

                {tear.tearExtra.holeArea && (
                  <div>
                    <p>
                      <label className="text-b text-u">Holes</label>
                    </p>
                    <p>
                      <label className="tab"></label>
                      <label className="text-b">Area:<label className="tab"></label></label>
                      <label>{tear.tearExtra.holeArea}</label>
                    </p>
                    <p>
                      <label className="tab"></label>
                      <label className="text-b">Size:<label className="tab"></label></label>
                      <label>{tear.tearExtra.holeSize} cm</label>
                    </p>
                    {tear.holeImg && (
                      <p>
                        <label className="tab"></label>
                        <label className="text-b">Photo:<label className="tab"></label></label>
                        <div className='container-input-img img-size-sm'>
                          <img src={getImageFromURL(tear.holeImg)} alt="hole" />
                        </div>
                      </p>
                    )}
                  </div>
                )}

                {tear.labelItching && (
                  <div>
                    <p>
                      <label className="text-b text-u">Label is Itching</label>
                    </p>
                  </div>
                )}

                {tear.tearExtra.looseButtonArea && (
                  <div>
                    <p>
                      <label className="text-b text-u">Buttons Loose</label>
                    </p>
                    <p>
                      <label className="tab"></label>
                      <label className="text-b">Area:<label className="tab"></label></label>
                      <label>{tear.tearExtra.looseButtonArea}</label>
                    </p>
                    <p>
                      <label className="tab"></label>
                      <label className="text-b">Quantity:<label className="tab"></label></label>
                      <label>{tear.tearExtra.looseButtonQty}</label>
                    </p>
                  </div>
                )}

                {tear.stainArea && (
                  <div>
                    <p>
                      <label className="text-b text-u">Stains</label>
                    </p>
                    <p>
                      <label className="tab"></label>
                      <label className="text-b">Area:<label className="tab"></label></label>
                      <label>{tear.stainArea}</label>
                    </p>
                    {tear.tearExtra.stainSourceKnow === "stainSourceKnow_yes" && (
                      <p>
                        <label className="tab"></label>
                        <label className="text-b">Source:<label className="tab"></label></label>
                        <label>{tear.tearExtra.stainSource}</label>
                      </p>
                    )}
                    <p>
                      <label className="tab"></label>
                      <label className="text-b">Too Ugly to Wear:<label className="tab"></label></label>
                      <label>{tear.tearExtra.stainUgly === "stainUgly_yes" ? "Yes" : "No"}</label>
                    </p>
                    {tear.stainImg && (
                      <p>
                        <label className="tab"></label>
                        <label className="text-b">Photo:<label className="tab"></label></label>
                        <div className='container-input-img img-size-sm'>
                          <img src={getImageFromURL(tear.stainImg)} alt="stain" />
                        </div>
                      </p>
                    )}
                  </div>
                )}

                {tear.tearExtra.tearOther && (
                  <div>
                    <p>
                      <label className="text-b text-u">Other Tear</label>
                    </p>
                    <p>
                      <label className="tab"></label>
                      <label className="text-b">Specify:<label className="tab"></label></label>
                      <label>{tear.tearExtra.tearOther}</label>
                    </p>
                  </div>
                )}
              </div>
              <div>
                <button className="button-regular" style={{ margin: '5px' }} onClick={() => handleEdit()}>Edit</button>
                {/* <button className="button-regular" onClick={() => handleDelete(tear._id)}>Delete</button> */}
                <button 
                  className="button-regular" 
                  onClick={() => {
                  if (window.confirm('Are you sure delete this item?')) {
                  handleDelete(tear._id);
                  }
                }}>Delete</button>
              </div>
              <br />

              {(tear.repairRequest?.looseButton ||
                tear.repairRequest?.brokenZipper ||
                tear.repairRequest?.lostString ||
                tear.repairRequest?.looseHem ||
                tear.repairRequest?.other) && (
                <div>
                  <p className='container-subtitle-2'>Repair Request</p>
                  <ul className="container-grid-3-md gap container-border clear-box">
                    {tear.repairRequest?.looseButton && (
                      <li>{findAttribute(repairRequests, "looseButton")}</li>
                    )}
                    {tear.repairRequest?.brokenZipper && (
                      <li>{findAttribute(repairRequests, "brokenZipper")}</li>
                    )}
                    {tear.repairRequest?.lostString && (
                      <li>{findAttribute(repairRequests, "lostString")}</li>
                    )}
                    {tear.repairRequest?.looseHem && (
                      <li>{findAttribute(repairRequests, "looseHem")}</li>
                    )}
                    {tear.repairRequest?.other && (
                      <li>{tear.repairOther}</li>
                    )}
                  </ul>
                </div>
              )}


              {/* <div>
                <p className='container-subtitle-2'>Repair Request</p>
              </div>
                <ul className="container-grid-3-md gap container-border clear-box">
                  {tear.repairRequest?.looseButton && (
                    <li>{findAttribute(repairRequests, "looseButton")}</li>
                  )}

                  {tear.repairRequest?.brokenZipper && (
                    <li>{findAttribute(repairRequests, "brokenZipper")}</li>
                  )}

                  {tear.repairRequest?.lostString && (
                    <li>{findAttribute(repairRequests, "lostString")}</li>
                  )}

                  {tear.repairRequest?.looseHem && (
                    <li>{findAttribute(repairRequests, "looseHem")}</li>
                  )}

                  {tear.repairRequest?.other && (
                    <li>{tear.repairOther}</li>
                  )}
                </ul> */}
            </div>
            <br />
          </div>
        )
      ))}
    </div>
  );
};

export default GarmentTear;
