/* eslint-disable react/prop-types */
import '../../styles/main.scss';

import { addErrorMessageByID, checkOnID, selectID, validate, validatePage } from "../../constants/functions/inputHandlers";

const GarmentDetails_First = ({formData, setFormData, page, numPages, handleForward, handleBack}) => {
    //handle next button
    function validateAndNext() {
        let querySelect = "input[type='text'],input[type='date']";
        let radioObj = [{"name": "purchaseMethod", "check": formData["purchaseMethod"]}];
        if(!validatePage(querySelect, radioObj)) {
            return false;
        }
        handleForward();
        return true;
    }

    return(
        <div>
            <div>
                <div className="container-prompt" onClick={()=>selectID("purchaseLocation")}>
                    <p>Where was the garment purchased?</p>
                </div>
                <div id={"purchaseLocation_error"} style={{textAlign:"center"}}></div>
                <div className="container-input">
                    <input type="text" id="purchaseLocation" name="purchaseLocation" 
                        placeholder="Enter garment store location" 
                        value={formData.purchaseLocation} 
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                purchaseLocation: e.target.value
                            });
                            validate("purchaseLocation");
                        }}
                        required 
                    />
                </div>
            </div>

            <div>
                <div className="container-prompt">
                    <p>How was it purchased?</p>
                </div>
                <div id={"purchaseMethod_error"} style={{textAlign:"center"}}></div>
                <div className="container-radio">
                    <div className="container-radio-group">
                        <input type="radio" id="method_online" name="purchaseMethod"
                            value={"online"} 
                            onClick={(e) => {
                                setFormData({
                                    ...formData,
                                    purchaseMethod: e.target.id
                                });
                                addErrorMessageByID("purchaseMethod_error", null);
                            }}
                            defaultChecked={checkOnID("method_online", formData.purchaseMethod)}
                        />
                        <label htmlFor="method_online">Online</label>
                    </div>
                    <div className="container-radio-group">
                        <input type="radio" id="method_store" name="purchaseMethod"
                            value={"store"} 
                            onClick={(e) => {
                                setFormData({
                                    ...formData,
                                    purchaseMethod: e.target.id
                                });
                                addErrorMessageByID("purchaseMethod_error", null);
                            }}
                            defaultChecked={checkOnID("method_store", formData.purchaseMethod)}
                        />
                        <label htmlFor="method_store">Brick & Mortar Store</label>
                    </div>
                </div>
            </div>

            <div>
                <div className="container-prompt" onClick={()=>selectID("purchaseDate")}>
                    <p>When was it purchased? (dd/mm/yyyy)</p>
                </div>
                <div id={"purchaseDate_error"} style={{textAlign:"center"}}></div>
                <div className="container-input">
                    <input type="date" id="purchaseDate" name="purchaseDate" 
                        value={formData.purchaseDate} 
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                purchaseDate: e.target.value
                            });
                            validate("purchaseDate");
                        }}
                        required 
                    />
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

export default GarmentDetails_First;