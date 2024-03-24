/* eslint-disable react/prop-types */
import { careInstructions } from '../../constants/data/lists';
import { formatDate, formatTemp } from '../../constants/functions/valueHandlers';
import '../../styles/main.scss';
import InfoPopup from '../common/InfoPopup';

const Garment_wash = ({garment}) => {
    return(
        <div className="m1">
            {
                garment && garment.washCareInstructions &&
                garment.washCareInstructions.map((care)=>{
                return (
                    <div key={care._id}>
                        <label className="container-subtitle-2">{formatDate(care.washDate)}</label>
                        <div className="container-grid-3-md gap container-border clear-box">
                            <div>
                                <p>
                                    <label className="text-b">Wash Method:<label className="tab"></label></label>
                                    <img className="w-sm" src={careInstructions[care.careWash.Method].img} alt='img'/>
                                    <InfoPopup text={careInstructions[care.careWash.Method].name}/>
                                </p>
                                {
                                    care.careWash.Method !== "" &&
                                    care.careWash.Method !== "noWash" && care.careWash.Method !== "washHand" &&
                                    care.careWash.Heat && 
                                    care.careWash.Heat !== "washHeatXXC" && care.careWash.Heat !== "washHeatXXF" && (
                                        <p>
                                            <label className="text-b">Wash Heat:<label className="tab"></label></label>
                                            <img className="w-sm" src={careInstructions[care.careWash.Heat].img} alt='img'/>
                                            <InfoPopup text={careInstructions[care.careWash.Heat].name}/>
                                        </p>
                                    )
                                }
                                {
                                    care.careWash.Method !== "" &&
                                    care.careWash.Method !== "noWash" && care.careWash.Method !== "washHand" &&
                                    care.careWash.Heat && 
                                    (care.careWash.Heat === "washHeatXXC" || care.careWash.Heat === "washHeatXXF")  && (
                                        <p>
                                            <label className="text-b">Wash Heat:<label className="tab"></label></label>
                                            <img className="w-sm" src={careInstructions["washHeatXX"].img} alt='img'/>
                                            <InfoPopup text={formatTemp(care.careWash.Temp)}/>
                                        </p>
                                    )
                                }
                            </div>
                        
                            <div>
                                {
                                    care.careDry.Method !== "" &&
                                    care.careDry.Method === "noTumble" && (
                                        <p>
                                            <label className="text-b">Dry Method:<label className="tab"></label></label>
                                            {
                                                care.careDry.Air === "dryShade" ? (
                                                    <span>
                                                        <img className="w-sm" src={careInstructions[care.careDry.Shade].img} alt='img'/>
                                                        <InfoPopup text={careInstructions[care.careDry.Shade].name}/>
                                                    </span>  
                                                ) : (
                                                    <span>
                                                        <img className="w-sm" src={careInstructions[care.careDry.Air].img} alt='img'/>
                                                        <InfoPopup text={careInstructions[care.careDry.Air].name}/>
                                                    </span>
                                                )
                                                
                                            }
                                            
                                        </p>
                                    )
                                }

                                {
                                    care.careDry.Method !== "" &&
                                    care.careDry.Method !== "noTumble" && (
                                    <div>
                                        <p>
                                            <label className="text-b">Dry Method:<label className="tab"></label></label>
                                            <img className="w-sm" src={careInstructions[care.careDry.Method].img} alt='img'/>
                                            <InfoPopup text={careInstructions[care.careDry.Method].name}/>
                                        </p>
                                        <p>
                                            <label className="text-b">Dry Heat:<label className="tab"></label></label>
                                            <img className="w-sm" src={careInstructions[care.careDry.Heat].img} alt='img'/>
                                            <InfoPopup text={careInstructions[care.careDry.Heat].name}/>
                                        </p>
                                    </div>
                                    )
                                }
                                
                            </div>

                            {
                                care.careDryC &&
                                care.careDryC.Solvent !== "" ? (
                                    <div>
                                        <div>
                                            <p>
                                                <label className="text-b">Dry Clean Solvent:<label className="tab"></label></label>
                                                <img className="w-sm" src={careInstructions[care.careDryC.Solvent].img} alt='img'/>
                                                <InfoPopup text={careInstructions[care.careDryC.Solvent].name}/>
                                            </p>
                                            <p>
                                                <label className="text-b">Dry Clean Care:<label className="tab"></label></label>
                                                <img className="w-sm" src={careInstructions[care.careDryC.Care].img} alt='img'/>
                                                <InfoPopup text={careInstructions[care.careDryC.Care].name}/>
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div>
                                            <p>
                                                <label className="text-b">Dry Clean:<label className="tab"></label></label>
                                                <label>N/A</label>
                                            </p>
                                        </div>
                                    </div> 
                                )
                            }

                            {
                                care.useIron ? (
                                    <div>
                                        <div>
                                            <p>
                                                <label className="text-b">Iron Duration:<label className="tab"></label></label>
                                                <label>{care.ironDuration} minutes</label>
                                            </p>
                                            <p>
                                                <label className="text-b">Iron Heat:<label className="tab"></label></label>
                                                <img className="w-sm" src={careInstructions[care.careIron.Heat].img} alt='img'/>
                                                <InfoPopup text={careInstructions[care.careIron.Heat].name}/>
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div>
                                            <p>
                                                <label className="text-b">Iron:<label className="tab"></label></label>
                                                <label>N/A</label>
                                            </p>
                                        </div>
                                    </div> 
                                )
                            }

                            {
                                care.careBleach &&
                                care.careBleach.Bleach !== "" ? (
                                    <div>
                                    {
                                        care.careBleach.Bleach === "bleach0" && (
                                        <div>
                                            <p>
                                                <label className="text-b">Bleach:<label className="tab"></label></label>
                                                <img className="w-sm" src={careInstructions["noBleach"].img} alt='img'/>
                                                <InfoPopup text={careInstructions["noBleach"].name}/>
                                            </p>
                                        </div>
                                        )
                                    }
                                    { 
                                        care.careBleach.Bleach === "bleach1" && (
                                        <div>
                                            <p>
                                                <label className="text-b">Bleach:<label className="tab"></label></label>
                                                <img className="w-sm" src={careInstructions["bleach"].img} alt='img'/>
                                                <InfoPopup text={careInstructions["bleach"].name}/>
                                            </p>
                                        </div>
                                        )
                                    }
                                    { 
                                        care.careBleach.Bleach !== "bleach0" &&
                                        care.careBleach.Bleach !== "bleach1" && (
                                        <div>
                                            <p>
                                                <label className="text-b">Bleach:<label className="tab"></label></label>
                                                <img className="w-sm" src={careInstructions[care.careBleach.Bleach].img} alt='img'/>
                                                <InfoPopup text={careInstructions[care.careBleach.Bleach].name}/>
                                            </p>
                                        </div>
                                        )
                                    }
                                    </div>
                                ) : (
                                    <div>
                                        <div>
                                            <p>
                                                <label className="text-b">Bleach:<label className="tab"></label></label>
                                                <label>N/A</label>
                                            </p>
                                        </div>
                                    </div> 
                                )
                            }

                            {
                                care.isVentilated ? (
                                    <div>
                                        <div>
                                            <p>
                                                <label className="text-b">Ventilated Time:<label className="tab"></label></label>
                                                <label>{care.ventilatedTime} hours</label>
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div>
                                            <p>
                                                <label className="text-b">Ventilated:<label className="tab"></label></label>
                                                <label>N/A</label>
                                            </p>
                                        </div>
                                    </div> 
                                )
                            }


                        </div>
                        <br/>
                    </div>
                )})
            }
            
        </div>
    )
}

export default Garment_wash;