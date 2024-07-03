import { useState } from "react";
import PropTypes from 'prop-types';
import '../../styles/main.scss';

import cross from '../../assets/icons/x.png';
import plus from '../../assets/icons/plus.png';
import CircleBtn from "../common/CircleBtn";

import { FIBRES } from "../../constants/data/options";
import { addErrorMessage, addErrorMessageByID } from "../../constants/functions/inputHandlers";

const GarmentDetails_p4 = ({ formData, setFormData, page, numPages, handleForward, handleBack }) => {
    const [nextMainKey, setNextMainKey] = useState(formData.compositionMain.length);
    const [nextLiningKey, setNextLiningKey] = useState(formData.compositionLining.length);
    const [nextPaddingKey, setNextPaddingKey] = useState(formData.compositionPadding.length);
    const [idCount, setIdCount] = useState({
        "main": 0,
        "lining": 0,
        "padding": 0
    });
    const options = FIBRES;

    function addInput(type) {
        const newInput = { value: '', percent: '' };
        switch (type) {
            case "lining":
                setNextLiningKey(nextLiningKey + 1);
                setFormData({
                    ...formData,
                    compositionLining: [...formData.compositionLining, newInput]
                });
                setIdCount({ ...idCount, "lining": idCount[type] + 1 });
                break;
            case "padding":
                setNextPaddingKey(nextPaddingKey + 1);
                setFormData({
                    ...formData,
                    compositionPadding: [...formData.compositionPadding, newInput]
                });
                setIdCount({ ...idCount, "padding": idCount[type] + 1 });
                break;
            default:
                setNextMainKey(nextMainKey + 1);
                setFormData({
                    ...formData,
                    compositionMain: [...formData.compositionMain, newInput]
                });
                setIdCount({ ...idCount, "main": idCount[type] + 1 });
        }
    }

    function removeInput(type, index) {
        let objArr;
        switch (type) {
            case "lining":
                objArr = formData.compositionLining;
                break;
            case "padding":
                objArr = formData.compositionPadding;
                break;
            default:
                objArr = formData.compositionMain;
        }
        for (let i = 0; i < objArr.length; i++) {
            if (i === index) {
                objArr.splice(index, 1);
                break;
            }
        }

        switch (type) {
            case "lining":
                setNextLiningKey(nextLiningKey - 1);
                setFormData({
                    ...formData,
                    compositionLining: [...objArr]
                });
                break;
            case "padding":
                setNextPaddingKey(nextPaddingKey - 1);
                setFormData({
                    ...formData,
                    compositionPadding: [...objArr]
                });
                break;
            default:
                setNextMainKey(nextMainKey - 1);
                setFormData({
                    ...formData,
                    compositionMain: [...objArr]
                });
        }

        //validate inputs
        validatePage(type, index);
    }

    function addLining(idName) {
        let e_check = document.getElementById(idName);
        if (!e_check || !e_check.checked) {
            setFormData({
                ...formData,
                compositionLining: [],
                hasLining: false
            });
            return;
        }
        setFormData({
            ...formData,
            compositionLining: [{ value: '', percent: '' }],
            hasLining: true
        });
        setNextLiningKey(1);
    }

    function addPadding(idName) {
        let e_check = document.getElementById(idName);
        if (!e_check || !e_check.checked) {
            setFormData({
                ...formData,
                compositionPadding: [],
                hasPadding: false
            });
            return;
        }
        setFormData({
            ...formData,
            compositionPadding: [{ value: '', percent: '' }],
            hasPadding: true
        });
        setNextPaddingKey(1);
    }

    //validation functions
    function validate(fieldType, idName, toIdName) {
        // let e_inp = document.getElementById(idName);
        // if (!e_inp) {
        //     return false;
        // }
        // let e_to = e_inp;
        // if (toIdName) {
        //     e_to = document.getElementById(toIdName);
        //     if (!e_to) {
        //         return;
        //     }
        // }

        // let val = e_inp.value.trim().toLowerCase();
        // if (val.length === 0) {
        //     addErrorMessage(e_to.id + "_error", "Must not be empty");
        //     return false;
        // }

        // let errMessage = "";
        // let pattern = /^[0-9]{1,3}$/;
        // switch (fieldType) {
        //     case "percent":
        //         if (pattern.test(val) && val <= 100 && val > 0) {
        //             //remove error message if any
        //             addErrorMessage(e_to.id + "_error", null);
        //             return true;
        //         }
        //         errMessage = "Must be an integer from 1-100";
        //         break;
        //     default:
                
        //         for (let i = 0; i < options.length; i++) {
        //             if (options[i].label.toLowerCase() === val) {
        //                 //remove error message if any
        //                 addErrorMessage(e_to.id + "_error", null);
        //                 return true;
        //             }
        //         }
        //         errMessage = "Must be a valid option in the list";
        // }

        // //add error message
        // addErrorMessage(e_to.id + "_error", errMessage);
        // return false;
        let e_inp = document.getElementById(idName);
        if (!e_inp) {
            return false;
        }
        let e_to = e_inp;
        if (toIdName) {
            e_to = document.getElementById(toIdName);
            if (!e_to) {
                return;
            }
        }

        let val = e_inp.value.trim().toLowerCase();
        if (val.length === 0) {
            addErrorMessage(e_to.id + "_error", "Must not be empty");
            return false;
        }

        let errMessage = "";
        let pattern = /^[0-9]{1,3}$/;
        switch (fieldType) {
            case "percent":
                if (pattern.test(val) && val <= 100 && val > 0) {
                    // Remove error message if any
                    addErrorMessage(e_to.id + "_error", null);
                    return true;
                }
                errMessage = "Must be an integer from 1-100";
                break;
            default:
                // Check if the value is "others"
                if (toIdName === 'Others') {
                    // Remove error message if any
                    addErrorMessage(e_to.id + "_error", null);
                    return false;
                }

                // Validate against options
                for (let i = 0; i < options.length; i++) {
                    if (options[i].label.toLowerCase() === val) {
                        // Remove error message if any
                        addErrorMessage(e_to.id + "_error", null);
                        return true;
                    }
                }
                errMessage = "Must be a valid option in the list";
            }

            // Add error message
            addErrorMessage(e_to.id + "_error", errMessage);
            return false;
        }

    function validatePage(type = "", index = 0) {
        let inpSet = document.querySelectorAll("input");
        let isValid = true;
        if (!inpSet) {
            return false;
        }
        inpSet = [...inpSet];
        //validate name
        let nameSet = inpSet.filter((inp) => inp.id.includes(`${type}_mat_`));
        if (type !== "") {
            for (let i = index; i < nameSet.length - 1; i++) {
                isValid = validate("name", nameSet[i + 1].id, nameSet[i].id) && isValid;
            }
        }
        else {
            for (let i = 0; i < nameSet.length; i++) {
                isValid = validate("name", nameSet[i].id) && isValid;
            }
        }

        //validate percent
        if (type !== "") {
            let percentSet = inpSet.filter((inp) => inp.id.includes(`${type}_per_`));
            for (let i = index; i < percentSet.length - 1; i++) {
                isValid = validate("percent", percentSet[i + 1].id, percentSet[i].id) && isValid;
            }
        }
        else {
            let clothTypes = ["main"];
            if (formData.hasLining) {
                clothTypes.push("lining");
            }
            if (formData.hasPadding) {
                clothTypes.push("padding");
            }
            clothTypes.forEach((t) => {
                let percentSet = inpSet.filter((inp) => inp.id.includes(`${t}_per_`));
                let percentTotal = 0;
                for (let i = 0; i < percentSet.length; i++) {
                    isValid = validate("percent", percentSet[i].id) && isValid;
                    if (!isNaN(percentSet[i].value)) {
                        percentTotal += Number(percentSet[i].value);
                    }
                }
                if (percentTotal !== 100) {
                    addErrorMessageByID(`${t}_total_error`, "Must total to 100%");
                    isValid = false;
                }
                else {
                    addErrorMessageByID(`${t}_total_error`, null);
                }
            });
        }
        return isValid;
    }

    //handle next button
    function validateAndNext() {
        if (!validatePage()) {
            return false;
        }
        handleForward();
        return true;
    }

    // Check for duplicate values
    function isDuplicate(type, value) {
        let values = [];
        switch (type) {
            case "lining":
                values = formData.compositionLining.map(item => item.value.toLowerCase());
                break;
            case "padding":
                values = formData.compositionPadding.map(item => item.value.toLowerCase());
                break;
            default:
                values = formData.compositionMain.map(item => item.value.toLowerCase());
        }
        return values.includes(value.toLowerCase());
    }

    

    return (
        <div>
            <label className="container-subtitle-2">Garment Composition</label>
            <hr />
            <div>
                <div className="container-prompt">
                    <p>Main</p>
                </div>
                <div id={"main_total_error"} style={{ textAlign: "center" }}></div>
                {
                    formData.compositionMain.map((inp, index) => {
                        return (
                            <div className="container-materials" key={"materials_main_" + index}>
                                <label>{index + 1}</label>
                                {nextMainKey > 1 &&
                                    <div className="container-materials-remove">
                                        <CircleBtn
                                            iconUrl={cross}
                                            className="button-remove"
                                            width="0.75em"
                                            handlePress={() => removeInput("main", index)}
                                        />
                                    </div>}
                                <div className="container-materials-group">
                                    <div>
                                        <div id={"main_mat_" + index + "_error"}></div>
                                        <input id={"main_mat_" + index}
                                            type="text"
                                            name="compositionMain[][value]"
                                            placeholder="Select a fibre"
                                            list="materials"
                                            value={formData.compositionMain[index].value}
                                            onChange={(e) => {
                                                if (isDuplicate("main", e.target.value)) {
                                                    addErrorMessage(`main_mat_${index}_error`, "Material already selected");
                                                }
                                                
                                                else {
                                                    formData.compositionMain[index].value = e.target.value;
                                                    setFormData({
                                                        ...formData,
                                                        compositionMain: [...formData.compositionMain]
                                                    });
                                                    validate("name", "main_mat_" + index);
                                                }
                                            }}
                                            required
                                        />
                                    </div>

                                    <div className="container-col">
                                        <div id={"main_per_" + index + "_error"}></div>
                                        <div className="container-input-label">
                                            <input id={"main_per_" + index}
                                                type="number"
                                                name="compositionMain[][percent]"
                                                placeholder="0"
                                                value={formData.compositionMain[index].percent}
                                                onChange={(e) => {
                                                    formData.compositionMain[index].percent = e.target.value;
                                                    setFormData({
                                                        ...formData,
                                                        compositionMain: [...formData.compositionMain]
                                                    });
                                                    validate("percent", "main_per_" + index);
                                                }}
                                                min={1}
                                                max={100}
                                                step={1}
                                                required
                                            />
                                            <label>%</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
                <br />
                <div className="container-row">
                    <CircleBtn
                        iconUrl={plus}
                        className="button-add"
                        width="1.5em"
                        handlePress={() => addInput("main")}
                    />
                    <label className="clickable" onClick={() => addInput("main")}>Add Material</label>
                </div>
            </div>
            <br />
            <div className="container-checkbox">
                <div className="container-checkbox-group">
                    <input type="checkbox" id="add_lining"
                        onClick={(e) => addLining(e.target.id)}
                        defaultChecked={formData.hasLining}
                    />
                    <label htmlFor="add_lining">Add Lining Composition</label>
                </div>
            </div>
            {
                formData.hasLining && (
                    <div>
                        <div>
                            <div className="container-prompt">
                                <p>Lining</p>
                            </div>
                            <div id={"lining_total_error"} style={{ textAlign: "center" }}></div>
                            {
                                formData.compositionLining.map((inp, index) => {
                                    return (
                                        <div className="container-materials" key={"materials_lining_" + index}>
                                            <label>{index + 1}</label>
                                            {nextLiningKey > 1 &&
                                                <div className="container-materials-remove">
                                                    <CircleBtn
                                                        iconUrl={cross}
                                                        className="button-remove"
                                                        width="0.75em"
                                                        handlePress={() => removeInput("lining", index)}
                                                    />
                                                </div>}
                                            <div className="container-materials-group">
                                                <div>
                                                    <div id={"lining_mat_" + index + "_error"}></div>
                                                    <input id={"lining_mat_" + index}
                                                        type="text"
                                                        name="compositionLining[][value]"
                                                        placeholder="Select a fibre"
                                                        list="materials"
                                                        value={formData.compositionLining[index].value}
                                                        onChange={(e) => {
                                                            if (isDuplicate("lining", e.target.value)) {
                                                                addErrorMessage(`lining_mat_${index}_error`, "Material already selected");
                                                            } else {
                                                                formData.compositionLining[index].value = e.target.value;
                                                                setFormData({
                                                                    ...formData,
                                                                    compositionLining: [...formData.compositionLining]
                                                                });
                                                                validate("name", "lining_mat_" + index);
                                                            }
                                                        }}
                                                        required
                                                    />
                                                </div>

                                                <div className="container-col">
                                                    <div id={"lining_per_" + index + "_error"}></div>
                                                    <div className="container-input-label">
                                                        <input id={"lining_per_" + index}
                                                            type="number"
                                                            name="compositionLining[][percent]"
                                                            placeholder="0"
                                                            value={formData.compositionLining[index].percent}
                                                            onChange={(e) => {
                                                                formData.compositionLining[index].percent = e.target.value;
                                                                setFormData({
                                                                    ...formData,
                                                                    compositionLining: [...formData.compositionLining]
                                                                });
                                                                validate("percent", "lining_per_" + index);
                                                            }}
                                                            min={0}
                                                            max={100}
                                                            step={1}
                                                            required
                                                        />
                                                        <label>%</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                            <br />
                            <div className="container-row">
                                <CircleBtn
                                    iconUrl={plus}
                                    className="button-add"
                                    width="1.5em"
                                    handlePress={() => addInput("lining")}
                                />
                                <label className="clickable" onClick={() => addInput("lining")}>Add Material</label>
                            </div>
                        </div>
                        <br />
                    </div>
                )
            }
            <div className="container-checkbox">
                <div className="container-checkbox-group">
                    <input type="checkbox" id="add_padding"
                        onClick={(e) => addPadding(e.target.id)}
                        defaultChecked={formData.hasPadding}
                    />
                    <label htmlFor="add_padding">Add Padding/Filling Composition</label>
                </div>
            </div>
            {
                formData.hasPadding && (
                    <div>
                        <div>
                            <div className="container-prompt">
                                <p>Padding / Filling</p>
                            </div>
                            <div id={"padding_total_error"} style={{ textAlign: "center" }}></div>
                            {
                                formData.compositionPadding.map((inp, index) => {
                                    return (
                                        <div className="container-materials" key={"materials_padding_" + index}>
                                            <label>{index + 1}</label>
                                            {nextPaddingKey > 1 &&
                                                <div className="container-materials-remove">
                                                    <CircleBtn
                                                        iconUrl={cross}
                                                        className="button-remove"
                                                        width="0.75em"
                                                        handlePress={() => removeInput("padding", index)}
                                                    />
                                                </div>}
                                            <div className="container-materials-group">
                                                <div>
                                                    <div id={"padding_mat_" + index + "_error"}></div>
                                                    <input id={"padding_mat_" + index}
                                                        type="text"
                                                        name="compositionPadding[][value]"
                                                        placeholder="Select a fibre"
                                                        list="materials"
                                                        value={formData.compositionPadding[index].value}
                                                        onChange={(e) => {
                                                            if (isDuplicate("padding", e.target.value)) {
                                                                addErrorMessage(`padding_mat_${index}_error`, "Material already selected");
                                                            } else {
                                                                formData.compositionPadding[index].value = e.target.value;
                                                                setFormData({
                                                                    ...formData,
                                                                    compositionPadding: [...formData.compositionPadding]
                                                                });
                                                                validate("name", "padding_mat_" + index);
                                                            }
                                                        }}
                                                        required
                                                    />
                                                </div>

                                                <div className="container-col">
                                                    <div id={"padding_per_" + index + "_error"}></div>
                                                    <div className="container-input-label">
                                                        <input id={"padding_per_" + index}
                                                            type="number"
                                                            name="compositionPadding[][percent]"
                                                            placeholder="0"
                                                            value={formData.compositionPadding[index].percent}
                                                            onChange={(e) => {
                                                                formData.compositionPadding[index].percent = e.target.value;
                                                                setFormData({
                                                                    ...formData,
                                                                    compositionPadding: [...formData.compositionPadding]
                                                                });
                                                                validate("percent", "padding_per_" + index);
                                                            }}
                                                            min={0}
                                                            max={100}
                                                            step={1}
                                                            required
                                                        />
                                                        <label>%</label>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    );
                                })
                            }
                            <br />
                            <div className="container-row">
                                <CircleBtn
                                    iconUrl={plus}
                                    className="button-add"
                                    width="1.5em"
                                    handlePress={() => addInput("padding")}
                                />
                                <label className="clickable" onClick={() => addInput("padding")}>Add Material</label>
                            </div>
                        </div>
                        <br />
                    </div>
                )
            }
            <datalist
                id="materials"
            >
                {options.map((opt) => {
                    return <option key={"materials_" + opt.value}>{opt.label}</option>
                })}
            </datalist>
            <div className="container-button-form">
                {
                    page > 0 &&
                    <button type="button" className="button-form" onClick={handleBack}>Back</button>
                }
                <button
                    className="button-form"
                    onClick={validateAndNext}
                    type={page + 1 < numPages ? "button" : "submit"}
                >
                    {page + 1 < numPages ? "Next" : "Submit"}
                </button>
            </div>
        </div>
    );
}

GarmentDetails_p4.propTypes = {
    formData: PropTypes.shape({
        compositionMain: PropTypes.arrayOf(
            PropTypes.shape({
                value: PropTypes.string,
                percent: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            })
        ),
        compositionLining: PropTypes.arrayOf(
            PropTypes.shape({
                value: PropTypes.string,
                percent: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            })
        ),
        compositionPadding: PropTypes.arrayOf(
            PropTypes.shape({
                value: PropTypes.string,
                percent: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            })
        ),
        hasLining: PropTypes.bool,
        hasPadding: PropTypes.bool,
    }).isRequired,
    setFormData: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    numPages: PropTypes.number.isRequired,
    handleForward: PropTypes.func.isRequired,
    handleBack: PropTypes.func.isRequired,
};

export default GarmentDetails_p4;


