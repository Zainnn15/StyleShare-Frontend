/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useContext, useEffect } from "react";
import { UserContext } from "../../../context/userContext";

import '../../styles/main.scss';

import info from '../../assets/icons/info.png';
import { selectID } from "../../constants/functions/inputHandlers";
import { GARMENT_TYPES, GARMENT_SIZES, GARMENT_FITS, GARMENT_SIZE_TYPES } from "../../constants/data/options";
import { measurementTypes } from "../../constants/data/lists";
import PopupImg from "../common/PopupImg";
import CircleBtn from "../common/CircleBtn";
import { useNavigate } from "react-router-dom";
//comment out to enable selecting of garment
import { GarmentContext } from "../../../context/garmentContext";
import { findAttribute } from "../../constants/functions/valueHandlers";

const GarmentMeasurements = () => {
    const { navigate } = useNavigate();
    const { user } = useContext(UserContext);
    const {garment} = useContext(GarmentContext);
    const [formData, setFormData] = useState({
      clothingType: {value:garment.garmentType, label: findAttribute(GARMENT_TYPES, garment.garmentType)},
        garmentSizeType: '',
        garmentSize: '',
        garmentFit: '',
        fileFront: null,
        fileBack: null,
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

    const handleFileChange = (event, type) => {
        const file = event.target.files[0];
        setFormData({ ...formData, [type]: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const { clothingType, garmentSize, garmentFit } = formData;
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
    
        // Prepare form data to include measurement details
        const formDataToSend = new FormData();
        formDataToSend.append('userId', user.id);
        formDataToSend.append('clothingType', clothingType.value); // Adjusted to send the value directly
        formDataToSend.append('garmentSize', garmentSize);
        formDataToSend.append('garmentFit', garmentFit);
        if (formData.fileFront) formDataToSend.append('fileFront', formData.fileFront);
        if (formData.fileBack) formDataToSend.append('fileBack', formData.fileBack);
        formDataToSend.append('garmentMeasurements', JSON.stringify(garmentMeasurements));
    
        try {
            const { data } = await axios.post(
                '/addgarmentdetails',
                formDataToSend,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
    
            // Handle response
            if (data.error) {
                toast.error(data.error);
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
        <h1></h1>
    );
}

export default GarmentMeasurements;