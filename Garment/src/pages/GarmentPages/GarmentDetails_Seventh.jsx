/* eslint-disable react/prop-types */
import '../../styles/main.scss';
import info from '../../assets/icons/info.png';
import symbols from '../../assets/images/care_symbols.png';
import temp from '../../assets/images/temp_guide.png';

import { checkOnID, clickID, addErrorMessageByID, validateInpName } from "../../constants/inputHandlers";
import { careInstructions } from "../../constants/lists";
import CircleBtn from "../../components/common/CircleBtn";
import CircleImg from "../../components/common/CircleImg";
import PopupImg from "../../components/common/PopupImg";

const GarmentDetails_Seventh = ({formData, setFormData, page, numPages, handleForward, handleBack}) => {
    const tumbleTree = {
        "Tumble": "tumble_yes",
    };

    //validation
    function validatePage() {
        if(!validateInpName("canTumble", formData.instructionTumble.Tumble)) {
            return false;
        }
        if(formData.instructionTumble.Tumble === "tumble_no") {
            return true;
        }

        if(!validateInpName("tumbleDelicate", formData.instructionTumble.Delicate)) {
            return false;
        }

        return validateInpName("tumbleHeat", formData.instructionTumble.Heat);
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
                    width="1.5em" 
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
                                <p>Permanent Press or Delicate Tumble Dry?</p>
                            </div>
                            <div id={"tumbleDelicate_error"} style={{textAlign:"center"}}></div>
                            <div className="container-care">
                                <div className="container-care-group">
                                    <input type="radio" id="tumble_delicate_no" name="tumbleDelicate"
                                        value={0} 
                                        onClick={(e) => {
                                            const newTumble = formData.instructionTumble;
                                            newTumble.Delicate = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionTumble: newTumble
                                            });
                                            addErrorMessageByID("tumbleDelicate_error", null);
                                        }}
                                        defaultChecked={checkOnID("tumble_delicate_no", formData.instructionTumble.Delicate)}
                                    />
                                    <span className="container-care-img" onClick={()=>clickID("tumble_delicate_no")}>
                                        <CircleImg className="img-care" 
                                            iconUrl={careInstructions.tumblePress.img} width="50%"/>
                                        <label>{careInstructions.tumblePress.name}</label>
                                    </span>
                                </div>
                                <div className="container-care-group">
                                    <input type="radio" id="tumble_delicate_yes" name="tumbleDelicate"
                                        value={1} 
                                        onClick={(e) => {
                                            const newTumble = formData.instructionTumble;
                                            newTumble.Delicate = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionTumble: newTumble
                                            });
                                            addErrorMessageByID("tumbleDelicate_error", null);
                                        }}
                                        defaultChecked={checkOnID("tumble_delicate_yes", formData.instructionTumble.Delicate)}
                                    />
                                    <span className="container-care-img" onClick={()=>clickID("tumble_delicate_yes")}>
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
                    //if dry in shade is selected
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
                                        width="1.5em" 
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

export default GarmentDetails_Seventh;