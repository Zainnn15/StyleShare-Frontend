/* eslint-disable react/prop-types */
import '../../styles/main.scss';
import Popup from "reactjs-popup";
import info from '../../assets/icons/info.png';

const InfoPopup = ({text, imgsrc, width="1em", height="1em"}) => {
    return(
        <Popup 
          trigger={
            <button type="button" className='button-info'>
              <img style={{width:width, height:height}} 
                src={info} alt="btn"/> 
            </button>
          } 
          position='right center'
        >
          <div>
            {
              imgsrc &&
              <img src={imgsrc} alt="info"/>
            }
            <div className='container-info-popup'>
              <label>{text}</label>
            </div>
          </div>
        </Popup>
    );
}

export default InfoPopup;