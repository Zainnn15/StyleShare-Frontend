import Card from "../../components/common/Card";
import ScreenHeaderIn from "../../components/common/ScreenHeaderIn";
import wear from '../../assets/icons/garment_wear.png';
import wash from '../../assets/icons/garment_wash.png';
import tear from '../../assets/icons/garment_tear.png';
import feel from '../../assets/icons/garment_feel.png';
import { Link } from "react-router-dom";
import { clickID } from "../../constants/functions/inputHandlers";

export default function GarmentCare() {
    return (
        <div>
            <ScreenHeaderIn />
            <div className='container main'>
                <div className="m2-v">
                    <label className="container-title">Garment Wear & Care</label>
                    <hr/>
                </div>
                <div className="container-grid-4-lg gap">
                    <div>
                        <Card 
                            imgUrl={wear}
                            width="13em"
                            imgWidth="13em"
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
                             width="13em"
                             imgWidth="13em"
                             imgHeight="15em"
                             imgClassName={"container-card-img"}
                             title={<p className="center text-purpleLight text-midLg">Garment Wash</p>}
                             titleClassName={"container-row bg-purpleDark"}
                             description={
                                 <p className="center">
                                     Log when and how a garment is washed and dried (i.e. washing duration, used iron, etc.)
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
                            width="13em"
                            imgWidth="13em"
                            imgHeight="15em"
                            imgClassName={"container-card-img"}
                            title={<p className="center text-purpleLight text-midLg">Garment Tear</p>}
                            titleClassName={"container-row bg-purpleDark"}
                            description={
                                <p className="center">
                                    Log any tear that occurred on the garment after wearing/washing (i.e. color fading, holes, etc.)
                                </p>
                            }
                            DescClassName={"container-card-description"}
                            footer={<Link id="card_tear" style={{color:"white"}} to={"/garment-tear"}>Log Details</Link>}
                            footerClassName={"container-card-button"}
                            handlePress={()=>clickID("card_tear")}
                        />
                    </div>

                    <div>
                        <Card 
                            imgUrl={feel}
                            width="13em"
                            imgWidth="13em"
                            imgHeight="15em"
                            imgClassName={"container-card-img"}
                            title={<p className="center text-purpleLight text-midLg">Garment Feel</p>}
                            titleClassName={"container-row bg-purpleDark"}
                            description={
                                <p className="center">
                                    Log the experience of wearing the garment for a particular day
                                </p>
                            }
                            DescClassName={"container-card-description"}
                            footer={<Link id="card_feel" style={{color:"white"}} to={"/garment-feel"}>Log Details</Link>}
                            footerClassName={"container-card-button"}
                            handlePress={()=>clickID("card_feel")}
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}