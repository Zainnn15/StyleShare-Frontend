/* eslint-disable react/prop-types */
import '../../styles/main.scss';
import info from '../../assets/icons/info.png';
import symbols from '../../assets/images/care_symbols.png';
import temp from '../../assets/images/temp_guide.png';

import { checkOnID, clickID, addErrorMessageByID, validateInpName } from "../../constants/functions/inputHandlers";
import { careInstructions } from "../../constants/data/lists";
import CircleBtn from "../common/CircleBtn";
import CircleImg from "../common/CircleImg";
import PopupImg from "../common/PopupImg";

const GarmentDetails_p6 = ({formData, setFormData, page, numPages, handleForward, handleBack}) => {
    const tumbleTree = {
        "Tumble": "tumble_yes",
        "Air": "tumble_no",
        "Shade": "dry_shade",
    };

    //validation
    function validatePage() {
        if(!validateInpName("canTumble", formData.instructionTumble.Tumble)) {
            return false;
        }

        //if air dry
        if(formData.instructionTumble.Tumble === "tumble_no") {
            if(!validateInpName("dryType", formData.instructionTumble.Air)) {
                return false;
            }
            if(formData.instructionTumble.Air !== "dry_shade") {
                return true;
            }
            return validateInpName("dryShadeType", formData.instructionTumble.Shade);
        }
        else {
            if(!validateInpName("tumbleDelicate", formData.instructionTumble.Delicate)) {
                return false;
            }
            return validateInpName("tumbleHeat", formData.instructionTumble.Heat);
        }
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
                <label className="container-subtitle-2">Tumble Drying Instructions</label>
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
                    <p>Can Tumble Dry?</p>
                </div>
                <div id={"canTumble_error"} style={{textAlign:"center"}}></div>
                <div className="container-care">
                    <div className="container-care-group">
                        <input type="radio" id="tumble_no" name="canTumble"
                            value={0} 
                            onClick={(e) => {
                                const newTumble = formData.instructionTumble;
                                newTumble.Tumble = e.target.id;
                                setFormData({
                                    ...formData,
                                    instructionTumble: newTumble
                                });
                                addErrorMessageByID("canTumble_error", null);
                            }}
                            defaultChecked={checkOnID("tumble_no", formData.instructionTumble.Tumble)}
                        />
                        <span className="container-care-img" onClick={()=>clickID("tumble_no")}>
                            <CircleImg className="img-care" iconUrl={careInstructions.noTumble.img} width="50%"/>
                            <label>{careInstructions.noTumble.name}</label>
                        </span>
                    </div>
                    <div className="container-care-group">
                        <input type="radio" id="tumble_yes" name="canTumble"
                            value={1} 
                            onClick={(e) => {
                                const newTumble = formData.instructionTumble;
                                newTumble.Tumble = e.target.id;
                                setFormData({
                                    ...formData,
                                    instructionTumble: newTumble
                                });
                                addErrorMessageByID("canTumble_error", null);
                            }}
                            defaultChecked={checkOnID("tumble_yes", formData.instructionTumble.Tumble)}
                        />
                        <span className="container-care-img" onClick={()=>clickID("tumble_yes")}>
                            <CircleImg className="img-care" iconUrl={careInstructions.tumble.img} width="50%"/>
                            <label>{careInstructions.tumble.name}</label>
                        </span>
                    </div>
                </div>

                {
                    //if tumble is selected
                    formData.instructionTumble.Tumble === tumbleTree.Tumble && (
                        <div>
                            <div className="container-prompt">
                                <p>Tumble Wash Type</p>
                            </div>
                            <div id={"tumbleDelicate_error"} style={{textAlign:"center"}}></div>
                            <div className="container-care">
                                <div className="container-care-group">
                                    <input type="radio" id="tumble_regular" name="tumbleDelicate"
                                        value={"tumbleRegular"} 
                                        onClick={(e) => {
                                            const newTumble = formData.instructionTumble;
                                            newTumble.Delicate = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionTumble: newTumble
                                            });
                                            addErrorMessageByID("tumbleDelicate_error", null);
                                        }}
                                        defaultChecked={checkOnID("tumble_regular", formData.instructionTumble.Delicate)}
                                    />
                                    <span className="container-care-img" onClick={()=>clickID("tumble_regular")}>
                                        <CircleImg className="img-care" 
                                            iconUrl={careInstructions.tumbleRegular.img} width="50%"/>
                                        <label>{careInstructions.tumbleRegular.name}</label>
                                    </span>
                                </div>
                                <div className="container-care-group">
                                    <input type="radio" id="tumble_press" name="tumbleDelicate"
                                        value={"tumblePress"} 
                                        onClick={(e) => {
                                            const newTumble = formData.instructionTumble;
                                            newTumble.Delicate = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionTumble: newTumble
                                            });
                                            addErrorMessageByID("tumbleDelicate_error", null);
                                        }}
                                        defaultChecked={checkOnID("tumble_press", formData.instructionTumble.Delicate)}
                                    />
                                    <span className="container-care-img" onClick={()=>clickID("tumble_press")}>
                                        <CircleImg className="img-care" 
                                            iconUrl={careInstructions.tumblePress.img} width="50%"/>
                                        <label>{careInstructions.tumblePress.name}</label>
                                    </span>
                                </div>
                                <div className="container-care-group">
                                    <input type="radio" id="tumble_delicate" name="tumbleDelicate"
                                        value={"tumbleDelicate"} 
                                        onClick={(e) => {
                                            const newTumble = formData.instructionTumble;
                                            newTumble.Delicate = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionTumble: newTumble
                                            });
                                            addErrorMessageByID("tumbleDelicate_error", null);
                                        }}
                                        defaultChecked={checkOnID("tumble_delicate", formData.instructionTumble.Delicate)}
                                    />
                                    <span className="container-care-img" onClick={()=>clickID("tumble_delicate")}>
                                        <CircleImg className="img-care" 
                                            iconUrl={careInstructions.tumbleDelicate.img} width="50%"/>
                                        <label>{careInstructions.tumbleDelicate.name}</label>
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                }

                {   
                    //if tumble type selected
                    formData.instructionTumble.Tumble === tumbleTree.Tumble &&
                    formData.instructionTumble.Delicate !== "" &&
                    (
                        <div>
                            <PopupImg id="info_temp" className="container-popup" iconUrl={temp} width="75%" />
                            <div className="container-prompt">
                                    <p>Tumble Dry Heat</p>
                                    <CircleBtn 
                                        iconUrl={info} 
                                        className="button-info" 
                                        width="1em" 
                                        handlePress={()=>{
                                            let e = document.getElementById("info_temp");
                                            if(e) {
                                                e.classList.toggle("hide", false);
                                            }
                                        }}
                                    />
                            </div>
                            <div id={"tumbleHeat_error"} style={{textAlign:"center"}}></div>
                            <div className="container-care">
                                <div className="container-care-group">
                                    <input type="radio" id="tumble_heat_low" name="tumbleHeat"
                                        value={"tumbleHeatLow"} 
                                        onClick={(e) => {
                                            const newTumble = formData.instructionTumble;
                                            newTumble.Heat = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionTumble: newTumble
                                            });
                                            addErrorMessageByID("tumbleHeat_error", null);
                                        }}
                                        defaultChecked={checkOnID("tumble_heat_low", formData.instructionTumble.Heat)}
                                    />
                                    <span className="container-care-img" onClick={()=>clickID("tumble_heat_low")}>
                                        <CircleImg className="img-care" 
                                            iconUrl={careInstructions.tumbleHeatLow.img} width="50%"/>
                                        <label>{careInstructions.tumbleHeatLow.name}</label>
                                    </span>
                                </div>
                                <div className="container-care-group">
                                    <input type="radio" id="tumble_heat_med" name="tumbleHeat"
                                        value={"tumbleHeatMed"} 
                                        onClick={(e) => {
                                            const newTumble = formData.instructionTumble;
                                            newTumble.Heat = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionTumble: newTumble
                                            });
                                            addErrorMessageByID("tumbleHeat_error", null);
                                        }}
                                        defaultChecked={checkOnID("tumble_heat_med", formData.instructionTumble.Heat)}
                                    />
                                    <span className="container-care-img" onClick={()=>clickID("tumble_heat_med")}>
                                        <CircleImg className="img-care" 
                                            iconUrl={careInstructions.tumbleHeatMed.img} width="50%"/>
                                        <label>{careInstructions.tumbleHeatMed.name}</label>
                                    </span>
                                </div>
                                <div className="container-care-group">
                                    <input type="radio" id="tumble_heat_high" name="tumbleHeat"
                                        value={"tumbleHeatHigh"} 
                                        onClick={(e) => {
                                            const newTumble = formData.instructionTumble;
                                            newTumble.Heat = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionTumble: newTumble
                                            });
                                            addErrorMessageByID("tumbleHeat_error", null);
                                        }}
                                        defaultChecked={checkOnID("tumble_heat_high", formData.instructionTumble.Heat)}
                                    />
                                    <span className="container-care-img" onClick={()=>clickID("tumble_heat_high")}>
                                        <CircleImg className="img-care" 
                                            iconUrl={careInstructions.tumbleHeatHigh.img} width="50%"/>
                                        <label>{careInstructions.tumbleHeatHigh.name}</label>
                                    </span>
                                </div>
                                <div className="container-care-group">
                                    <input type="radio" id="tumble_heat_no" name="tumbleHeat"
                                        value={"tumbleHeatNo"} 
                                        onClick={(e) => {
                                            const newTumble = formData.instructionTumble;
                                            newTumble.Heat = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionTumble: newTumble
                                            });
                                            addErrorMessageByID("tumbleHeat_error", null);
                                        }}
                                        defaultChecked={checkOnID("tumble_heat_no", formData.instructionTumble.Heat)}
                                    />
                                    <span className="container-care-img" onClick={()=>clickID("tumble_heat_no")}>
                                        <CircleImg className="img-care" 
                                            iconUrl={careInstructions.tumbleHeatNo.img} width="50%"/>
                                        <label>{careInstructions.tumbleHeatNo.name}</label>
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                }

{
                    //if do not tumble is selected
                    formData.instructionTumble.Tumble === tumbleTree.Air && (
                        <div>
                            <div className="container-prompt">
                                <p>Type of Air Dry</p>
                            </div>
                            <div id={"dryType_error"} style={{textAlign:"center"}}></div>
                            <div className="container-care">
                                <div className="container-care-group">
                                    <input type="radio" id="dry_regular" name="dryType"
                                        value={"dryRegular"} 
                                        onClick={(e) => {
                                            const newDry = formData.instructionTumble;
                                            newDry.Air = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionTumble: newDry
                                            });
                                            addErrorMessageByID("dryType_error", null);
                                        }}
                                        defaultChecked={checkOnID("dry_regular", formData.instructionTumble.Air)}
                                    />
                                    <span className="container-care-img" onClick={()=>clickID("dry_regular")}>
                                        <CircleImg className="img-care" 
                                            iconUrl={careInstructions.dryRegular.img} width="50%"/>
                                        <label>{careInstructions.dryRegular.name}</label>
                                    </span>
                                </div>
                                <div className="container-care-group">
                                    <input type="radio" id="dry_drip" name="dryType"
                                        value={"dryDrip"} 
                                        onClick={(e) => {
                                            const newDry = formData.instructionTumble;
                                            newDry.Air = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionTumble: newDry
                                            });
                                            addErrorMessageByID("dryType_error", null);
                                        }}
                                        defaultChecked={checkOnID("dry_drip", formData.instructionTumble.Air)}
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
                                            const newDry = formData.instructionTumble;
                                            newDry.Air = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionTumble: newDry
                                            });
                                            addErrorMessageByID("dry_flat_error", null);
                                        }}
                                        defaultChecked={checkOnID("dry_flat", formData.instructionTumble.Air)}
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
                                            const newDry = formData.instructionTumble;
                                            newDry.Air = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionTumble: newDry
                                            });
                                            addErrorMessageByID("dry_hang_error", null);
                                        }}
                                        defaultChecked={checkOnID("dry_hang", formData.instructionTumble.Air)}
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
                                            const newDry = formData.instructionTumble;
                                            newDry.Air = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionTumble: newDry
                                            });
                                            addErrorMessageByID("dry_shade_error", null);
                                        }}
                                        defaultChecked={checkOnID("dry_shade", formData.instructionTumble.Air)}
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
                    formData.instructionTumble.Tumble === tumbleTree.Air &&
                    formData.instructionTumble.Air === tumbleTree.Shade &&
                    (
                        <div>
                            <div className="container-prompt">
                                <p>Type of Air Dry in Shade</p>
                            </div>
                            <div id={"dryShadeType_error"} style={{textAlign:"center"}}></div>
                            <div className="container-care">
                                <div className="container-care-group">
                                    <input type="radio" id="dry_shade_drip" name="dryShadeType"
                                        value={"dryShadeDrip"} 
                                        onClick={(e) => {
                                            const newDry = formData.instructionTumble;
                                            newDry.Shade = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionTumble: newDry
                                            });
                                            addErrorMessageByID("dryShadeType_error", null);
                                        }}
                                        defaultChecked={checkOnID("dry_shade_drip", formData.instructionTumble.Shade)}
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
                                            const newDry = formData.instructionTumble;
                                            newDry.Shade = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionTumble: newDry
                                            });
                                            addErrorMessageByID("dryShadeType_error", null);
                                        }}
                                        defaultChecked={checkOnID("dry_shade_flat", formData.instructionTumble.Shade)}
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
                                            const newDry = formData.instructionTumble;
                                            newDry.Shade = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionTumble: newDry
                                            });
                                            addErrorMessageByID("dryShadeType_error", null);
                                        }}
                                        defaultChecked={checkOnID("dry_shade_hang", formData.instructionTumble.Shade)}
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

export default GarmentDetails_p6;