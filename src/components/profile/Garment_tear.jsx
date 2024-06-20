/* eslint-disable react/prop-types */
import { measurementTypes, repairRequests } from '../../constants/data/lists';
import { findAttribute, formatDate, getImageFromURL } from '../../constants/functions/valueHandlers';
import '../../styles/main.scss';

const GarmentTear = ({ garment }) => {
  return (
    <div className="m1">
      {garment && garment.tearInfo && garment.tearInfo.map((tear) => (
        tear.tearDate && (
          <div key={tear._id}>
            <label className="container-subtitle-2">{formatDate(tear.tearDate)}</label>
            <div className='container-border clear-box'>
              <div>
                <p className='container-subtitle-2'>Tears</p>
              </div>
              <div className="container-grid-3-md gap container-border clear-box">
                {tear.wearTear.colorFade === 1 && (
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

                {tear.wearTear.pilling === 1 && (
                  <div>
                    <p>
                      <label className="text-b text-u">Pilling</label>
                    </p>
                    <p>
                      <label className="tab"></label>
                      <label className="text-b">Area:<label className="tab"></label></label>
                      <label>{tear.tearExtra.pillingArea}</label>
                    </p>
                    <p>
                      <label className="tab"></label>
                      <label className="text-b">Strength:<label className="tab"></label></label>
                      <label>{tear.tearExtra.pillingStrength}</label>
                    </p>
                  </div>
                )}

                {tear.wearTear.shapeLoss === 1 && (
                  <div>
                    <p>
                      <label className="text-b text-u">Shape Loss</label>
                    </p>
                    <p>
                      <label className="tab"></label>
                      <label className="text-b">Area:<label className="tab"></label></label>
                      <label>{tear.tearExtra.shapeLossArea}</label>
                    </p>
                    <p>
                      <label className="tab"></label>
                      <label className="text-b">How:<label className="tab"></label></label>
                      <label>{tear.tearExtra.shapeLossHow}</label>
                    </p>
                  </div>
                )}

                {tear.wearTear.twisting === 1 && (
                  <div>
                    <p>
                      <label className="text-b text-u">Twisting</label>
                    </p>
                    <p>
                      <label className="tab"></label>
                      <label className="text-b">Area:<label className="tab"></label></label>
                      <label>{tear.tearExtra.twistingArea}</label>
                    </p>
                    <p>
                      <label className="tab"></label>
                      <label className="text-b">Size:<label className="tab"></label></label>
                      <label>{tear.tearExtra.twistingSize} cm</label>
                    </p>
                    <p>
                      <label className="tab"></label>
                      <label className="text-b">Photo:<label className="tab"></label></label>
                    </p>
                    <div className='container-input-img img-size-sm'>
                      {tear.twistingImg && <img src={getImageFromURL(tear.twistingImg)} alt="twisting" />}
                    </div>
                  </div>
                )}

                {tear.wearTear.washShrink === 1 && (
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

                {tear.wearTear.washDiscolor === 1 && (
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

                {tear.wearTear.spandexShrink === 1 && (
                  <div>
                    <p>
                      <label className="text-b text-u">Elastane/Spandex Shrink</label>
                    </p>
                    <p>
                      <label className="tab"></label>
                      <label className="text-b">Area:<label className="tab"></label></label>
                      <label>{tear.tearExtra.spandexShrinkArea}</label>
                    </p>
                    <p>
                      <label className="tab"></label>
                      <label className="text-b">Photo:<label className="tab"></label></label>
                    </p>
                    <div className='container-input-img img-size-sm'>
                      {tear.spandexShrinkImg && <img src={getImageFromURL(tear.spandexShrinkImg)} alt="spandex shrink" />}
                    </div>
                  </div>
                )}

                {tear.wearTear.printFade === 1 && (
                  <div>
                    <p>
                      <label className="text-b text-u">Print Washing Out</label>
                    </p>
                    <p>
                      <label className="tab"></label>
                      <label className="text-b">Print Lost:<label className="tab"></label></label>
                      <label>{tear.tearExtra.printFade}</label>
                    </p>
                    <p>
                      <label className="tab"></label>
                      <label className="text-b">Photo:<label className="tab"></label></label>
                    </p>
                    <div className='container-input-img img-size-sm'>
                      {tear.printFadeImg && <img src={getImageFromURL(tear.printFadeImg)} alt="print fade" />}
                    </div>
                  </div>
                )}

                {tear.wearTear.hole === 1 && (
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
                    <p>
                      <label className="tab"></label>
                      <label className="text-b">Photo:<label className="tab"></label></label>
                    </p>
                    <div className='container-input-img img-size-sm'>
                      {tear.holeImg && <img src={getImageFromURL(tear.holeImg)} alt="hole" />}
                    </div>
                  </div>
                )}

                {tear.wearTear.labelItching === 1 && (
                  <div>
                    <p>
                      <label className="text-b text-u">Label is Itching</label>
                    </p>
                  </div>
                )}

                {tear.wearTear.looseButton === 1 && (
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

                {tear.wearTear.stain === 1 && (
                  <div>
                    <p>
                      <label className="text-b text-u">Stains</label>
                    </p>
                    <p>
                      <label className="tab"></label>
                      <label className="text-b">Area:<label className="tab"></label></label>
                      <label>{tear.tearExtra.stainArea}</label>
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
                    <p>
                      <label className="tab"></label>
                      <label className="text-b">Photo:<label className="tab"></label></label>
                    </p>
                    <div className='container-input-img img-size-sm'>
                      {tear.stainImg && <img src={getImageFromURL(tear.stainImg)} alt="stain" />}
                    </div>
                  </div>
                )}

                {tear.wearTear.other === 1 && (
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
              <br />

              <div>
                <p className='container-subtitle-2'>Repair Request</p>
              </div>
              <ul className="container-grid-3-md gap container-border clear-box">
                {tear.repairRequest.looseButton === 1 && (
                  <li>{findAttribute(repairRequests, "looseButton")}</li>
                )}

                {tear.repairRequest.brokenZipper === 1 && (
                  <li>{findAttribute(repairRequests, "brokenZipper")}</li>
                )}

                {tear.repairRequest.lostString === 1 && (
                  <li>{findAttribute(repairRequests, "lostString")}</li>
                )}

                {tear.repairRequest.looseHem === 1 && (
                  <li>{findAttribute(repairRequests, "looseHem")}</li>
                )}

                {tear.repairRequest.other === 1 && (
                  <li>{tear.repairOther}</li>
                )}
              </ul>
            </div>
            <br />
          </div>
        )
      ))}
    </div>
  );
};

export default GarmentTear;
