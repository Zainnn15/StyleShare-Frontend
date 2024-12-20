/* eslint-disable react/prop-types */
import '../../styles/main.scss';
import info from '../../assets/icons/info.png';
import symbols from '../../assets/images/care_symbols.png';

import { checkOnID, clickID, addErrorMessageByID, validateInpName } from "../../constants/functions/inputHandlers";
import { careInstructions } from "../../constants/data/lists";
import CircleBtn from "../common/CircleBtn";
import CircleImg from "../common/CircleImg";
import PopupImg from "../common/PopupImg";

import { useState } from 'react';

const GarmentDetails_p9 = ({ formData, setFormData, handleBack, handleSubmit }) => {
    const [loading, setLoading] = useState(false);

    function validatePage() {
        return validateInpName("canBleach", formData.instructionBleach.Bleach);
    }

    async function validateAndNext(e) {
        e.preventDefault();
        if (!validatePage()) {
            return;
        }

        // Set loading to true when the submit process starts
        setLoading(true);
        setFormData({ ...formData });

        try {
            await handleSubmit(e); 
            // Assuming handleSubmit is a promise that completes once garment is created
            // After success, navigate to home page or handle success as usual
        } catch (error) {
            console.error("Error submitting garment:", error);
            // In case of error, you might want to show an error message and turn off loading
            setLoading(false);
            return;
        }

        // If handleSubmit is done and you navigate away, loading will stop when the page changes
        // If you stay on the same page for some reason, set loading to false only if needed
    }

    return (
        <div>
            {loading && (
                <div className="overlay-loading">
                    <div className="loading-spinner"></div>
                    <p>Processing your garment, please wait...</p>
                </div>
            )}

            <PopupImg id="info_care_symbols" className="container-popup" iconUrl={symbols} height="45%" />
            <div className="container-info">
                <label className="container-subtitle-2">Bleaching Instructions</label>
                <CircleBtn
                    iconUrl={info}
                    className="button-info"
                    width="1em"
                    handlePress={() => {
                        let e = document.getElementById("info_care_symbols");
                        if (e) {
                            e.classList.toggle("hide", false);
                        }
                    }}
                />
            </div>
            <hr />
            <div>
                <div className="container-prompt">
                    <p>Can Bleach?</p>
                </div>
                <div id={"canBleach_error"} style={{ textAlign: "center" }}></div>
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
                        <span className="container-care-img" onClick={() => clickID("bleach_no")}>
                            <CircleImg className="img-care" iconUrl={careInstructions.noBleach.img} width="50%" />
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
                        <span className="container-care-img" onClick={() => clickID("bleach_yes")}>
                            <CircleImg className="img-care" iconUrl={careInstructions.bleach.img} width="50%" />
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
                        <span className="container-care-img" onClick={() => clickID("bleach_nonCl")}>
                            <CircleImg className="img-care"
                                iconUrl={careInstructions.bleachNonCl.img} width="50%" />
                            <label>{careInstructions.bleachNonCl.name}</label>
                        </span>
                    </div>
                </div>

            </div>
            <div className="container-button-form">
                <button type="button" className="button-form" onClick={handleBack} disabled={loading}>Back</button>
                <button
                    className="button-form"
                    onClick={validateAndNext}
                    type="submit"
                    disabled={loading} // Disable while loading to prevent multiple submissions
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </div>
        </div>
    );
}

export default GarmentDetails_p9;
