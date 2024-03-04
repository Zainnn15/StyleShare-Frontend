import NavbarIn from "../../components/NavbarIn"
import '../../styles/main.scss'
import { useState } from 'react';
import First from './GarmentDetails_First';
import Second from './GarmentDetails_Second';

export default function GarmentDetails() {

    const numPages = 2;
    const [page, setPage] = useState(0);
    const [formData, setFormData] = useState({
        purchaseLocation: '',
        purchaseMethod: 'pMethod_online',
        garmentType: '',
        garmentDescription: '',
        garmentCost: '0',
        garmentDiscount: 'r_sale',
        garmentCountry: ''
    });

    const conditionalComponent = () => {

      
        switch(page) {
            case 0:
                return <First formData={formData} setFormData={setFormData}/>;
            case 1:
                return <Second formData={formData} setFormData={setFormData}/>;
            // case 2:
            //     return <Third formData={formData} setFormData={setFormData}/>;
            // case 3:
            //     return <Fourth formData={formData} setFormData={setFormData}/>;
            default:
                return <First />;
        }
    }

    function handleForward() {
        if(page+1 < numPages)
            setPage(page+1);
    }

    function handleBack() {
        setPage(page-1);
    }



  return (
    <div>
        <NavbarIn />
        <div>
            <h1>Garment Details</h1>
            <div className="container main">
                <div>
                    <label className="container-subtitle-2" style={{textAlign: "right"}}>{page+1}/{numPages}</label>
                    <label className="container-title">Garment Details</label>
                    <hr/>
                </div>
                <form action="" method="POST">
                    {conditionalComponent()}
                </form>
                <div className="container-button-form">
                    {
                        page > 0 &&
                        <button className="button-form" onClick={handleBack}>Back</button>
                    }
                    <button className="button-form" onClick={handleForward}>
                        { page+1 < numPages ? "Next" : "Submit" }
                    </button>
                </div>
            </div>
        </div></div>
  )
}
