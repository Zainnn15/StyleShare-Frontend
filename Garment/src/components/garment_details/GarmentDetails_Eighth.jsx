/* eslint-disable react/prop-types */
import '../../styles/main.scss';
import info from '../../assets/icons/info.png';
import symbols from '../../assets/images/care_symbols.png';

import { checkOnID, clickID, addErrorMessageByID, validateInpName } from "../../constants/functions/inputHandlers";
import { careInstructions } from "../../constants/data/lists";
import CircleBtn from "../common/CircleBtn";
import CircleImg from "../common/CircleImg";
import PopupImg from "../common/PopupImg";

const GarmentDetails_Eighth = ({formData, setFormData, page, numPages, handleForward, handleBack}) => {
    const dryCTree = {
        "DryC": "dryC_yes",
    };

    //validation
    function validatePage() {
        if(!validateInpName("canDryC", formData.instructionDryC.DryC)) {
            return false;
        }
        if(formData.instructionDryC.DryC === "dryC_no") {
            return true;
        }

        if(!validateInpName("dryCSolvent", formData.instructionDryC.Solvent)) {
            return false;
        }

        return validateInpName("dryCCare", formData.instructionDryC.Care);
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
                <label className="container-subtitle-2">Dry Cleaning Instructions</label>
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
                    <p>Can Dry Clean?</p>
                </div>
                <div id={"canDryC_error"} style={{textAlign:"center"}}></div>
                <div className="container-care">
                    <div className="container-care-group">
                        <input type="radio" id="dryC_no" name="canDryC"
                            value={0} 
                            onClick={(e) => {
                                const newDryC = formData.instructionDryC;
                                newDryC.DryC = e.target.id;
                                setFormData({
                                    ...formData,
                                    instructionDryC: newDryC
                                });
                                addErrorMessageByID("canDryC_error", null);
                            }}
                            defaultChecked={checkOnID("dryC_no", formData.instructionDryC.DryC)}
                        />
                        <span className="container-care-img" onClick={()=>clickID("dryC_no")}>
                            <CircleImg className="img-care" iconUrl={careInstructions.noDryC.img} width="50%"/>
                            <label>{careInstructions.noDryC.name}</label>
                        </span>
                    </div>
                    <div className="container-care-group">
                        <input type="radio" id="dryC_yes" name="canDryC"
                            value={1} 
                            onClick={(e) => {
                                const newDryC = formData.instructionDryC;
                                newDryC.DryC = e.target.id;
                                setFormData({
                                    ...formData,
                                    instructionDryC: newDryC
                                });
                                addErrorMessageByID("canDryC_error", null);
                            }}
                            defaultChecked={checkOnID("dryC_yes", formData.instructionDryC.DryC)}
                        />
                        <span className="container-care-img" onClick={()=>clickID("dryC_yes")}>
                            <CircleImg className="img-care" iconUrl={careInstructions.dryC.img} width="50%"/>
                            <label>{careInstructions.dryC.name}</label>
                        </span>
                    </div>
                </div>

                {
                    //if dry cleaning is selected
                    formData.instructionDryC.DryC === dryCTree.DryC && (
                        <div>
                            <div className="container-prompt">
                                <p>Dry Cleaning Solvent</p>
                            </div>
                            <div id={"dryCSolvent_error"} style={{textAlign:"center"}}></div>
                            <div className="container-care">
                                <div className="container-care-group">
                                    <input type="radio" id="dryC_a" name="dryCSolvent"
                                        value={"dryCA"} 
                                        onClick={(e) => {
                                            const newDryC = formData.instructionDryC;
                                            newDryC.Solvent = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionDryC: newDryC
                                            });
                                            addErrorMessageByID("dryCSolvent_error", null);
                                        }}
                                        defaultChecked={checkOnID("dryC_a", formData.instructionDryC.Solvent)}
                                    />
                                    <span className="container-care-img" onClick={()=>clickID("dryC_a")}>
                                        <CircleImg className="img-care" 
                                            iconUrl={careInstructions.dryCA.img} width="50%"/>
                                        <label>{careInstructions.dryCA.name}</label>
                                    </span>
                                </div>
                                <div className="container-care-group">
                                    <input type="radio" id="dryC_p" name="dryCSolvent"
                                        value={"dryCP"} 
                                        onClick={(e) => {
                                            const newDryC = formData.instructionDryC;
                                            newDryC.Solvent = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionDryC: newDryC
                                            });
                                            addErrorMessageByID("dryCSolvent_error", null);
                                        }}
                                        defaultChecked={checkOnID("dryC_p", formData.instructionDryC.Solvent)}
                                    />
                                    <span className="container-care-img" onClick={()=>clickID("dryC_p")}>
                                        <CircleImg className="img-care" 
                                            iconUrl={careInstructions.dryCP.img} width="50%"/>
                                        <label>{careInstructions.dryCP.name}</label>
                                    </span>
                                </div>
                                <div className="container-care-group">
                                    <input type="radio" id="dryC_f" name="dryCSolvent"
                                        value={"dryCF"} 
                                        onClick={(e) => {
                                            const newDryC = formData.instructionDryC;
                                            newDryC.Solvent = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionDryC: newDryC
                                            });
                                            addErrorMessageByID("dryCSolvent_error", null);
                                        }}
                                        defaultChecked={checkOnID("dryC_f", formData.instructionDryC.Solvent)}
                                    />
                                    <span className="container-care-img" onClick={()=>clickID("dryC_f")}>
                                        <CircleImg className="img-care" 
                                            iconUrl={careInstructions.dryCF.img} width="50%"/>
                                        <label>{careInstructions.dryCF.name}</label>
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                }

                {   
                    //if dry cleaning solvent is selected
                    formData.instructionDryC.DryC === dryCTree.DryC &&
                    formData.instructionDryC.Solvent !== "" &&
                    (
                        <div>
                            <div className="container-prompt">
                                <p>Dry Cleaning Extra Care</p>
                            </div>
                            <div id={"dryCCare_error"} style={{textAlign:"center"}}></div>
                            <div className="container-care">
                                <div className="container-care-group">
                                    <input type="radio" id="dryC_sort" name="dryCCare"
                                        value={"dryCSort"} 
                                        onClick={(e) => {
                                            const newDryC = formData.instructionDryC;
                                            newDryC.Care = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionDryC: newDryC
                                            });
                                            addErrorMessageByID("dryCCare_error", null);
                                        }}
                                        defaultChecked={checkOnID("dryC_sort", formData.instructionDryC.Care)}
                                    />
                                    <span className="container-care-img" onClick={()=>clickID("dryC_sort")}>
                                        <CircleImg className="img-care" 
                                            iconUrl={careInstructions.dryCSort.img} width="50%"/>
                                        <label>{careInstructions.dryCSort.name}</label>
                                    </span>
                                </div>
                                <div className="container-care-group">
                                    <input type="radio" id="dryC_red_moist" name="dryCCare"
                                        value={"dryCRedMoist"} 
                                        onClick={(e) => {
                                            const newDryC = formData.instructionDryC;
                                            newDryC.Care = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionDryC: newDryC
                                            });
                                            addErrorMessageByID("dryCCare_error", null);
                                        }}
                                        defaultChecked={checkOnID("dryC_red_moist", formData.instructionDryC.Care)}
                                    />
                                    <span className="container-care-img" onClick={()=>clickID("dryC_red_moist")}>
                                        <CircleImg className="img-care" 
                                            iconUrl={careInstructions.dryCRedMoist.img} width="50%"/>
                                        <label>{careInstructions.dryCRedMoist.name}</label>
                                    </span>
                                </div>
                                <div className="container-care-group">
                                    <input type="radio" id="dryC_steam_no" name="dryCCare"
                                        value={"dryCSteamNo"} 
                                        onClick={(e) => {
                                            const newDryC = formData.instructionDryC;
                                            newDryC.Care = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionDryC: newDryC
                                            });
                                            addErrorMessageByID("dryCCare_error", null);
                                        }}
                                        defaultChecked={checkOnID("dryC_steam_no", formData.instructionDryC.Care)}
                                    />
                                    <span className="container-care-img" onClick={()=>clickID("dryC_steam_no")}>
                                        <CircleImg className="img-care" 
                                            iconUrl={careInstructions.dryCSteamNo.img} width="50%"/>
                                        <label>{careInstructions.dryCSteamNo.name}</label>
                                    </span>
                                </div>
                                <div className="container-care-group">
                                    <input type="radio" id="dryC_heat_low" name="dryCCare"
                                        value={"dryCHeatLow"} 
                                        onClick={(e) => {
                                            const newDryC = formData.instructionDryC;
                                            newDryC.Care = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionDryC: newDryC
                                            });
                                            addErrorMessageByID("dryCCare_error", null);
                                        }}
                                        defaultChecked={checkOnID("dryC_heat_low", formData.instructionDryC.Care)}
                                    />
                                    <span className="container-care-img" onClick={()=>clickID("dryC_heat_low")}>
                                        <CircleImg className="img-care" 
                                            iconUrl={careInstructions.dryCHeatLow.img} width="50%"/>
                                        <label>{careInstructions.dryCHeatLow.name}</label>
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

export default GarmentDetails_Eighth;