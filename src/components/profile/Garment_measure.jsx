/* eslint-disable react/prop-types */
import '../../styles/main.scss';
import { findAttribute, formatDate } from '../../constants/functions/valueHandlers';
import { GARMENT_TYPES } from '../../constants/data/options';

const Garment_measure = ({garment}) => {
    return(
        <div className='m1'>
            <label className="container-subtitle-2">Original ({formatDate(garment.purchaseDate)})</label>
            <div className="container-grid-2-md gap container-border clear-box">
                <div>
                    <p>
                    <label className="text-b">Garment Type:<label className="tab"></label></label>
                    {findAttribute(GARMENT_TYPES, garment.garmentType)}
                    </p>
                    <p>
                    <label className="text-b">Garment Size:<label className="tab"></label></label>
                    {garment.garmentSize}
                    </p>
                    <p>
                    <label className="text-b">Garment Fit:<label className="tab"></label></label>
                    {garment.garmentFit}
                    </p>
                </div>

                <div>
                {
                    garment.garmentMeasurements.map((type, index) => {
                    return (
                        <div key={"measureType_"+index}>
                            <div>
                            <p>
                                <label className="text-b">{type.measureType}:<label className="tab"></label></label>
                                {`${type.value} ${type.unit}`}
                            </p>
                            </div>
                        </div>
                    )
                    })
                }
                </div>

                </div>
        </div>
    )
}

export default Garment_measure;