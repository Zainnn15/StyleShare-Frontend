/* eslint-disable react/prop-types */
import '../../styles/main.scss';

const Card = ({ imgUrl, title, status, description, footer, handlePress, handleImgPress, handleTitlePress, handleDescPress, handleFooterPress, width="16em", height="32em", imgWidth="16em", imgHeight="16em", titleHeight="4em", descHeight="8em", imgClassName, titleClassName, DescClassName, footerClassName, isBtn=true }) => {
    return(
        <div className='container-card' style={{width:width, height:height}} onClick={handlePress}>
            {
                imgUrl && (
                <div className={imgClassName} onClick={handleImgPress}
                    style={{width:imgWidth, height:imgHeight}}
                >
                    <img 
                        src={imgUrl} 
                        alt="img"
                        style={{maxWidth:imgWidth, maxHeight: imgHeight}}
                    /> 
                </div>
                )
            }
            
            {
                title && (
                <div className={titleClassName} style={{height:titleHeight}} onClick={handleTitlePress}>
                    {title}
                    {status && (status)}
                </div>
                )
            }
            
            {
                description && (
                <div className={DescClassName} style={{height:descHeight}} onClick={handleDescPress}>
                    {description}
                </div>
                )
            }

            {
                footer && (
                <div className={footerClassName}>
                    {isBtn &&
                        <button className="button-regular" onClick={handleFooterPress}>{footer}</button>
                    }
                    {
                     !isBtn &&
                        <span onClick={handleFooterPress}>{footer}</span>
                    }
                </div>
                )
            }
    
        </div>
    );
}

export default Card;