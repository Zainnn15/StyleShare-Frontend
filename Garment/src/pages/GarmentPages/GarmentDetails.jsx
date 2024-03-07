import moment from "moment";
import '../../styles/main.scss';
import { useContext, useState } from "react";
import { UserContext } from "../../../context/userContext";
import First from './GarmentDetails_First';
import Second from './GarmentDetails_Second';
import Third from './GarmentDetails_Third';
import Fourth from './GarmentDetails_Fourth';
import Fifth from './GarmentDetails_Fifth';
import Sixth from './GarmentDetails_Sixth';
import Seventh from './GarmentDetails_Seventh';
import Eight from './GarmentDetails_Eighth';
import Ninth from './GarmentDetails_Ninth';
import Tenth from './GarmentDetails_Tenth';
import { changeTitle } from "../../constants/inputHandlers";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import NavbarIn from "../../components/NavbarIn";

const GarmentDetails = () => {
    const navigate = useNavigate();
    const {user} = useContext(UserContext);
    const numPages = 10;
    const [page, setPage] = useState(0);
    const [formData, setFormData] = useState({
        purchaseLocation: '',
        purchaseMethod: '',
        purchaseDate: moment(new Date()).format('YYYY-MM-DD'),
        garmentType: '',
        garmentDescription: '',
        garmentCountry: '',
        garmentCost: '',
        garmentDiscount: '',
        compositionMain: [{ value: '', percent: '' }],
        compositionLining: [],
        compositionPadding: [],
        hasLining: false,
        hasPadding: false,
        instructionWash: {
            "Wash": "",
            "Machine": "",
            "Delicate": "",
            "Temp":""
        },
        instructionDry: {
            "Dry": "",
            "DryType": "",
            "Shade": "",
        },
        instructionTumble: {
            "Tumble": "",
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
            "Chloride": "",
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
                    handleForward={handleForward}
                    handleBack={handleBack}
                />;
            case 9:
                return <Tenth
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
        const {purchaseLocation, purchaseMethod, purchaseDate, garmentType, garmentDescription, garmentCountry, garmentCost, garmentDiscount, compositionMain, compositionLining, compositionPadding, hasLining, hasPadding, instructionWash, instructionDry, instructionTumble, instructionDryC, instructionIron, instructionBleach, willSubmit} = formData;
        try {
            const {data} = await axios.post('/addgarmentdetails', {userId: user.id, purchaseLocation, purchaseMethod, purchaseDate, garmentType, garmentDescription, garmentCountry, garmentCost, garmentDiscount, compositionMain, compositionLining, compositionPadding, hasLining, hasPadding, instructionWash, instructionDry, instructionTumble, instructionDryC, instructionIron, instructionBleach, willSubmit})
            if (data.error) {
                toast.error(data.error);
            } else {
                setFormData({})
                toast.success(data.message);
                navigate('/dashboard');
            }
        } catch (error) {
            console.log(error);
        }
    }

    changeTitle("Garment Details")
    return (
        <div>
            <NavbarIn/>
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