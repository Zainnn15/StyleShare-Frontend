/* eslint-disable react/prop-types */
import '../../styles/main.scss';
import Popup from "reactjs-popup";

const InfoPopup = ({text, imgsrc}) => {
    return(
        <Popup trigger={<button type='button'>Info</button>} position='right center'>
          <div>
            {<img src={imgsrc} alt={imgsrc} />}
            {text}
          </div>
        </Popup>
    );
}

export default InfoPopup;