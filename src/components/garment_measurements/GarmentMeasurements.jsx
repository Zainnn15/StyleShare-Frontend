/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useContext } from "react";
import { UserContext } from "../../../context/userContext";

import '../../styles/main.scss';

import info from '../../assets/icons/info.png';
import { selectID } from "../../constants/functions/inputHandlers";
import { GARMENT_TYPES, GARMENT_SIZES, GARMENT_FITS } from "../../constants/data/options";
import { measurementTypes } from "../../constants/data/lists";
import PopupImg from "../common/PopupImg";
import CircleBtn from "../common/CircleBtn";
import { useNavigate } from "react-router-dom";

const GarmentMeasurements = () => {
    const { navigate } = useNavigate();
    const { user } = useContext(UserContext);
    const [measures, setMeasures] = useState([]);
    const [formData, setFormData] = useState({
      clothingType: {},
        garmentSize: '',
        garmentFit: '',
        fileFront: null,
        fileBack: null,
    });

    const options = GARMENT_TYPES;

    const selectType = (event) => {
        // clear previous
        measures.forEach((obj, index) => {
            let e_measure = document.getElementById("measure_" + obj.value + "_" + index);
            if (e_measure) {
                e_measure.value = "";
            }
            let e_unit = document.getElementById("unit_" + obj.value + "_" + index);
            if (e_unit) {
                e_unit.value = "cm";
            }
        });
        let temp = getSetByCategory(getCategory(event.target.value));
        setMeasures([...temp]);
        setFormData({ ...formData,   clothingType: { value: event.target.value, label: event.target.value } });
    };

    function getCategory(val) {
        let category = -1;
        for (let i = 0; i < options.length; i++) {
            if (options[i].value === val) {
                category = options[i].cat;
                break;
            }
        }
        return category;
    }

    function getSetByCategory(catID) {
        let objArr = [];
        measurementTypes.forEach((obj) => {
            if (obj.categories.includes(catID)) {
                objArr.push(obj);
            }
        });
        return objArr;
    }

    const handleFileChange = (event, type) => {
        const file = event.target.files[0];
        console.log("Selected file:", file); // Check if the file is correctly selected
        setFormData((prevFormData) => ({
            ...prevFormData,
            [type]: file,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { clothingType, garmentSize, garmentFit, fileFront, fileBack } = formData;
    
        // Stringify the garmentMeasurements array
        const garmentMeasurementsString = JSON.stringify(
            measures.map((measureType, index) => {
                const value = parseFloat(document.getElementById("measure_" + measureType.value + "_" + index).value);
                const unit = document.getElementById("unit_" + measureType.value + "_" + index).value;
                return {
                    measureType: measureType.label,
                    value,
                    unit
                };
            })
        );
    
        try {
            const { data } = await axios.post(
                '/addgarmentdetails',
                {
                    userId: user.id,
                    clothingType: clothingType.value,
                    garmentSize,
                    garmentFit,
                    fileFront,
                    fileBack,
                    garmentMeasurements: garmentMeasurementsString  // Send garmentMeasurements as a JSON string
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
    
            // Handle response as needed
            if (data.error) {
                toast.error(data.error);
            } else {
                setFormData({
                    clothingType: '',
                    garmentSize: '',
                    garmentFit: '',
                    fileFront: null,
                    fileBack: null,
                });
                toast.success(data.message);
    
                navigate('/dashboard');
                // Add any additional logic or redirection after successful submission
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
    
    
    
    
    
    return (
        <div>
            <div className='container-prompt' onClick={selectID("clothingType")}>
                <p>Select clothing type</p>
            </div>
            <div className='container-input'>
                <select
                    name='clothingType'
                    id='clothingType'
                    onChange={selectType}
                >
                    <option key='type_null' value=''>
                        Select a garment...
                    </option>
                    {options.map((opt) => {
                        return (
                            <option key={"type_" + opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        );
                    })}
                </select>
            </div>

            <div className="container-grid-2-md">
                {measures.map((measureType, index) => {
                    return (
                        <div key={"measureSet_" + measureType.value + "_" + index}>
                            <PopupImg
                                id="info_temp"
                                className="container-popup"
                                iconUrl={measureType.img}
                                height="75%"
                                width="75%"
                            />
                            <div className="container-prompt">
                                <p>{measureType.label}</p>
                                <CircleBtn
                                    iconUrl={info}
                                    className="button-info"
                                    width="1em"
                                    handlePress={() => {
                                        let e = document.getElementById("info_temp");
                                        if (e) {
                                            e.classList.toggle("hide", false);
                                        }
                                    }}
                                />
                            </div>
                            <div className="container-measure-group">
                                <input
                                    id={"measure_" + measureType.value + "_" + index}
                                    name={"measure_" + measureType.value}
                                    type='number'
                                    min={0}
                                    step={0.01}
                                    required
                                />
                                <select
                                    id={"unit_" + measureType.value + "_" + index}
                                    name={"unit_" + measureType.value}
                                >
                                    <option value='cm'> cm </option>
                                    <option value='inches'> in </option>
                                </select>
                            </div>
                        </div>
                    );
                })}
            </div>

            {measures.length > 0 && (
                <div>
                    <div className="container-grid-2-md">
                        <div>
                            <div className='container-prompt'>
                                <p>Enter the size of the garment</p>
                            </div>
                            <div className="container-input">
                                <select
                                    id='garmentSize'
                                    name='garmentSize'
                                    required
                                    onChange={(e) =>
                                        setFormData({ ...formData, garmentSize: e.target.value })
                                    }
                                >
                                    <option key='size_null' value=''>
                                        Select a size...
                                    </option>
                                    {GARMENT_SIZES.map((opt) => {
                                        return (
                                            <option key={"size_" + opt.value} value={opt.value}>
                                                {`${opt.label} (${opt.value.toUpperCase()})`}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                        <div>
                            <div className='container-prompt'>
                                <p>How well does it fit?</p>
                            </div>
                            <div className='container-input'>
                                <select
                                    id='garmentFit'
                                    name='garmentFit'
                                    required
                                    onChange={(e) =>
                                        setFormData({ ...formData, garmentFit: e.target.value })
                                    }
                                >
                                    <option key='fit_null' value=''>
                                        Select a fit...
                                    </option>
                                    {GARMENT_FITS.map((opt) => {
                                        return (
                                            <option key={"fit_" + opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="container-grid-2-md">
                        <div>
                            <div className='container-prompt'>
                                <p>Select a photo of the garment (Front)</p>
                            </div>
                            <div className="container-input">
                                <input
                                    id="fileFront"
                                    name="fileFront"
                                    type="file"
                                    required
                                    onChange={(e) => handleFileChange(e, "fileFront")}
                                />
                            </div>
                        </div>
                        <div>
                            <div className='container-prompt'>
                                <p>Select a photo of the garment (Back)</p>
                            </div>
                            <div className='container-input'>
                                <input
                                    id="fileBack"
                                    name="fileBack"
                                    type='file'
                                    required
                                    onChange={(e) => handleFileChange(e, "fileBack")}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='container-input'>
                        <button className="button-form" type="submit" onClick={handleSubmit}>
                            Save
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GarmentMeasurements;