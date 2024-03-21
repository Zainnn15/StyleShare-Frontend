/* eslint-disable react/prop-types */
import '../../styles/main.scss';
import { findAttribute, formatDate } from '../../constants/functions/valueHandlers';
import { GARMENT_TYPES } from '../../constants/data/options';
import { id_purchaseMethod } from '../../constants/data/inputID';

const Garment_general = ({garment}) => {
    return(
        <div>
            <div className="container-grid-2-md gap container-border clear-box m1">
                <div>
                <p>
                    <label className="text-b">Type:<label className="tab"></label></label>
                    {findAttribute(GARMENT_TYPES, garment.garmentType)}
                </p>
                <p>
                    <label className="text-b">Description:<label className="tab"></label></label>
                </p>
                <div className="container-border m1-v">
                    <label>{garment.garmentDescription}</label>
                </div>
                <p>
                    <label className="text-b">Country of Origin:<label className="tab"></label></label>
                    {garment.garmentCountry}
                </p>
                </div>

                <div>
                <p>
                    <label className="text-b">Store:<label className="tab"></label></label>
                    {garment.purchaseLocation}
                </p>
                <p>
                    <label className="text-b">Purchase Date:<label className="tab"></label></label>
                    {
                    formatDate(garment.purchaseDate)
                    }
                </p>
                <p>
                    <label className="text-b">Purchase Method:<label className="tab"></label></label>
                    {id_purchaseMethod[garment.purchaseMethod]}
                </p>
                <p>
                    <label className="text-b">Cost:<label className="tab"></label></label>
                    $ {garment.garmentCost}
                    {garment.garmentDiscount === "discount_yes" && (<label> (Discounted)</label>)}
                </p>
                {
                    garment.garmentDiscount === "discount_yes" &&
                    (
                    <p>
                        <label className="tab"></label>
                        <label className="text-b">Original Price:<label className="tab"></label></label>
                        $ {garment.garmentOgCost}
                    </p>
                    )
                }
                </div>
            </div>

        </div>
    )
}

export default Garment_general;