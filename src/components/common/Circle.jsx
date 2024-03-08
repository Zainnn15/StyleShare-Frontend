/* eslint-disable react/prop-types */
import '../../styles/main.scss';

const Circle = ({ className, color, size, handlePress }) => {
    return(
        <div className={className} onClick={handlePress}
            style={{backgroundColor:color, width:size, height:size, borderRadius:"50%"}}
        >
        </div>
    );
}

export default Circle;