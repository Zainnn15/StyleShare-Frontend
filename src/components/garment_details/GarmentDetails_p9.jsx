/* eslint-disable react/prop-types */
import '../../styles/main.scss';
import info from '../../assets/icons/info.png';
import symbols from '../../assets/images/care_symbols.png';

import { checkOnID, clickID, addErrorMessageByID, validateInpName } from "../../constants/functions/inputHandlers";
import { careInstructions } from "../../constants/data/lists";
import CircleBtn from "../common/CircleBtn";
import CircleImg from "../common/CircleImg";
import PopupImg from "../common/PopupImg";

const GarmentDetails_p9 = ({formData, setFormData, page, numPages, handleBack}) => {
    //validation
    function validatePage() {
        return validateInpName("canBleach", formData.instructionBleach.Bleach);
    }

    function validateAndNext() {
        if(!validatePage()) {
            return false;
        }
        setFormData({
            ...formData
            // willSubmit: true
        });
        //handleForward();
        return true;
    }

    return(
        <div>
            <PopupImg id="info_care_symbols" className="container-popup" iconUrl={symbols} height="45%" />
            <div className="container-info">
                <label className="container-subtitle-2">Bleaching Instructions</label>
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
                    <p>Can Bleach?</p>
                </div>
                <div id={"canBleach_error"} style={{textAlign:"center"}}></div>
                <div className="container-care">
                    <div className="container-care-group">
                        <input type="radio" id="bleach_no" name="canBleach"
                            value={"bleachNo"} 
                            onClick={(e) => {
                                const newBleach = formData.instructionBleach;
                                newBleach.Bleach = e.target.id;
                                setFormData({
                                    ...formData,
                                    instructionBleach: newBleach
                                });
                                addErrorMessageByID("canBleach_error", null);
                            }}
                            defaultChecked={checkOnID("bleach_no", formData.instructionBleach.Bleach)}
                        />
                        <span className="container-care-img" onClick={()=>clickID("bleach_no")}>
                            <CircleImg className="img-care" iconUrl={careInstructions.noBleach.img} width="50%"/>
                            <label>{careInstructions.noBleach.name}</label>
                        </span>
                    </div>
                    <div className="container-care-group">
                        <input type="radio" id="bleach_yes" name="canBleach"
                            value={"bleachYes"} 
                            onClick={(e) => {
                                const newBleach = formData.instructionBleach;
                                newBleach.Bleach = e.target.id;
                                setFormData({
                                    ...formData,
                                    instructionBleach: newBleach
                                });
                                addErrorMessageByID("canBleach_error", null);
                            }}
                            defaultChecked={checkOnID("bleach_yes", formData.instructionBleach.Bleach)}
                        />
                        <span className="container-care-img" onClick={()=>clickID("bleach_yes")}>
                            <CircleImg className="img-care" iconUrl={careInstructions.bleach.img} width="50%"/>
                            <label>{careInstructions.bleach.name}</label>
                        </span>
                    </div>
                    <div className="container-care-group">
                        <input type="radio" id="bleach_nonCl" name="canBleach"
                            value={"bleachNonCl"} 
                            onClick={(e) => {
                                const newBleach = formData.instructionBleach;
                                newBleach.Bleach = e.target.id;
                                setFormData({
                                    ...formData,
                                    instructionBleach: newBleach
                                });
                                addErrorMessageByID("canBleach_error", null);
                            }}
                            defaultChecked={checkOnID("bleach_nonCl", formData.instructionBleach.Bleach)}
                        />
                        <span className="container-care-img" onClick={()=>clickID("bleach_nonCl")}>
                            <CircleImg className="img-care" 
                                iconUrl={careInstructions.bleachNonCl.img} width="50%"/>
                            <label>{careInstructions.bleachNonCl.name}</label>
                        </span>
                    </div>
                </div>

            </div>
            <div className="container-button-form">
                {
                    page > 0 &&
                    <button type="button" className="button-form" onClick={handleBack}>Back</button>
                }
                <button 
                    className="button-form" 
                    onClick={validateAndNext}
                    type={ page+1 < numPages ? "button" : "submit" }
                >
                    { page+1 < numPages ? "Next" : "Submit" }
                </button>
            </div>
        </div>
    );
}

export default GarmentDetails_p9;