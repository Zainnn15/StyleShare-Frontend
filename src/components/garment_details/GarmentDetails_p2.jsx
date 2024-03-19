/* eslint-disable react/prop-types */
import '../../styles/main.scss';

import { GARMENT_TYPES } from "../../constants/data/options";
import { clickID, readURL, selectID, validate, validatePage } from "../../constants/functions/inputHandlers";
import selectImg from '../../assets/icons/select_img.png';

const GarmentDetails_p2 = ({formData, setFormData, page, numPages, handleForward, handleBack}) => {
    const options = GARMENT_TYPES;

    //handle next button
    function validateAndNext() {
        let querySelect = "select,textarea,input";
        if(!validatePage(querySelect)) {
            return false;
        }
        handleForward();
        return true;
    }
    return(

        <div>
            <div>
                <div className="container-prompt" onClick={()=>selectID("garmentType")}>
                    <p>What type of garment is it?</p>
                </div>
                <div id={"garmentType_error"} style={{textAlign:"center"}}></div>
                <div className="container-input">
                    <select 
                        name="garmentType" 
                        id="garmentType"
                        value={formData.garmentType}
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                garmentType: e.target.value
                            });
                            validate("garmentType");
                        }}
                        required
                    >
                        <option key='type_null' value=''>Select a garment...</option>
                        {options.map((opt) => {
                            return <option key={"type_" + opt.value} value={opt.value}>{opt.label}</option>
                        })}
                    </select>
                </div>
            </div>

            <div>
                <div className="container-prompt" onClick={()=>selectID("garmentDescription")}>
                    <p>Give a short description about the garment</p>
                </div>
                <div id={"garmentDescription_error"} style={{textAlign:"center"}}></div>
                <div className="container-input">
                    <textarea 
                        name="garmentDescription"
                        id="garmentDescription"
                        placeholder="Enter short description of garment. (Max characters 100)"
                        rows={4}
                        maxLength={100}
                        required
                        value={formData.garmentDescription}
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                garmentDescription: e.target.value
                            });
                            validate("garmentDescription");
                        }}
                    ></textarea>
                </div>
            </div>

            <div className="container-grid-2-md gap">
                <div>
                    <div className="container-prompt" onClick={()=>selectID("fileFront")}>
                        <p>Front photo of the garment</p>
                    </div>
                    <div id={"fileFront_error"} style={{textAlign:"center"}}></div>
                    <div className='container-input-img clickable' onClick={()=>clickID("fileFront")}>
                        <img className='clickable' id='fileFront_img' src={selectImg} alt='front photo'/>
                    </div>
                    <div className="container-input">
                        <input  type="file" id="fileFront" name="fileFront" 
                            onChange={(e) => {
                                setFormData({ ...formData, fileFront: e.target.files[0] });
                                if(e.target.files[0]) {
                                    readURL("fileFront", "fileFront_img");
                                    validate("fileFront");
                                }
                            }}
                        />
                    </div>
                </div>
                <div>
                    <div className="container-prompt" onClick={()=>selectID("fileBack")}>
                        <p>Back photo of the garment</p>
                    </div>
                    <div id={"fileBack_error"} style={{textAlign:"center"}}></div>
                    <div className='container-input-img clickable' onClick={()=>clickID("fileBack")}>
                        <img id='fileBack_img' src={selectImg} alt='back photo'/>
                    </div>
                    <div className="container-input">       
                        <input  type="file" id="fileBack" name="fileBack"  
                            onChange={(e) => {
                                setFormData({ ...formData, fileBack: e.target.files[0] });
                                if(e.target.files[0]) {
                                    readURL("fileBack", "fileBack_img");
                                    validate("fileBack");
                                }
                            }}
                        />    
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

export default GarmentDetails_p2;