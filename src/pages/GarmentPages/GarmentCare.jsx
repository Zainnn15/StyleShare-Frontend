import Card from "../../components/common/Card";
import ScreenHeaderIn from "../../components/common/ScreenHeaderIn";
import wear from '../../assets/icons/garment_wear.png';
import wash from '../../assets/icons/garment_wash.png';
import tear from '../../assets/icons/garment_tear.png';
import { Link } from "react-router-dom";
import { clickID } from "../../constants/functions/inputHandlers";

export default function GarmentCare() {
    return (
        <div>
            <ScreenHeaderIn />
            <div className='container main'>
                <div className="m2-v">
                    <label className="container-title">Garment Care</label>
                    <hr/>
                </div>
                <div className="container-grid-3-md gap">
                    <div>
                        <Card 
                            imgUrl={wear}
                            imgHeight="15em"
                            imgClassName={"container-card-img"}
                            title={<p className="center text-purpleLight text-midLg">Garment Wear</p>}
                            titleClassName={"container-row bg-purpleDark"}
                            description={
                                <p className="center">
                                    Log wear details of the garment after use on a specific day such as number of hours worn
                                </p>
                            }
                            DescClassName={"container-card-description"}
                            footer={<Link id="card_wear" style={{color:"white"}} to={"/garment-wear"}>Log Details</Link>}
                            footerClassName={"container-card-button"}
                            handlePress={()=>clickID("card_wear")}
                        />
                    </div>
                
                    <div>
                        <Card 
                             imgUrl={wash}
                             imgHeight="15em"
                             imgClassName={"container-card-img"}
                             title={<p className="center text-purpleLight text-midLg">Garment Wash</p>}
                             titleClassName={"container-row bg-purpleDark"}
                             description={
                                 <p className="center">
                                     Log when and how a garment is washed and dried (i.e. washing duration, drying method, used iron, etc.)
                                 </p>
                             }
                             DescClassName={"container-card-description"}
                             footer={<Link id="card_wash" style={{color:"white"}} to={"/garment-wash"}>Log Details</Link>}
                             footerClassName={"container-card-button"}
                             handlePress={()=>clickID("card_wash")}
                        />
                    </div>
                    
                    <div>
                        <Card 
                            imgUrl={tear}
                            imgHeight="15em"
                            imgClassName={"container-card-img"}
                            title={<p className="center text-purpleLight text-midLg">Garment Tear</p>}
                            titleClassName={"container-row bg-purpleDark"}
                            description={
                                <p className="center">
                                    Log any tear that occurred on the garment after wearing/washing (i.e. color fading, loose buttons, holes, etc.)
                                </p>
                            }
                            DescClassName={"container-card-description"}
                            footer={<Link id="card_tear" style={{color:"white"}} to={"/garment-tear"}>Log Details</Link>}
                            footerClassName={"container-card-button"}
                            handlePress={()=>clickID("card_tear")}
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}