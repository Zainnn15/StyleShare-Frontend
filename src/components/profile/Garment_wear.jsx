/* eslint-disable react/prop-types */
import { formatDate, getImageFromURL } from '../../constants/functions/valueHandlers.jsx';
import '../../styles/main.scss';

const Garment_wear = ({garment}) => {
    return(
        <div className="m1">
            {
                garment && garment.wearInfo.map((wear)=>{
                return (
                    <div key={wear._id}>
                        <label className="container-subtitle-2">{formatDate(wear.wearDate)}</label>
                        <div className="container-grid-3-md gap container-border clear-box">
                            <div>
                                <p>
                                <label className="text-b">Wear Time (hours):<label className="tab"></label></label>
                                {wear.wearTime}
                                </p>
                            </div>
                            <div>
                                <p>
                                <label className="text-b">Front Photo:<label className="tab"></label></label>
                                </p>
                                <div className='container-input-img img-size-sm'>
                                    <img src={getImageFromURL(wear.wearFront)} alt="front"/>
                                </div>
                            </div>
                            <div>
                                <p>
                                <label className="text-b">Back Photo:<label className="tab"></label></label>
                                </p>
                                <div className='container-input-img img-size-sm'>
                                    <img src={getImageFromURL(wear.wearBack)} alt="back"/>
                                </div>
                            </div>
                        </div>
                        <br/>
                    </div>
                )})
            }
            
            <br/>
        </div>
    )
}

export default Garment_wear;