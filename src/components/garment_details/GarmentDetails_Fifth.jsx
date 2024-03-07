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

const GarmentDetails_Fifth = ({formData, setFormData, page, numPages, handleForward, handleBack}) => {
    const washTree = {
        "Wash": "wash_yes",
        "Machine": "wash_machine_yes"
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
        if(formData.instructionWash.Machine === "wash_machine_no") {
            return true;
        }


        if(!validateInpName("washDelicate", formData.instructionWash.Delicate)) {
            return false;
        }

        return validateInpName("washTemp", formData.instructionWash.Temp);
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
                                <p>Can machine wash?</p>
                            </div>
                            <div id={"washMachine_error"} style={{textAlign:"center"}}></div>
                            <div className="container-care">
                                <div className="container-care-group">
                                    <input type="radio" id="wash_machine_no" name="washMachine"
                                        value={0} 
                                        onClick={(e) => {
                                            const newWash = formData.instructionWash;
                                            newWash.Machine = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionWash: newWash
                                            });
                                            addErrorMessageByID("washMachine_error", null);
                                        }}
                                        defaultChecked={checkOnID("wash_machine_no", formData.instructionWash.Machine)}
                                    />
                                    <span className="container-care-img" onClick={()=>clickID("wash_machine_no")}>
                                        <CircleImg className="img-care" 
                                            iconUrl={careInstructions.washHand.img} width="50%"/>
                                        <label>{careInstructions.washHand.name}</label>
                                    </span>
                                </div>
                                <div className="container-care-group">
                                    <input type="radio" id="wash_machine_yes" name="washMachine"
                                        value={1} 
                                        onClick={(e) => {
                                            const newWash = formData.instructionWash;
                                            newWash.Machine = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionWash: newWash
                                            });
                                            addErrorMessageByID("washMachine_error", null);
                                        }}
                                        defaultChecked={checkOnID("wash_machine_yes", formData.instructionWash.Machine)}
                                    />
                                    <span className="container-care-img" onClick={()=>clickID("wash_machine_yes")}>
                                        <CircleImg className="img-care" 
                                            iconUrl={careInstructions.washMachine.img} width="50%"/>
                                        <label>{careInstructions.washMachine.name}</label>
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                }

                {   
                    //if machine wash is selected
                    formData.instructionWash.Wash === washTree.Wash &&
                    formData.instructionWash.Machine === washTree.Machine &&
                    (
                        <div>
                            <div className="container-prompt">
                                <p>Permanent press or Delicate?</p>
                            </div>
                            <div id={"washDelicate_error"} style={{textAlign:"center"}}></div>
                            <div className="container-care">
                                <div className="container-care-group">
                                    <input type="radio" id="wash_delicate_no" name="washDelicate"
                                        value={0} 
                                        onClick={(e) => {
                                            const newWash = formData.instructionWash;
                                            newWash.Delicate = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionWash: newWash
                                            });
                                            addErrorMessageByID("washDelicate_error", null);
                                        }}
                                        defaultChecked={checkOnID("wash_delicate_no", formData.instructionWash.Delicate)}
                                    />
                                    <span className="container-care-img" onClick={()=>clickID("wash_delicate_no")}>
                                        <CircleImg className="img-care" 
                                            iconUrl={careInstructions.washPress.img} width="50%"/>
                                        <label>{careInstructions.washPress.name}</label>
                                    </span>
                                </div>
                                <div className="container-care-group">
                                    <input type="radio" id="wash_delicate_yes" name="washDelicate"
                                        value={1} 
                                        onClick={(e) => {
                                            const newWash = formData.instructionWash;
                                            newWash.Delicate = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionWash: newWash
                                            });
                                            addErrorMessageByID("washDelicate_error", null);
                                        }}
                                        defaultChecked={checkOnID("wash_delicate_yes", formData.instructionWash.Delicate)}
                                    />
                                    <span className="container-care-img" onClick={()=>clickID("wash_delicate_yes")}>
                                        <CircleImg className="img-care" 
                                            iconUrl={careInstructions.washDelicate.img} width="50%"/>
                                        <label>{careInstructions.washDelicate.name}</label>
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                }

                {   
                    //if delicate is selected
                    formData.instructionWash.Wash === washTree.Wash &&
                    formData.instructionWash.Machine === washTree.Machine &&
                    formData.instructionWash.Delicate !== "" &&
                    (
                        <div>
                            <PopupImg id="info_temp" className="container-popup" iconUrl={temp} width="75%" />
                            <div className="container-prompt">
                                    <p>Wash Temperature</p>
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
                            <div id={"washTemp_error"} style={{textAlign:"center"}}></div>
                            <div className="container-care">
                                <div className="container-care-group">
                                    <input type="radio" id="wash_30_min" name="washTemp"
                                        value={"30Min"} 
                                        onClick={(e) => {
                                            const newWash = formData.instructionWash;
                                            newWash.Temp = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionWash: newWash
                                            });
                                            addErrorMessageByID("washTemp_error", null);
                                        }}
                                        defaultChecked={checkOnID("wash_30_min", formData.instructionWash.Temp)}
                                    />
                                    <span className="container-care-img" onClick={()=>clickID("wash_30_min")}>
                                        <CircleImg className="img-care" 
                                            iconUrl={careInstructions.wash30Min.img} width="50%"/>
                                        <label>{careInstructions.wash30Min.name}</label>
                                    </span>
                                </div>
                                <div className="container-care-group">
                                    <input type="radio" id="wash_30_med" name="washTemp"
                                        value={"30Med"} 
                                        onClick={(e) => {
                                            const newWash = formData.instructionWash;
                                            newWash.Temp = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionWash: newWash
                                            });
                                            addErrorMessageByID("washTemp_error", null);
                                        }}
                                        defaultChecked={checkOnID("wash_30_med", formData.instructionWash.Temp)}
                                    />
                                    <span className="container-care-img" onClick={()=>clickID("wash_30_med")}>
                                        <CircleImg className="img-care" 
                                            iconUrl={careInstructions.wash30Med.img} width="50%"/>
                                        <label>{careInstructions.wash30Med.name}</label>
                                    </span>
                                </div>
                                <div className="container-care-group">
                                    <input type="radio" id="wash_30_max" name="washTemp"
                                        value={"30Max"} 
                                        onClick={(e) => {
                                            const newWash = formData.instructionWash;
                                            newWash.Temp = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionWash: newWash
                                            });
                                            addErrorMessageByID("washTemp_error", null);
                                        }}
                                        defaultChecked={checkOnID("wash_30_max", formData.instructionWash.Temp)}
                                    />
                                    <span className="container-care-img" onClick={()=>clickID("wash_30_max")}>
                                        <CircleImg className="img-care" 
                                            iconUrl={careInstructions.wash30Max.img} width="50%"/>
                                        <label>{careInstructions.wash30Max.name}</label>
                                    </span>
                                </div>
                                <div className="container-care-group">
                                    <input type="radio" id="wash_cold" name="washTemp"
                                        value={"cold"} 
                                        onClick={(e) => {
                                            const newWash = formData.instructionWash;
                                            newWash.Temp = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionWash: newWash
                                            });
                                            addErrorMessageByID("washTemp_error", null);
                                        }}
                                        defaultChecked={checkOnID("wash_cold", formData.instructionWash.Temp)}
                                    />
                                    <span className="container-care-img" onClick={()=>clickID("wash_cold")}>
                                        <CircleImg className="img-care" 
                                            iconUrl={careInstructions.washCold.img} width="50%"/>
                                        <label>{careInstructions.washCold.name}</label>
                                    </span>
                                </div>
                                <div className="container-care-group">
                                    <input type="radio" id="wash_warm" name="washTemp"
                                        value={"warm"} 
                                        onClick={(e) => {
                                            const newWash = formData.instructionWash;
                                            newWash.Temp = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionWash: newWash
                                            });
                                            addErrorMessageByID("washTemp_error", null);
                                        }}
                                        defaultChecked={checkOnID("wash_warm", formData.instructionWash.Temp)}
                                    />
                                    <span className="container-care-img" onClick={()=>clickID("wash_warm")}>
                                        <CircleImg className="img-care" 
                                            iconUrl={careInstructions.washWarm.img} width="50%"/>
                                        <label>{careInstructions.washWarm.name}</label>
                                    </span>
                                </div>
                                <div className="container-care-group">
                                    <input type="radio" id="wash_hot" name="washTemp"
                                        value={"hot"} 
                                        onClick={(e) => {
                                            const newWash = formData.instructionWash;
                                            newWash.Temp = e.target.id;
                                            setFormData({
                                                ...formData,
                                                instructionWash: newWash
                                            });
                                            addErrorMessageByID("washTemp_error", null);
                                        }}
                                        defaultChecked={checkOnID("wash_hot", formData.instructionWash.Temp)}
                                    />
                                    <span className="container-care-img" onClick={()=>clickID("wash_hot")}>
                                        <CircleImg className="img-care" 
                                            iconUrl={careInstructions.washHot.img} width="50%"/>
                                        <label>{careInstructions.washHot.name}</label>
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

export default GarmentDetails_Fifth;