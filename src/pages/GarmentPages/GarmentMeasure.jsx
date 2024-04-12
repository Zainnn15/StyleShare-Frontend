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
//import { GarmentContext } from "../../../context/garmentContext";
import { findAttribute, formatDate } from "../../constants/functions/valueHandlers";
import Axios from "axios";

const GarmentMeasurement = () => {
    changeTitle("Garment Measurement")
    const navigate  = useNavigate();
    const { user, loading: userLoading } = useContext(UserContext);
    const [setProfile] = useState(null);
    const [garment, setGarment] = useState(null); 
    const [garmentList, setGarmentList] = useState([]);
    //const { user } = useContext(UserContext);
    //const {garment} = useContext(GarmentContext);
    const [formData, setFormData] = useState({
        clothingType: '',
        garmentSizeType: '',
        garmentSize: '',
        garmentFit: '',
    });
    const options = GARMENT_TYPES;
    const [measures, setMeasures] = useState([]);

    //get user and garment data
    useEffect(() => {
        if (!userLoading && user && user._id) {
          // Fetch user profile
          Axios.get('/profile', { withCredentials: true })
          .then((response) => {
            const data = response.data;
            setProfile(data); // Assuming this sets user-specific profile details
          })
          .catch((error) => console.error('Error fetching user profile:', error));
      
          // Fetch garment details based on the user ID
          Axios.get(`/getGarmentDetails/${user._id}`, { withCredentials: true })
        .then((response) => {
          const garmentData = response.data;
          //console.log('Garment Details:', garmentData);
          //setGarmentDetails(garmentData); // Assuming this sets specific garment details
          if(Array.isArray(garmentData) && garmentData.length > 0) {
            setGarmentList(garmentData);
            setGarment(garmentData[0]);
            return garmentData[0];
          }
          else {
            setGarmentList([...garmentData]); // Assuming this sets specific garment details
            setGarment(garmentData);
            return garmentData;
          }
          // No need to sort here as we'll handle sorting directly where the data is rendered to ensure reactivity
          
        })
        .then((data) => {
          //initialize garment
          if(data) {
            setFormData({
                ...formData, 
                clothingType: {value:data.garmentType, label: findAttribute(GARMENT_TYPES, data.garmentType)}
            });
            setMeasures([...getSetByCategory(getCategory(data.garmentType))]);
            if (measures.length === 0) {
                const category = getCategory(data.garmentType);
                const newMeasures = getSetByCategory(category);
                setMeasures(newMeasures);
            }
          }
        })
        .catch((error) => console.error('Error fetching garment details:', error));
  
        }
  
      }, [user, userLoading]);
      //if (userLoading || garmentLoading) {
      if (userLoading) {
        return <div>Loading...</div>; // Show loading state while data is being fetched
      }
      //if (!user || !garment) {
      if (!user) {
        return <div>No user or garment data available.</div>; // Show a message or redirect if data is not available
      }

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
    
        if (!user || !user._id) {
            console.error("User ID is not available.");
            toast.error("Unable to identify user. Please make sure you are logged in.");
            return;
        }
    
        const garmentMeasurements = measures.map((measureType, index) => {
            const valueElement = document.getElementById(`measure_${measureType.value}_${index}`);
            const unitElement = document.getElementById(`unit_${measureType.value}_${index}`);
            return {
                measureType: measureType.label,
                value: parseFloat(valueElement ? valueElement.value : '0'),
                unit: unitElement ? unitElement.value : 'cm',
            };
        }).filter(measure => measure.value > 0); // Ensure only measurements with valid values are included

        const clothingType = {
            value: formData.clothingType.value,
            label: findAttribute(GARMENT_TYPES, formData.clothingType.value).label,
        };
    
        // Construct the payload
        const payload = {
            userId: user._id,
            clothingType,
            garmentSizeType: formData.garmentSizeType,
            garmentSize: formData.garmentSize,
            garmentFit: formData.garmentFit,
            garmentMeasurements: JSON.stringify(garmentMeasurements), // Stringify for correct format
        };
    
        try {
            const response = await axios.post('/addgarmentdetails', payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
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
    
    
    

    // useEffect(() => {
    //     if (measures.length === 0) {
    //       const category = getCategory(garment.garmentType);
    //       const newMeasures = getSetByCategory(category);
    //       setMeasures(newMeasures);
    //     }
    //     // This effect should run only when `garment.garmentType` changes,
    //     // hence it's included in the dependency array.
    //   }, [garment.garmentType]);

    //console.log(garment);

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
                onChange={(e)=>{
                if(e.target.value < garmentList.length) {
                    let data = garmentList[e.target.value];
                    setGarment(data);
                              //initialize garment
                    setFormData({
                        ...formData, 
                        clothingType: {value:data.garmentType, label: findAttribute(GARMENT_TYPES, data.garmentType)}
                    });
                    setMeasures([...getSetByCategory(getCategory(data.garmentType))]);
                    if (measures.length === 0) {
                        const category = getCategory(data.garmentType);
                        const newMeasures = getSetByCategory(category);
                        setMeasures(newMeasures);
                    }
                }
                }}
            >
                {
                garmentList && garmentList.length > 0 &&
                garmentList.map((garmentOpt, index) => {
                    return (
                    <option key={"garmentOpt_"+index} value={index}>
                        {findAttribute(GARMENT_TYPES, garmentOpt.garmentType)} ({formatDate(garmentOpt.purchaseDate)})
                    </option>
                    )
                }) 
                }
            </select>
            </div>
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
        )}
            </div>
        </div>
    );
};

export default GarmentMeasurement;