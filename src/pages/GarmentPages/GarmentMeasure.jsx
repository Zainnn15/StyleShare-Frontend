import '../../styles/main.scss';
import ScreenHeaderIn from "../../components/common/ScreenHeaderIn";
import { changeTitle } from '../../constants/functions/inputHandlers';
/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useContext, useEffect } from "react";
import { UserContext } from "../../../context/userContext";

import info from '../../assets/icons/info.png';
import { selectID } from "../../constants/functions/inputHandlers";
import { GARMENT_TYPES, GARMENT_SIZES, GARMENT_FITS, GARMENT_SIZE_TYPES } from "../../constants/data/options";
import { measurementTypes } from "../../constants/data/lists";
import PopupImg from "../../components/common/PopupImg";
import CircleBtn from "../../components/common/CircleBtn";
import { useNavigate } from "react-router-dom";
//comment out to enable selecting of garment
import { GarmentContext } from "../../../context/garmentContext";
import { findAttribute } from "../../constants/functions/valueHandlers";

const GarmentMeasurement = () => {
    changeTitle("Garment Measurement")
    const { navigate } = useNavigate();
    const { user } = useContext(UserContext);
    const {garment} = useContext(GarmentContext);
    const [formData, setFormData] = useState({
      clothingType: {value:garment.garmentType, label: findAttribute(GARMENT_TYPES, garment.garmentType)},
        garmentSizeType: '',
        garmentSize: '',
        garmentFit: '',
    });
    const options = GARMENT_TYPES;
    const measureTypes = getSetByCategory(getCategory(garment.garmentType));
    const [measures, setMeasures] = useState([
        ...measureTypes
    ]);


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

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Construct garmentMeasurements array
        const garmentMeasurements = measures.map((measureType, index) => {
            const value = parseFloat(document.getElementById("measure_" + measureType.value + "_" + index).value);
            const unit = document.getElementById("unit_" + measureType.value + "_" + index).value;
            return {
                measureType: measureType.label,
                value,
                unit,
            };
        });
    
        // Construct the payload with all necessary data
        const payload = {
            userId: user.id,
            clothingType: formData.clothingType, // Send the whole object
            garmentSize: formData.garmentSize,
            garmentFit: formData.garmentFit,
            garmentMeasurements,
        };
        
    
        try {
            const response = await axios.post('/addgarmentdetails', payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            // Handle response
            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                toast.success('Garment details updated successfully.');
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('An error occurred while updating garment details.');
        }
    };
    
    

    useEffect(() => {
        if (measures.length === 0) {
          const category = getCategory(garment.garmentType);
          const newMeasures = getSetByCategory(category);
          setMeasures(newMeasures);
        }
        // This effect should run only when `garment.garmentType` changes,
        // hence it's included in the dependency array.
      }, [garment.garmentType]);
    return (
        <div>
            <ScreenHeaderIn />
            <div className="container main">
                <div>
                    <label className="container-title">Add Garment Measurement</label>
                    <hr/>
                </div>
                <form onSubmit={handleSubmit}>
                <div>
            <div className='container-prompt' onClick={selectID("clothingType")}>
                <p>Select clothing type</p>
            </div>
            <div className='container-input'>
                <select
                    name='clothingType'
                    id='clothingType'
                    onChange={selectType}
                    value={formData.clothingType.value}
                    disabled
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
                                id={"info_temp_"+index}
                                className="container-popup"
                                iconUrl={measureType.img}
                                height="75%"
                                width="75%"
                                description={measureType.description}
                            />
                            <div className="container-prompt">
                                <p>{measureType.label}</p>
                                <CircleBtn
                                    iconUrl={info}
                                    className="button-info"
                                    width="1em"
                                    handlePress={() => {
                                        let e = document.getElementById("info_temp_"+index);
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
                            <div>
                                <div className='container-prompt'>
                                    <p>Select a measurement size type</p>
                                </div>
                                <div className="container-input">
                                    <select
                                        id='garmentSizeType'
                                        name='garmentSizeType'
                                        required
                                        onChange={(e) =>
                                            setFormData({ ...formData, garmentSizeType: e.target.value })
                                        }
                                    >
                                        <option key='size_null' value=''>
                                            Select a size type...
                                        </option>
                                        {GARMENT_SIZE_TYPES.map((opt) => {
                                            return (
                                                <option key={"size_type_" + opt.value} value={opt.value}>
                                                    {opt.label}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                        {formData.garmentSizeType === "" && <div></div>}
                        {
                            formData.garmentSizeType !== "" &&
                            (
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
                                            {GARMENT_SIZES[formData.garmentSizeType].map((opt) => {
                                                return (
                                                    <option key={"size_" + opt.value} value={opt.value}>
                                                        {opt.label}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                </div>
                            )
                        }
                        
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
                    <div className='container-input'>
                        <button className="button-form" type="submit">
                            Save
                        </button>
                    </div>
                </div>
            )}
        </div>
                </form>
            </div>
        </div>
    );
};

export default GarmentMeasurement;