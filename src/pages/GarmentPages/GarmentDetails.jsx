import moment from "moment";
import axios from "axios";

import '../../styles/main.scss';

import { useContext, useState } from "react";
import { UserContext } from "../../../context/userContext";
import { changeTitle } from "../../constants/functions/inputHandlers";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import ScreenHeaderIn from "../../components/common/ScreenHeaderIn";
import First from '../../components/garment_details/GarmentDetails_p1.jsx';
import Second from '../../components/garment_details/GarmentDetails_p2.jsx';
import Third from '../../components/garment_details/GarmentDetails_p3.jsx';
import Fourth from '../../components/garment_details/GarmentDetails_p4.jsx';
import Fifth from '../../components/garment_details/GarmentDetails_p5.jsx';
import Sixth from '../../components/garment_details/GarmentDetails_p6.jsx';
import Seventh from '../../components/garment_details/GarmentDetails_p7.jsx';
import Eight from '../../components/garment_details/GarmentDetails_p8.jsx';
import Ninth from '../../components/garment_details/GarmentDetails_p9.jsx';

const GarmentDetails = () => {
    const navigate = useNavigate();
    const {user} = useContext(UserContext);
    const numPages = 9;
    const [page, setPage] = useState(0);
    const [formData, setFormData] = useState({
        purchaseLocation: '',
        purchaseMethod: '',
        purchaseDate: moment(new Date()).format('YYYY-MM-DD'),
        garmentType: '',
        garmentDescription: '',
        fileFront: '',
        fileBack: '',
        garmentCountry: '',
        garmentCost: '',
        garmentDiscount: '',
        garmentOgCost: '',
        compositionMain: [{ value: '', percent: '' }],
        compositionLining: [],
        compositionPadding: [],
        hasLining: false,
        hasPadding: false,
        instructionWash: {
            "Wash": "",
            "Machine": "",
            "Heat": "",
            "Degree": "",
            "Temp":""
        },
        instructionDry: {
            "Dry": "",
            "DryType": "",
            "Shade": "",
        },
        instructionTumble: {
            "Tumble": "",
            "Air": "",
            "Shade": "",
            "Delicate": "",
            "Heat": "",
        },
        instructionDryC: {
            "DryC": "",
            "Solvent": "",
            "Care": "",
        },
        instructionIron: {
            "Iron": "",
            "Heat": "",
        },
        instructionBleach: {
            "Bleach": "",
            //"Chloride": "",
        },
        willSubmit: false
    });

    const conditionalComponent = () => {
        switch(page) {
            case 1:
                return <Second 
                    formData={formData} 
                    setFormData={setFormData}
                    page={page} 
                    numPages={numPages}
                    handleForward={handleForward}
                    handleBack={handleBack}
                />;
            case 2:
                return <Third 
                    formData={formData} 
                    setFormData={setFormData}
                    page={page} 
                    numPages={numPages}
                    handleForward={handleForward}
                    handleBack={handleBack}
                />;
            case 3:
                return <Fourth 
                    formData={formData} 
                    setFormData={setFormData} 
                    page={page} 
                    numPages={numPages}
                    handleForward={handleForward}
                    handleBack={handleBack}
                />;
            case 4:
                return <Fifth 
                    formData={formData} 
                    setFormData={setFormData}
                    page={page} 
                    numPages={numPages}
                    handleForward={handleForward}
                    handleBack={handleBack}
                />;
            case 5:
                return <Sixth 
                    formData={formData} 
                    setFormData={setFormData}
                    page={page} 
                    numPages={numPages}
                    handleForward={handleForward}
                    handleBack={handleBack}
                />;
            case 6:
                return <Seventh
                    formData={formData} 
                    setFormData={setFormData}
                    page={page} 
                    numPages={numPages}
                    handleForward={handleForward}
                    handleBack={handleBack}
                />;
            case 7:
                return <Eight 
                    formData={formData} 
                    setFormData={setFormData}
                    page={page} 
                    numPages={numPages}
                    handleForward={handleForward}
                    handleBack={handleBack}
                />;
            case 8:
                return <Ninth
                    formData={formData} 
                    setFormData={setFormData}
                    page={page} 
                    numPages={numPages}
                    handleBack={handleBack}
                />;
            default:
                return <First 
                    formData={formData} 
                    setFormData={setFormData}
                    page={page} 
                    numPages={numPages}
                    handleForward={handleForward}
                    handleBack={handleBack}
                />;
        }
    }

    function handleForward() {
        if(page+1 < numPages)
            setPage(page+1);
    }

    function handleBack() {
        setPage(page-1);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Ensure you are checking the correct identifier as per your user object
        if (!user || !user._id) { // Assuming your user object has an _id property
            console.error("User ID is not available.");
            toast.error("Unable to identify user. Please make sure you are logged in.");
            return;
        }
    
        const uploadFormData = new FormData();
        // Directly append file objects
        if (formData.fileFront) uploadFormData.append('fileFront', formData.fileFront);
        if (formData.fileBack) uploadFormData.append('fileBack', formData.fileBack);
    
        // Append other form data
        const fieldsToDirectlyAppend = [
            'purchaseLocation', 'purchaseMethod', 'purchaseDate', 'garmentType', 
            'garmentDescription', 'garmentCountry', 'garmentCost', 'garmentDiscount', 
            'garmentOgCost', 'hasLining', 'hasPadding'
        ];
        
        fieldsToDirectlyAppend.forEach(field => {
            uploadFormData.append(field, formData[field]);
        });
    
        // For the willSubmit boolean, convert to string
        uploadFormData.append("willSubmit", formData.willSubmit.toString());
    
        // For complex objects or arrays, ensure they are stringified
        const complexFields = [
            'compositionMain', 'compositionLining', 'compositionPadding', 
            'instructionWash', 'instructionDry', 'instructionTumble', 
            'instructionDryC', 'instructionIron', 'instructionBleach'
        ];
        complexFields.forEach(field => {
            uploadFormData.append(field, JSON.stringify(formData[field]));
        });
    
        // Append user ID correctly
        uploadFormData.append("userId", user._id); // Adjust based on your user object's structure
    
        try {
            const response = await axios.post('/addgarmentdetails', uploadFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true, // Correct placement for withCredentials
            });
    
            const { data } = response;
    
            if (data.error) {
                toast.error(data.error);
            } else {
                // Reset form data upon successful submission
                setFormData({
                  
                });
                toast.success("Garment details added successfully!");
                navigate('/dashboard'); // Or any other path as needed
            }
        } catch (error) {
            console.error('Submission error:', error);
            toast.error("An error occurred while submitting the form.");
        }
    };
    
    

    changeTitle("Garment Details")
    return (
        <div>
            <ScreenHeaderIn />
            <div className="container main">
                <div>
                    <label className="container-subtitle-2" style={{textAlign: "right"}}>{page+1}/{numPages}</label>
                    <label className="container-title">Garment Details</label>
                    <hr/>
                </div>
                <form action="" method="POST" onSubmit={handleSubmit}>
                    {conditionalComponent()}
                </form>
            </div>
        </div>
    );
};

export default GarmentDetails;