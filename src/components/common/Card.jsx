/* eslint-disable react/prop-types */
import '../../styles/main.scss';

const Card = ({ imgUrl, title, status, description, btnText, handlePress, handleImgPress, handleBtnPress, width="30%", height="40%" }) => {
    return(
        <div className='container-card' style={{width:{width}, height:{height}}} onClick={handlePress}>
            <div className='container-card-img' onClick={handleImgPress}
                style={{width:width, height:height}}
            >
                <img 
                    className="" 
                    src={imgUrl} 
                    alt="img"
                    style={{maxWidth:width, maxHeight: "100%"}}
                /> 
            </div>
            <div className='container-card-title'>
                {title}
                {status}
            </div>
            <div className='container-card-description'>
                {description}
            </div>
            <div className='container-card-button'>
                <button className="button-regular" onClick={handleBtnPress}>{btnText}</button>
            </div>
        </div>
    );
}

export default Card;