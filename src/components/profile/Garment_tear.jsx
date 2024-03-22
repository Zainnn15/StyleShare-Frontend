/* eslint-disable react/prop-types */
import { repairRequests } from '../../constants/data/lists';
import { findAttribute, getImageFromURL } from '../../constants/functions/valueHandlers';
import '../../styles/main.scss';

const Garment_tear = ({garment}) => {
    return(
    <div className="m1">
        <label className="container-subtitle-2">{garment.wearDate}</label>
        <div className='container-border clear-box'>

            <div>
                <p className='container-subtitle-2'>Tears</p>
            </div>
            <div className="container-grid-3-md gap container-border clear-box">
                {
                    garment.tearInfo.wearTear.colorFade === 1 && (
                        <div>
                            <p>
                                <label className="text-b text-u">Color Fading</label>
                            </p>
                            <p>
                                <label className="tab"></label>
                                <label className="text-b">Color Lost:<label className="tab"></label></label>
                                <label>{garment.tearInfo.tearExtra.colorLost}%</label>
                            </p>
                        </div>
                    )
                }

                {   
                    garment.tearInfo.wearTear.pilling === 1 && (
                        <div>
                            <p>
                                <label className="text-b text-u">Pilling</label>
                            </p>
                            <p>
                                <label className="tab"></label>
                                <label className="text-b">Area:<label className="tab"></label></label>
                                <label>{garment.tearInfo.tearExtra.pillingArea}</label>
                            </p>
                            <p>
                                <label className="tab"></label>
                                <label className="text-b">Strength:<label className="tab"></label></label>
                                <label>{garment.tearInfo.tearExtra.pillingStrength}</label>
                            </p>
                        </div>
                    )
                }

                {   
                    garment.tearInfo.wearTear.shapeLoss === 1 && (
                        <div>
                            <p>
                                <label className="text-b text-u">Shape Loss</label>
                            </p>
                            <p>
                                <label className="tab"></label>
                                <label className="text-b">Area:<label className="tab"></label></label>
                                <label>{garment.tearInfo.tearExtra.shapeLossArea}</label>
                            </p>
                            <p>
                                <label className="tab"></label>
                                <label className="text-b">How:<label className="tab"></label></label>
                                <label>{garment.tearInfo.tearExtra.shapeLossHow}</label>
                            </p>
                        </div>
                    )
                }

                {   
                    garment.tearInfo.wearTear.twisting === 1 && (
                        <div>
                            <p>
                                <label className="text-b text-u">Twisting</label>
                            </p>
                            <p>
                                <label className="tab"></label>
                                <label className="text-b">Area:<label className="tab"></label></label>
                                <label>{garment.tearInfo.tearExtra.twistingArea}</label>
                            </p>
                            <p>
                                <label className="tab"></label>
                                <label className="text-b">Size:<label className="tab"></label></label>
                                <label>{garment.tearInfo.tearExtra.twistingSize} cm</label>
                            </p>
                            <p>
                                <label className="tab"></label>
                                <label className="text-b">Photo:<label className="tab"></label></label>
                            </p>
                            <div className='container-input-img img-size-sm'>
                                <img src={getImageFromURL(garment.tearInfo.twistingImg)} alt="front"/>
                            </div>
                        </div>
                    )
                }

                {   
                    garment.tearInfo.wearTear.washShrink === 1 && (
                        <div>
                            <p>
                                <label className="text-b text-u">Shrink from Wash</label>
                            </p>
                        </div>
                    )
                }

                {      
                    garment.tearInfo.wearTear.washDiscolor === 1 && (
                        <div>
                            <p>
                                <label className="text-b text-u">Discolored from Wash</label>
                            </p>
                            <p>
                                <label className="tab"></label>
                                <label className="text-b">How:<label className="tab"></label></label>
                                <label>{garment.tearInfo.tearExtra.discolorHow}</label>
                            </p>
                        </div>
                    )
                }

                {   
                    garment.tearInfo.wearTear.spandexShrink === 1 && (
                        <div>
                            <p>
                                <label className="text-b text-u">Elastane/Spandex Shrink</label>
                            </p>
                            <p>
                                <label className="tab"></label>
                                <label className="text-b">Area:<label className="tab"></label></label>
                                <label>{garment.tearInfo.tearExtra.spandexShrinkArea}</label>
                            </p>
                            <p>
                                <label className="tab"></label>
                                <label className="text-b">Photo:<label className="tab"></label></label>
                            </p>
                            <div className='container-input-img img-size-sm'>
                                <img src={getImageFromURL(garment.tearInfo.spandexShrinkImg)} alt="front"/>
                            </div>
                        </div>
                    )
                }

                {   
                    garment.tearInfo.wearTear.printFade === 1 && (
                        <div>
                            <p>
                                <label className="text-b text-u">Print Washing Out</label>
                            </p>
                            <p>
                                <label className="tab"></label>
                                <label className="text-b">Print Lost:<label className="tab"></label></label>
                                <label>{garment.tearInfo.tearExtra.printFade}</label>
                            </p>
                            <p>
                                <label className="tab"></label>
                                <label className="text-b">Photo:<label className="tab"></label></label>
                            </p>
                            <div className='container-input-img img-size-sm'>
                                <img src={getImageFromURL(garment.tearInfo.printFadeImg)} alt="front"/>
                            </div>
                        </div>
                    )
                }

                {   
                    garment.tearInfo.wearTear.hole === 1 && (
                        <div>
                            <p>
                                <label className="text-b text-u">Holes</label>
                            </p>
                            <p>
                                <label className="tab"></label>
                                <label className="text-b">Area:<label className="tab"></label></label>
                                <label>{garment.tearInfo.tearExtra.holeArea}</label>
                            </p>
                            <p>
                                <label className="tab"></label>
                                <label className="text-b">Size:<label className="tab"></label></label>
                                <label>{garment.tearInfo.tearExtra.holeSize} cm</label>
                            </p>
                            <p>
                                <label className="tab"></label>
                                <label className="text-b">Photo:<label className="tab"></label></label>
                            </p>
                            <div className='container-input-img img-size-sm'>
                                <img src={getImageFromURL(garment.tearInfo.holeImg)} alt="front"/>
                            </div>
                        </div>
                    )
                }

                {   
                    garment.tearInfo.wearTear.hole === 1 && (
                        <div>
                            <p>
                                <label className="text-b text-u">Label is Itching</label>
                            </p>
                        </div>
                    )
                }

                {   
                    garment.tearInfo.wearTear.looseButton === 1 && (
                        <div>
                            <p>
                                <label className="text-b text-u">Buttons Loose</label>
                            </p>
                            <p>
                                <label className="tab"></label>
                                <label className="text-b">Area:<label className="tab"></label></label>
                                <label>{garment.tearInfo.tearExtra.looseButtonArea}</label>
                            </p>
                            <p>
                                <label className="tab"></label>
                                <label className="text-b">Quantity:<label className="tab"></label></label>
                                <label>{garment.tearInfo.tearExtra.looseButtonQty}</label>
                            </p>
                        </div>
                    )
                }

                {   
                    garment.tearInfo.wearTear.stain === 1 && (
                        <div>
                            <p>
                                <label className="text-b text-u">Stains</label>
                            </p>
                            <p>
                                <label className="tab"></label>
                                <label className="text-b">Area:<label className="tab"></label></label>
                                <label>{garment.tearInfo.tearExtra.stainArea}</label>
                            </p>
                            {
                                garment.tearExtra.stainSourceKnow === 1 && (
                                    <p>
                                        <label className="tab"></label>
                                        <label className="text-b">Source:<label className="tab"></label></label>
                                        <label>{garment.tearInfo.tearExtra.stainSource}</label>
                                    </p>
                                )
                            }
                            <p>
                                <label className="tab"></label>
                                <label className="text-b">Too Ugly to Wear:<label className="tab"></label></label>
                                <label>{garment.tearInfo.tearExtra.stainUgly === 1 ? "Yes" : "No"}</label>
                            </p>
                            <p>
                                <label className="tab"></label>
                                <label className="text-b">Photo:<label className="tab"></label></label>
                            </p>
                            <div className='container-input-img img-size-sm'>
                                <img src={getImageFromURL(garment.tearInfo.stainImg)} alt="front"/>
                            </div>
                        </div>
                    )
                }

                {   
                    garment.tearInfo.wearTear.other === 1 && (
                        <div>
                            <p>
                                <label className="text-b text-u">Other Tear</label>
                            </p>
                            <p>
                                <label className="tab"></label>
                                <label className="text-b">Specify:<label className="tab"></label></label>
                                <label>{garment.tearInfo.tearExtra.tearOther}</label>
                            </p>
                        </div>
                    )
                }
                
            </div>
            <br/>

            <div>
                <p className='container-subtitle-2'>Repair Request</p>
            </div>
            <ul className="container-grid-3-md gap container-border clear-box">
                {
                    garment.tearInfo.repairRequest.looseButton === 1 && (
                        <li>
                            {findAttribute(repairRequests, "looseButton")}
                        </li>
                    )
                }

                {
                    garment.tearInfo.repairRequest.brokenZipper === 1 && (
                        <li>
                            {findAttribute(repairRequests, "brokenZipper")}
                        </li>
                    )
                }

                {
                    garment.tearInfo.repairRequest.lostString === 1 && (
                        <li>
                            {findAttribute(repairRequests, "lostString")}
                        </li>
                    )
                }

                {
                    garment.tearInfo.repairRequest.looseHem === 1 && (
                        <li>
                            {findAttribute(repairRequests, "looseHem")}
                        </li>
                    )
                }

                {
                    garment.tearInfo.repairRequest.other === 1 && (
                        <li>
                            {garment.tearInfo.repairOther}
                        </li>
                    )
                }

            </ul>
        </div>
    </div>
    )
}

export default Garment_tear;