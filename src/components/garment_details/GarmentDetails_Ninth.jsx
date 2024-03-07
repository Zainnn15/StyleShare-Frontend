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

const GarmentDetails_Ninth = ({formData, setFormData, page, numPages, handleForward, handleBack}) => {
    const ironTree = {
        "Iron": "iron_yes",
    };

    //validation
    function validatePage() {
        if(!validateInpName("canIron", formData.instructionIron.Iron)) {
            return false;
        }
        if(formData.instructionIron.Iron === "iron_no") {
            return true;
        }

        return validateInpName("ironHeat", formData.instructionIron.Heat);
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
                <label className="container-subtitle-2">Ironing Instructions</label>
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
                    <p>Can Iron?</p>
                </div>
                <div id={"canIron_error"} style={{textAlign:"center"}}></div>
                <div className="container-care">
                    <div className="container-care-group">
                        <input type="radio" id="iron_no" name="canIron"
                            value={0} 
                            onClick={(e) => {
                                const newIron = formData.instructionIron;
                                newIron.Iron = e.target.id;
                                setFormData({
                                    ...formData,
                                    instructionIron: newIron
                                });
                                addErrorMessageByID("canIron_error", null);
                            }}
                            defaultChecked={checkOnID("iron_no", formData.instructionIron.Iron)}
                        />
                        <span className="container-care-img" onClick={()=>clickID("iron_no")}>
                            <CircleImg className="img-care" iconUrl={careInstructions.noIron.img} width="50%"/>
                            <label>{careInstructions.noIron.name}</label>
                        </span>
                    </div>
                    <div className="container-care-group">
                        <input type="radio" id="iron_yes" name="canIron"
                            value={1} 
                            onClick={(e) => {
                                const newIron = formData.instructionIron;
                                newIron.Iron = e.target.id;
                                setFormData({
                                    ...formData,
                                    instructionIron: newIron
                                });
                                addErrorMessageByID("canIron_error", null);
                            }}
                            defaultChecked={checkOnID("iron_yes", formData.instructionIron.Iron)}
                        />
                        <span className="container-care-img" onClick={()=>clickID("iron_yes")}>
                            <CircleImg className="img-care" iconUrl={careInstructions.iron.img} width="50%"/>
                            <label>{careInstructions.iron.name}</label>
                        </span>
                    </div>
                </div>

                {
                    //if iron is selected
                    formData.instructionIron.Iron === ironTree.Iron && (
                        <div>
                            <PopupImg id="info_temp" className="container-popup" iconUrl={temp} width="75%" />
                            <div className="container-prompt">
                                    <p>Iron Heat</p>
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
                            <div id={"ironHeat_error"} style={{textAlign:"center"}}></div>
                            <div className="container-care">
                                <div className="container-care-group">
                                    <input type="radio" id="iron_steam_no" name="ironHeat"
                                        value={"ironSteamNo"} 
                                        onClick={(e) => {
                                            const newIron = formData.instructionIron;
                                            newIron.Heat = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionIron: newIron
                                            });
                                            addErrorMessageByID("ironHeat_error", null);
                                        }}
                                        defaultChecked={checkOnID("iron_steam_no", formData.instructionIron.Heat)}
                                    />
                                    <span className="container-care-img" onClick={()=>clickID("iron_steam_no")}>
                                        <CircleImg className="img-care" 
                                            iconUrl={careInstructions.ironSteamNo.img} width="50%"/>
                                        <label>{careInstructions.ironSteamNo.name}</label>
                                    </span>
                                </div>
                                <div className="container-care-group">
                                    <input type="radio" id="iron_heat_low" name="ironHeat"
                                        value={"ironHeatLow"} 
                                        onClick={(e) => {
                                            const newIron = formData.instructionIron;
                                            newIron.Heat = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionIron: newIron
                                            });
                                            addErrorMessageByID("ironHeat_error", null);
                                        }}
                                        defaultChecked={checkOnID("iron_heat_low", formData.instructionIron.Heat)}
                                    />
                                    <span className="container-care-img" onClick={()=>clickID("iron_heat_low")}>
                                        <CircleImg className="img-care" 
                                            iconUrl={careInstructions.ironHeatLow.img} width="50%"/>
                                        <label>{careInstructions.ironHeatLow.name}</label>
                                    </span>
                                </div>
                                <div className="container-care-group">
                                    <input type="radio" id="iron_heat_med" name="ironHeat"
                                        value={"ironHeatMed"} 
                                        onClick={(e) => {
                                            const newIron = formData.instructionIron;
                                            newIron.Heat = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionIron: newIron
                                            });
                                            addErrorMessageByID("ironHeat_error", null);
                                        }}
                                        defaultChecked={checkOnID("iron_heat_med", formData.instructionIron.Heat)}
                                    />
                                    <span className="container-care-img" onClick={()=>clickID("iron_heat_med")}>
                                        <CircleImg className="img-care" 
                                            iconUrl={careInstructions.ironHeatMed.img} width="50%"/>
                                        <label>{careInstructions.ironHeatMed.name}</label>
                                    </span>
                                </div>
                                <div className="container-care-group">
                                    <input type="radio" id="iron_heat_high" name="ironHeat"
                                        value={"ironHeatHigh"} 
                                        onClick={(e) => {
                                            const newIron = formData.instructionIron;
                                            newIron.Heat = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionIron: newIron
                                            });
                                            addErrorMessageByID("ironHeat_error", null);
                                        }}
                                        defaultChecked={checkOnID("iron_heat_high", formData.instructionIron.Heat)}
                                    />
                                    <span className="container-care-img" onClick={()=>clickID("iron_heat_high")}>
                                        <CircleImg className="img-care" 
                                            iconUrl={careInstructions.ironHeatHigh.img} width="50%"/>
                                        <label>{careInstructions.ironHeatHigh.name}</label>
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

export default GarmentDetails_Ninth;