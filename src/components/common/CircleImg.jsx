/* eslint-disable react/prop-types */
import '../../styles/main.scss';

const CircleImg = ({ iconUrl, className, width, height, handlePress }) => {
    return(
        <img 
            className={className} 
            style={{width:width, height:height}} 
            src={iconUrl} 
            alt="img"
            onClick={handlePress}
        /> 
    );
}

export default CircleImg;