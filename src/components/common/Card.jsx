/* eslint-disable react/prop-types */
import '../../styles/main.scss';

const Card = ({ imgUrl, title, status, description, btnText, handlePress, handleImgPress, handleBtnPress, width="30%", height="40%", imgClassName, titleClassName, DescClassName, btnClassName }) => {
    return(
        <div className='container-card' style={{width:{width}, height:{height}}} onClick={handlePress}>
            {
                imgUrl && (
                <div className={imgClassName} onClick={handleImgPress}
                    style={{width:width, height:height}}
                >
                    <img 
                        src={imgUrl} 
                        alt="img"
                        style={{maxWidth:width, maxHeight: "100%"}}
                    /> 
                </div>
                )
            }
            
            {
                title && (
                <div className={titleClassName}>
                    {title}
                    {status && (status)}
                </div>
                )
            }
            
            {
                description && (
                <div className={DescClassName}>
                    {description}
                </div>
                )
            }

            {
                btnText && (
                <div className={btnClassName}>
                    <button className="button-regular" onClick={handleBtnPress}>{btnText}</button>
                </div>
                )
            }
    
        </div>
    );
}

export default Card;