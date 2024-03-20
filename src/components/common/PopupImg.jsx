/* eslint-disable react/prop-types */
import '../../styles/main.scss';

const PopupImg = ({ id, iconUrl, className, width, height, handlePress, description }) => {
    function closePopup() {
        let e_popup = document.getElementById(id);
        if(!e_popup) {
            return;
        }
        e_popup.classList.toggle("hide", true);
    }
    return(
        <div id={id} className="popup-img hide">
            <div className="popup-box-outer" onClick={closePopup}></div>
            <div className={className} onClick={handlePress}>
                <img 
                    src={iconUrl} 
                    alt="popup_img"
                    width={width}
                    height={height}
                /> 
                {description && (
                    <p>{description}</p>
                )}
            </div>
        </div>
    );
}

export default PopupImg;