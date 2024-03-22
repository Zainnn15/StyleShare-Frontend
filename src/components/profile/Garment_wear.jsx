/* eslint-disable react/prop-types */
import { getImageFromURL } from '../../constants/functions/valueHandlers';
import '../../styles/main.scss';

const Garment_wear = ({garment}) => {
    return(
        <div className="m1">
            <label className="container-subtitle-2">{garment.wearDate}</label>
            <div className="container-grid-3-md gap container-border clear-box">
                <div>
                    <p>
                    <label className="text-b">Wear Time (hours):<label className="tab"></label></label>
                    {garment.wearTime}
                    </p>
                </div>
                <div>
                    <p>
                    <label className="text-b">Front Photo:<label className="tab"></label></label>
                    </p>
                    <div className='container-input-img img-size-sm'>
                        <img src={getImageFromURL(garment.WearFront)} alt="front"/>
                    </div>
                </div>
                <div>
                    <p>
                    <label className="text-b">Back Photo:<label className="tab"></label></label>
                    </p>
                    <div className='container-input-img img-size-sm'>
                        <img src={getImageFromURL(garment.WearBack)} alt="back"/>
                    </div>
                </div>
            </div>
            <br/>
        </div>
    )
}

export default Garment_wear;