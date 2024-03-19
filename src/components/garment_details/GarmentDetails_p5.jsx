/* eslint-disable react/prop-types */
import '../../styles/main.scss';

import info from '../../assets/icons/info.png';
import symbols from '../../assets/images/care_symbols.png';
import temp from '../../assets/images/temp_guide.png';

import { checkOnID, clickID, addErrorMessageByID, validateInpName, validateSelect } from "../../constants/functions/inputHandlers";
import { careInstructions } from "../../constants/data/lists";
import { WASH_TEMP_C, WASH_TEMP_F } from '../../constants/data/options';
import CircleBtn from "../common/CircleBtn";
import CircleImg from "../common/CircleImg";
import PopupImg from "../common/PopupImg";

const GarmentDetails_p5 = ({formData, setFormData, page, numPages, handleForward, handleBack}) => {
    const washTree = {
        "Wash": "wash_yes",
        "Machine": "wash_hand", //if not
        "Heat": "wash_heat_xx",
        "C": "wash_degree_c",
        "F": "wash_degree_f"
    };

    //validation
    function validatePage() {
        if(!validateInpName("canWash", formData.instructionWash.Wash)) {
            return false;
        }
        if(formData.instructionWash.Wash === "wash_no") {
            return true;
        }

        if(!validateInpName("washMachine", formData.instructionWash.Machine)) {
            return false;
        }
        if(formData.instructionWash.Machine === "wash_hand") {
            return true;
        }


        if(!validateInpName("washHeat", formData.instructionWash.Heat)) {
            return false;
        }
        if(formData.instructionWash.Heat !== "wash_heat_xx") {
            return true;
        }

        if(!validateInpName("washDegree", formData.instructionWash.Degree)) {
            return false;
        }

        //validate temp select
        let selectTempID = "wash_temp_c";
        let selectOptions = WASH_TEMP_C;
        if(formData.instructionWash.Degree === "wash_degree_f") {
            selectTempID = "wash_temp_f";
            selectOptions = WASH_TEMP_F;
        }

        return validateSelect(selectTempID, selectOptions);
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
                <label className="container-subtitle-2">Washing Instructions</label>
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
                    <p>Can Wash?</p>
                </div>
                <div id={"canWash_error"} style={{textAlign:"center"}}></div>
                <div className="container-care">
                    <div className="container-care-group">
                        <input type="radio" id="wash_no" name="canWash"
                            value={0} 
                            onClick={(e) => {
                                const newWash = formData.instructionWash;
                                newWash.Wash = e.target.id;
                                setFormData({
                                    ...formData,
                                    instructionWash: newWash
                                });
                                addErrorMessageByID("canWash_error", null);
                            }}
                            defaultChecked={checkOnID("wash_no", formData.instructionWash.Wash)}
                        />
                        <span className="container-care-img" onClick={()=>clickID("wash_no")}>
                            <CircleImg className="img-care" iconUrl={careInstructions.noWash.img} width="50%"/>
                            <label>{careInstructions.noWash.name}</label>
                        </span>
                    </div>
                    <div className="container-care-group">
                        <input type="radio" id="wash_yes" name="canWash"
                            value={1} 
                            onClick={(e) => {
                                const newWash = formData.instructionWash;
                                newWash.Wash = e.target.id;
                                setFormData({
                                    ...formData,
                                    instructionWash: newWash
                                });
                                addErrorMessageByID("canWash_error", null);
                            }}
                            defaultChecked={checkOnID("wash_yes", formData.instructionWash.Wash)}
                        />
                        <span className="container-care-img" onClick={()=>clickID("wash_yes")}>
                            <CircleImg className="img-care" iconUrl={careInstructions.wash.img} width="50%"/>
                            <label>{careInstructions.wash.name}</label>
                        </span>
                    </div>
                </div>

                {
                    //if wash is selected
                    formData.instructionWash.Wash === washTree.Wash && (
                        <div>
                            <div className="container-prompt">
                                <p>Wash type</p>
                            </div>
                            <div id={"washMachine_error"} style={{textAlign:"center"}}></div>
                            <div className="container-care">
                                <div className="container-care-group">
                                    <input type="radio" id="wash_hand" name="washMachine"
                                        value={"washHand"} 
                                        onClick={(e) => {
                                            const newWash = formData.instructionWash;
                                            newWash.Machine = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionWash: newWash
                                            });
                                            addErrorMessageByID("washMachine_error", null);
                                        }}
                                        defaultChecked={checkOnID("wash_hand", formData.instructionWash.Machine)}
                                    />
                                    <span className="container-care-img" onClick={()=>clickID("wash_hand")}>
                                        <CircleImg className="img-care" 
                                            iconUrl={careInstructions.washHand.img} width="50%"/>
                                        <label>{careInstructions.washHand.name}</label>
                                    </span>
                                </div>
                                <div className="container-care-group">
                                    <input type="radio" id="wash_regular" name="washMachine"
                                        value={"washRegular"} 
                                        onClick={(e) => {
                                            const newWash = formData.instructionWash;
                                            newWash.Machine = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionWash: newWash
                                            });
                                            addErrorMessageByID("washMachine_error", null);
                                        }}
                                        defaultChecked={checkOnID("wash_regular", formData.instructionWash.Machine)}
                                    />
                                    <span className="container-care-img" onClick={()=>clickID("wash_regular")}>
                                        <CircleImg className="img-care" 
                                            iconUrl={careInstructions.washRegular.img} width="50%"/>
                                        <label>{careInstructions.washRegular.name}</label>
                                    </span>
                                </div>
                                <div className="container-care-group">
                                    <input type="radio" id="wash_press" name="washMachine"
                                        value={"washPress"} 
                                        onClick={(e) => {
                                            const newWash = formData.instructionWash;
                                            newWash.Machine = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionWash: newWash
                                            });
                                            addErrorMessageByID("washMachine_error", null);
                                        }}
                                        defaultChecked={checkOnID("wash_press", formData.instructionWash.Machine)}
                                    />
                                    <span className="container-care-img" onClick={()=>clickID("wash_press")}>
                                        <CircleImg className="img-care" 
                                            iconUrl={careInstructions.washPress.img} width="50%"/>
                                        <label>{careInstructions.washPress.name}</label>
                                    </span>
                                </div>
                                <div className="container-care-group">
                                    <input type="radio" id="wash_delicate" name="washMachine"
                                        value={"washDelicate"} 
                                        onClick={(e) => {
                                            const newWash = formData.instructionWash;
                                            newWash.Machine = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionWash: newWash
                                            });
                                            addErrorMessageByID("washMachine_error", null);
                                        }}
                                        defaultChecked={checkOnID("wash_delicate", formData.instructionWash.Machine)}
                                    />
                                    <span className="container-care-img" onClick={()=>clickID("wash_delicate")}>
                                        <CircleImg className="img-care" 
                                            iconUrl={careInstructions.washDelicate.img} width="50%"/>
                                        <label>{careInstructions.washDelicate.name}</label>
                                    </span>
                                </div>
                                <div className="container-care-group">
                                    <input type="radio" id="wash_agitation_min" name="washMachine"
                                        value={"washAgitationMin"} 
                                        onClick={(e) => {
                                            const newWash = formData.instructionWash;
                                            newWash.Machine = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionWash: newWash
                                            });
                                            addErrorMessageByID("washMachine_error", null);
                                        }}
                                        defaultChecked={checkOnID("wash_agitation_min", formData.instructionWash.Machine)}
                                    />
                                    <span className="container-care-img" onClick={()=>clickID("wash_agitation_min")}>
                                        <CircleImg className="img-care" 
                                            iconUrl={careInstructions.washAgitationMin.img} width="50%"/>
                                        <label>{careInstructions.washAgitationMin.name}</label>
                                    </span>
                                </div>
                                <div className="container-care-group">
                                    <input type="radio" id="wash_agitation_med" name="washMachine"
                                        value={"washAgitationMed"} 
                                        onClick={(e) => {
                                            const newWash = formData.instructionWash;
                                            newWash.Machine = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionWash: newWash
                                            });
                                            addErrorMessageByID("washMachine_error", null);
                                        }}
                                        defaultChecked={checkOnID("wash_agitation_med", formData.instructionWash.Machine)}
                                    />
                                    <span className="container-care-img" onClick={()=>clickID("wash_agitation_med")}>
                                        <CircleImg className="img-care" 
                                            iconUrl={careInstructions.washAgitationMed.img} width="50%"/>
                                        <label>{careInstructions.washAgitationMed.name}</label>
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                }

                {   
                    //if any machine wash is selected
                    formData.instructionWash.Wash === washTree.Wash &&
                    formData.instructionWash.Machine !== "" &&
                    formData.instructionWash.Machine !== washTree.Machine &&
                    (
                        <div>
                            <PopupImg id="info_temp" className="container-popup" iconUrl={temp} width="75%" />
                            <div className="container-prompt">
                                    <p>Wash Heat</p>
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
                            <div id={"washHeat_error"} style={{textAlign:"center"}}></div>
                            <div className="container-care">
                                <div className="container-care-group">
                                    <input type="radio" id="wash_cold" name="washHeat"
                                        value={"washCold"} 
                                        onClick={(e) => {
                                            const newWash = formData.instructionWash;
                                            newWash.Heat = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionWash: newWash
                                            });
                                            addErrorMessageByID("washHeat_error", null);
                                        }}
                                        defaultChecked={checkOnID("wash_cold", formData.instructionWash.Heat)}
                                    />
                                    <span className="container-care-img" onClick={()=>clickID("wash_cold")}>
                                        <CircleImg className="img-care" 
                                            iconUrl={careInstructions.washCold.img} width="50%"/>
                                        <label>{careInstructions.washCold.name}</label>
                                    </span>
                                </div>
                                <div className="container-care-group">
                                    <input type="radio" id="wash_warm" name="washHeat"
                                        value={"washWarm"} 
                                        onClick={(e) => {
                                            const newWash = formData.instructionWash;
                                            newWash.Heat = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionWash: newWash
                                            });
                                            addErrorMessageByID("washHeat_error", null);
                                        }}
                                        defaultChecked={checkOnID("wash_warm", formData.instructionWash.Heat)}
                                    />
                                    <span className="container-care-img" onClick={()=>clickID("wash_warm")}>
                                        <CircleImg className="img-care" 
                                            iconUrl={careInstructions.washWarm.img} width="50%"/>
                                        <label>{careInstructions.washWarm.name}</label>
                                    </span>
                                </div>
                                <div className="container-care-group">
                                    <input type="radio" id="wash_hot" name="washHeat"
                                        value={"washHot"} 
                                        onClick={(e) => {
                                            const newWash = formData.instructionWash;
                                            newWash.Heat = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionWash: newWash
                                            });
                                            addErrorMessageByID("washHeat_error", null);
                                        }}
                                        defaultChecked={checkOnID("wash_hot", formData.instructionWash.Heat)}
                                    />
                                    <span className="container-care-img" onClick={()=>clickID("wash_hot")}>
                                        <CircleImg className="img-care" 
                                            iconUrl={careInstructions.washHot.img} width="50%"/>
                                        <label>{careInstructions.washHot.name}</label>
                                    </span>
                                </div>
                                <div className="container-care-group">
                                    <input type="radio" id="wash_heat_xx" name="washHeat"
                                        value={"washHeatXX"} 
                                        onClick={(e) => {
                                            const newWash = formData.instructionWash;
                                            newWash.Heat = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionWash: newWash
                                            });
                                            addErrorMessageByID("washHeat_error", null);
                                        }}
                                        defaultChecked={checkOnID("wash_heat_xx", formData.instructionWash.Heat)}
                                    />
                                    <span className="container-care-img" onClick={()=>clickID("wash_heat_xx")}>
                                        <CircleImg className="img-care" 
                                            iconUrl={careInstructions.washHeatXX.img} width="50%"/>
                                        <label>{careInstructions.washHeatXX.name}</label>
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                }

                {
                    //if xx heat is selected
                    formData.instructionWash.Wash === washTree.Wash &&
                    formData.instructionWash.Machine !== "" &&
                    formData.instructionWash.Machine !== washTree.Machine &&
                    formData.instructionWash.Heat === washTree.Heat && (
                        <div>
                            <div className="container-prompt">
                                <p>In Celsius of Fahrenheit?</p>
                            </div>
                            <div id={"washDegree_error"} style={{textAlign:"center"}}></div>
                            <div className="container-radio">
                                <div className="container-radio-group">
                                    <input type="radio" id="wash_degree_c" name="washDegree"
                                        value={"C"} 
                                        onClick={(e) => {
                                            const newWash = formData.instructionWash;
                                            newWash.Degree = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionWash: newWash
                                            });
                                            addErrorMessageByID("washDegree_error", null);
                                        }}
                                        defaultChecked={checkOnID("wash_degree_c", formData.instructionWash.Degree)}
                                    />
                                    <label htmlFor="wash_degree_c">Celsius ({String.fromCharCode(176)}C)</label>
                                </div>
                                <div className="container-radio-group">
                                    <input type="radio" id="wash_degree_f" name="washDegree"
                                        value={"F"} 
                                        onClick={(e) => {
                                            const newWash = formData.instructionWash;
                                            newWash.Degree = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionWash: newWash
                                            });
                                            addErrorMessageByID("washDegree_error", null);
                                        }}
                                        defaultChecked={checkOnID("wash_degree_f", formData.instructionWash.Degree)}
                                    />
                                    <label htmlFor="wash_degree_f">Fahrenheit ({String.fromCharCode(176)}F)</label>
                                </div>
                            </div>
                        </div>
                    )
                }

                {
                    //if celsius is chosen
                    formData.instructionWash.Wash === washTree.Wash &&
                    formData.instructionWash.Machine !== "" &&
                    formData.instructionWash.Machine !== washTree.Machine &&
                    formData.instructionWash.Heat === washTree.Heat && 
                    formData.instructionWash.Degree === washTree.C && (
                        <div>
                            <div className="container-prompt">
                                <p>Select temperature</p>
                            </div>
                            <div id={"wash_temp_c_error"} style={{textAlign:"center"}}></div>
                            <div className="container-input">
                                <select 
                                    name="washTemp" 
                                    id="wash_temp_c"
                                    value={formData.instructionWash.Temp}
                                    onChange={(e) => {
                                        const newWash = formData.instructionWash;
                                        newWash.Temp = e.target.value;
                                        setFormData({
                                            ...formData,
                                            instructionWash: newWash
                                        });
                                        addErrorMessageByID("wash_temp_c_error", null);
                                    }}
                                    required
                                >
                                    <option key='temp_c_null' value=''>Select a temperature...</option>
                                    {WASH_TEMP_C.map((opt) => {
                                        return <option key={"temp_c_" + opt.value} value={opt.value}>{opt.label}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                    )
                }

{
                    //if celsius is chosen
                    formData.instructionWash.Wash === washTree.Wash &&
                    formData.instructionWash.Machine !== "" &&
                    formData.instructionWash.Machine !== washTree.Machine &&
                    formData.instructionWash.Heat === washTree.Heat && 
                    formData.instructionWash.Degree === washTree.F && (
                        <div>
                            <div className="container-prompt">
                                <p>Select temperature</p>
                            </div>
                            <div id={"wash_temp_f_error"} style={{textAlign:"center"}}></div>
                            <div className="container-input">
                                <select 
                                    name="washTemp" 
                                    id="wash_temp_f"
                                    value={formData.instructionWash.Temp}
                                    onChange={(e) => {
                                        const newWash = formData.instructionWash;
                                        newWash.Temp = e.target.value;
                                        setFormData({
                                            ...formData,
                                            instructionWash: newWash
                                        });
                                        addErrorMessageByID("wash_temp_f_error", null);
                                    }}
                                    required
                                >
                                    <option key='temp_f_null' value=''>Select a temperature...</option>
                                    {WASH_TEMP_F.map((opt) => {
                                        return <option key={"temp_f_" + opt.value} value={opt.value}>{opt.label}</option>
                                    })}
                                </select>
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

export default GarmentDetails_p5;