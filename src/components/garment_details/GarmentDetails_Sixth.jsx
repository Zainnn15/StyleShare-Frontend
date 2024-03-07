/* eslint-disable react/prop-types */
import '../../styles/main.scss';
import info from '../../assets/icons/info.png';
import symbols from '../../assets/images/care_symbols.png';

import { checkOnID, clickID, addErrorMessageByID, validateInpName } from "../../constants/functions/inputHandlers";
import { careInstructions } from "../../constants/data/lists";
import CircleBtn from "../common/CircleBtn";
import CircleImg from "../common/CircleImg";
import PopupImg from "../common/PopupImg";

const GarmentDetails_Sixth = ({formData, setFormData, page, numPages, handleForward, handleBack}) => {
    const dryTree = {
        "Dry": "dry_yes",
        "DryType": "dry_shade"
    };

    //validation
    function validatePage() {
        if(!validateInpName("canDry", formData.instructionDry.Dry)) {
            return false;
        }
        if(formData.instructionDry.Dry === "dry_no") {
            return true;
        }

        if(!validateInpName("dryType", formData.instructionDry.DryType)) {
            return false;
        }
        if(formData.instructionDry.DryType !== "dry_shade") {
            return true;
        }

        return validateInpName("dryShadeType", formData.instructionDry.Shade);
    }

    function validateAndNext() {
        if(!validatePage()) {
            return false;
        }
        handleForward();        
        return true;
    }

    return(
        <div>
            <PopupImg id="info_care_symbols" className="container-popup" iconUrl={symbols} height="45%" />
            <div className="container-info">
                <label className="container-subtitle-2">Drying Instructions</label>
                <CircleBtn 
                    iconUrl={info} 
                    className="button-info" 
                    width="1em" 
                    handlePress={()=>{
                        let e = document.getElementById("info_care_symbols");
                        if(e) {
                            e.classList.toggle("hide", false);
                        }
                    }}
                />
            </div>
            <hr/>
            <div>
                <div className="container-prompt">
                    <p>Can Dry?</p>
                </div>
                <div id={"canDry_error"} style={{textAlign:"center"}}></div>
                <div className="container-care">
                    <div className="container-care-group">
                        <input type="radio" id="dry_no" name="canDry"
                            value={0} 
                            onClick={(e) => {
                                const newDry = formData.instructionDry;
                                newDry.Dry = e.target.id;
                                setFormData({
                                    ...formData,
                                    instructionDry: newDry
                                });
                                addErrorMessageByID("canDry_error", null);
                            }}
                            defaultChecked={checkOnID("dry_no", formData.instructionDry.Dry)}
                        />
                        <span className="container-care-img" onClick={()=>clickID("dry_no")}>
                            <CircleImg className="img-care" iconUrl={careInstructions.noDry.img} width="50%"/>
                            <label>{careInstructions.noDry.name}</label>
                        </span>
                    </div>
                    <div className="container-care-group">
                        <input type="radio" id="dry_yes" name="canDry"
                            value={1} 
                            onClick={(e) => {
                                const newDry = formData.instructionDry;
                                newDry.Dry = e.target.id;
                                setFormData({
                                    ...formData,
                                    instructionDry: newDry
                                });
                                addErrorMessageByID("canDry_error", null);
                            }}
                            defaultChecked={checkOnID("dry_yes", formData.instructionDry.Dry)}
                        />
                        <span className="container-care-img" onClick={()=>clickID("dry_yes")}>
                            <CircleImg className="img-care" iconUrl={careInstructions.dry.img} width="50%"/>
                            <label>{careInstructions.dry.name}</label>
                        </span>
                    </div>
                </div>

                {
                    //if dry is selected
                    formData.instructionDry.Dry === dryTree.Dry && (
                        <div>
                            <div className="container-prompt">
                                <p>Type of Dry</p>
                            </div>
                            <div id={"dryType_error"} style={{textAlign:"center"}}></div>
                            <div className="container-care">
                                <div className="container-care-group">
                                    <input type="radio" id="dry_drip" name="dryType"
                                        value={"dryDrip"} 
                                        onClick={(e) => {
                                            const newDry = formData.instructionDry;
                                            newDry.DryType = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionDry: newDry
                                            });
                                            addErrorMessageByID("dryType_error", null);
                                        }}
                                        defaultChecked={checkOnID("dry_drip", formData.instructionDry.DryType)}
                                    />
                                    <span className="container-care-img" onClick={()=>clickID("dry_drip")}>
                                        <CircleImg className="img-care" 
                                            iconUrl={careInstructions.dryDrip.img} width="50%"/>
                                        <label>{careInstructions.dryDrip.name}</label>
                                    </span>
                                </div>
                                <div className="container-care-group">
                                    <input type="radio" id="dry_flat" name="dryType"
                                        value={"dryFlat"} 
                                        onClick={(e) => {
                                            const newDry = formData.instructionDry;
                                            newDry.DryType = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionDry: newDry
                                            });
                                            addErrorMessageByID("dry_flat_error", null);
                                        }}
                                        defaultChecked={checkOnID("dry_flat", formData.instructionDry.DryType)}
                                    />
                                    <span className="container-care-img" onClick={()=>clickID("dry_flat")}>
                                        <CircleImg className="img-care" 
                                            iconUrl={careInstructions.dryFlat.img} width="50%"/>
                                        <label>{careInstructions.dryFlat.name}</label>
                                    </span>
                                </div>
                                <div className="container-care-group">
                                    <input type="radio" id="dry_hang" name="dryType"
                                        value={"dryHang"} 
                                        onClick={(e) => {
                                            const newDry = formData.instructionDry;
                                            newDry.DryType = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionDry: newDry
                                            });
                                            addErrorMessageByID("dry_hang_error", null);
                                        }}
                                        defaultChecked={checkOnID("dry_hang", formData.instructionDry.DryType)}
                                    />
                                    <span className="container-care-img" onClick={()=>clickID("dry_hang")}>
                                        <CircleImg className="img-care" 
                                            iconUrl={careInstructions.dryHang.img} width="50%"/>
                                        <label>{careInstructions.dryHang.name}</label>
                                    </span>
                                </div>
                                <div className="container-care-group">
                                    <input type="radio" id="dry_shade" name="dryType"
                                        value={"dryShade"} 
                                        onClick={(e) => {
                                            const newDry = formData.instructionDry;
                                            newDry.DryType = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionDry: newDry
                                            });
                                            addErrorMessageByID("dry_shade_error", null);
                                        }}
                                        defaultChecked={checkOnID("dry_shade", formData.instructionDry.DryType)}
                                    />
                                    <span className="container-care-img" onClick={()=>clickID("dry_shade")}>
                                        <CircleImg className="img-care" 
                                            iconUrl={careInstructions.dryShade.img} width="50%"/>
                                        <label>{careInstructions.dryShade.name}</label>
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                }

                {   
                    //if dry in shade is selected
                    formData.instructionDry.Dry === dryTree.Dry &&
                    formData.instructionDry.DryType === dryTree.DryType &&
                    (
                        <div>
                            <div className="container-prompt">
                                <p>Type of Dry in Shade</p>
                            </div>
                            <div id={"dryShadeType_error"} style={{textAlign:"center"}}></div>
                            <div className="container-care">
                                <div className="container-care-group">
                                    <input type="radio" id="dry_shade_drip" name="dryShadeType"
                                        value={"dryShadeDrip"} 
                                        onClick={(e) => {
                                            const newDry = formData.instructionDry;
                                            newDry.Shade = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionDry: newDry
                                            });
                                            addErrorMessageByID("dryShadeType_error", null);
                                        }}
                                        defaultChecked={checkOnID("dry_shade_drip", formData.instructionDry.Shade)}
                                    />
                                    <span className="container-care-img" onClick={()=>clickID("dry_shade_drip")}>
                                        <CircleImg className="img-care" 
                                            iconUrl={careInstructions.dryShadeDrip.img} width="50%"/>
                                        <label>{careInstructions.dryShadeDrip.name}</label>
                                    </span>
                                </div>
                                <div className="container-care-group">
                                    <input type="radio" id="dry_shade_flat" name="dryShadeType"
                                        value={"dryShadeFlat"} 
                                        onClick={(e) => {
                                            const newDry = formData.instructionDry;
                                            newDry.Shade = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionDry: newDry
                                            });
                                            addErrorMessageByID("dryShadeType_error", null);
                                        }}
                                        defaultChecked={checkOnID("dry_shade_flat", formData.instructionDry.Shade)}
                                    />
                                    <span className="container-care-img" onClick={()=>clickID("dry_shade_flat")}>
                                        <CircleImg className="img-care" 
                                            iconUrl={careInstructions.dryShadeFlat.img} width="50%"/>
                                        <label>{careInstructions.dryShadeFlat.name}</label>
                                    </span>
                                </div>
                                <div className="container-care-group">
                                    <input type="radio" id="dry_shade_hang" name="dryShadeType"
                                        value={"dryShadeHang"} 
                                        onClick={(e) => {
                                            const newDry = formData.instructionDry;
                                            newDry.Shade = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionDry: newDry
                                            });
                                            addErrorMessageByID("dryShadeType_error", null);
                                        }}
                                        defaultChecked={checkOnID("dry_shade_hang", formData.instructionDry.Shade)}
                                    />
                                    <span className="container-care-img" onClick={()=>clickID("dry_shade_hang")}>
                                        <CircleImg className="img-care" 
                                            iconUrl={careInstructions.dryShadeHang.img} width="50%"/>
                                        <label>{careInstructions.dryShadeHang.name}</label>
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className="container-button-form">
                {
                    page > 0 &&
                    <button type="button" className="button-form" onClick={handleBack}>Back</button>
                }
                <button 
                    className="button-form" 
                    type={ page+1 < numPages ? "button" : "submit" }
                    onClick={validateAndNext}
                >
                    { page+1 < numPages ? "Next" : "Submit" }
                </button>
            </div>
        </div>
    );
}

export default GarmentDetails_Sixth;