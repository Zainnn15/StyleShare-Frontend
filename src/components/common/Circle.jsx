/* eslint-disable react/prop-types */
import '../../styles/main.scss';

const Circle = ({ className, colorStart, colorStop, size, handlePress }) => {
    return(
        <div className={className} onClick={handlePress}
            style={{
                backgroundImage: `radial-gradient(${colorStart},${colorStop})`, 
                width:size, 
                height:size, 
                borderRadius:"50%",
            }}
        >
        </div>
    );
}

export default Circle;