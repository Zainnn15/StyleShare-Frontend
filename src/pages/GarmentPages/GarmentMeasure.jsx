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
import { findAttribute, formatDate } from "../../constants/functions/valueHandlers";
import Axios from "axios";

const GarmentMeasurement = () => {
    changeTitle("Garment Measurement");
    const navigate = useNavigate();
    const { user, loading: userLoading } = useContext(UserContext);
    const [garment, setGarment] = useState(null);
    const [garmentList, setGarmentList] = useState([]);
    const [formData, setFormData] = useState({
        clothingType: '',
        garmentSizeType: '',
        garmentSize: '',
        garmentFit: '',
    });
    const [measures, setMeasures] = useState([]);
    const [unit, setUnit] = useState('cm'); // State to manage the unit
    const options = GARMENT_TYPES;

    useEffect(() => {
        if (!userLoading && user && user._id) {
            Axios.get(`/getGarmentDetails/${user._id}`, { withCredentials: true })
                .then(response => {
                    const garmentData = response.data;
                    console.log('Garment Data:', garmentData); // Logging fetched data

                    if (Array.isArray(garmentData) && garmentData.length > 0) {
                        const userGarments = garmentData.filter(g => g.user === user._id && g.originalOwner === user._id);
                        setGarmentList(userGarments);
                        if (userGarments.length > 0) {
                            setGarment(userGarments[0]);
                            initializeFormData(userGarments[0]);
                        }
                    } else if (garmentData) {
                        if (garmentData.user === user._id && garmentData.originalOwner === user._id) {
                            setGarmentList([garmentData]);
                            setGarment(garmentData);
                            initializeFormData(garmentData);
                        } else {
                            console.error('No garment data found');
                        }
                    } else {
                        console.error('No garment data found');
                    }
                })
                .catch(error => console.error('Error fetching garment details:', error));
        }
    }, [user, userLoading]);

    const initializeFormData = (garment) => {
        const clothingType = findAttribute(GARMENT_TYPES, garment.garmentType);
        console.log('Initializing Form Data:', clothingType, garment.garmentType); // Logging form initialization
        setFormData({
            ...formData,
            clothingType: { value: garment.garmentType, label: clothingType ? clothingType.label : garment.garmentType },
        });
        const measures = getSetByCategory(getCategory(garment.garmentType));
        setMeasures(measures);
    };

    const selectType = (event) => {
        const temp = getSetByCategory(getCategory(event.target.value));
        setMeasures(temp);
        setFormData({
            ...formData,
            clothingType: {
                value: event.target.value,
                label: findAttribute(GARMENT_TYPES, event.target.value).label
            }
        });
    };

    const getCategory = (val) => {
        const option = options.find(o => o.value === val);
        return option ? option.cat : -1;
    };

    const getSetByCategory = (catID) => {
        return measurementTypes.filter(obj => obj.categories.includes(catID));
    };

    const handleUnitChange = (e) => {
        const newUnit = e.target.value;
        setUnit(newUnit);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user || !user._id) {
            toast.error("Unable to identify user. Please make sure you are logged in.");
            return;
        }

        const garmentMeasurements = measures.map((measureType, index) => {
            const valueElement = document.getElementById(`measure_${measureType.value}_${index}`);
            return {
                measureType: measureType.label,
                value: parseFloat(valueElement ? valueElement.value : '0'),
                unit: unit,
            };
        }).filter(measure => measure.value > 0);

        const payload = {
            userId: user._id,
            garmentId: garment._id,
            clothingType: formData.clothingType,  // Send as an object
            garmentSizeType: formData.garmentSizeType,
            garmentSize: formData.garmentSize,
            garmentFit: formData.garmentFit,
            garmentMeasurements,
        };

        try {
            const response = await axios.post('/updateGarmentDetails', payload, {
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                toast.success('Garment measurement details updated successfully.');
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('An error occurred while updating garment details.');
        }
    };

    return (
        <div>
            <ScreenHeaderIn />
            <div className="container main">
                <div>
                    <label className="container-title">Add Garment Measurement</label>
                    <hr/>
                </div>

                {garment && garment.garmentType && (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <div>
                                <p className="container-subtitle-2">Selected Garment</p>
                                <select
                                    onChange={(e) => {
                                        const index = e.target.value;
                                        if (index >= 0 && index < garmentList.length) {
                                            const selectedGarment = garmentList[index];
                                            setGarment(selectedGarment);
                                            setFormData({
                                                ...formData,
                                                clothingType: {
                                                    value: selectedGarment.garmentType,
                                                    label: findAttribute(GARMENT_TYPES, selectedGarment.garmentType).label,
                                                },
                                            });
                                            const category = getCategory(selectedGarment.garmentType);
                                            const newMeasures = getSetByCategory(category);
                                            setMeasures(newMeasures);
                                        }
                                    }}
                                    value={garmentList.findIndex((g) => g._id === garment._id)}
                                >
                                    {garmentList.map((garmentOpt, index) => (
                                        <option key={"garmentOpt_" + index} value={index}>
                                            {garmentOpt.garmentDescription} ({formatDate(garmentOpt.purchaseDate)})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='container-prompt' onClick={() => selectID("clothingType")}>
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
                                    {options.map((opt) => (
                                        <option key={"type_" + opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="container-grid-2-md">
                                {measures.map((measureType, index) => (
                                    <div key={"measureSet_" + measureType.value + "_" + index}>
                                        <PopupImg
                                            id={"info_temp_" + index}
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
                                                    let e = document.getElementById("info_temp_" + index);
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
                                                value={unit}
                                                onChange={handleUnitChange}
                                            >
                                                <option value='cm'> cm </option>
                                                <option value='inches'> in </option>
                                            </select>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {measures.length > 0 && (
                                <div>
                                    <div className="container-grid-2-md">
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
                                                    {GARMENT_SIZE_TYPES.map((opt) => (
                                                        <option key={"size_type_" + opt.value} value={opt.value}>
                                                            {opt.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        {formData.garmentSizeType === "" && <div></div>}
                                        {formData.garmentSizeType !== "" && (
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
                                                        {GARMENT_SIZES[formData.garmentSizeType].map((opt) => (
                                                            <option key={"size_" + opt.value} value={opt.value}>
                                                                {opt.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        )}
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
                                                    {GARMENT_FITS.map((opt) => (
                                                        <option key={"fit_" + opt.value} value={opt.value}>
                                                            {opt.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='container-input'>
                                        <button className="button-form" type="submit">
                                            Save
                                        </button>
                                        <button className="button-form" type="reset">
                                             Reset
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default GarmentMeasurement;
