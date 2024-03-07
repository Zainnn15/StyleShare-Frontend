import {useState} from "react";

import '../../constants/css/main.scss';

import info from '../../assets/icons/info.png';
import { selectID } from "../../constants/functions/inputHandlers";
import InfoPopup from "../common/InfoPopup";

const GarmentMeasurements_old = () => {
    const [option, setOption] = useState('');
    const [units, setUnits] = useState('cm');
  
    const selectUnits = (event) => {
        setUnits(event.target.value);
    }

    const selectType = (event) => {
      setOption(event.target.value);
    } 

    return(
        <form method='post' action='#'>
            <div className='container-prompt' onClick={selectID("clothingType")}>
                <p>Select clothing type</p>
            </div>
            <div className='container-input'>
                <select name='clothingType' id='clothingType' onChange={selectType}>
                    <option>--</option>
                    <option>Shirt</option>
                    <option>Dress Shirt</option>
                    <option>Sweater</option>
                    <option>Pants</option>
                    <option>Denim</option>
                    <option>Dress</option>
                    <option>Skirt</option>

                </select> 
            </div>
            
            {(option === 'Shirt' || option === 'Dress Shirt' || option === 'Sweater') && (    
            <>
                <div className='container-prompt'>
                    <p>Breast Width</p>
                </div>
                <div className='container-input'>
                    <input name='breastWidth' type='number' min={0} />
                    <select value={units} onChange={selectUnits}>
                        <option value='cm'> cm </option>
                        <option value='inches'> in </option>
                    </select>
                    <InfoPopup imgsrc={info} text = {"This is how you measure the breast width of a T-shirt"}/>
                </div>

                <div className='container-prompt'>
                    <p>Hip Width</p>
                </div>
                <div className='container-input'>
                    <input name='hipWidth' type='number' min={0} />
                    <select value={units} onChange={selectUnits}>
                        <option value='cm'> cm </option>
                        <option value='inches'> in </option>
                    </select>
                    <InfoPopup imgsrc={info} text = {"This is how you measure the hip width of a T-shirt"}/>
                </div>
                
                <div className='container-prompt'>
                    <p>Waist Width</p>
                </div>
                <div className='container-input'>
                    <input name='waistWidth' type='number' min={0} />
                    <select value={units} onChange={selectUnits}>
                        <option value='cm'> cm </option>
                        <option value='inches'> in </option>
                    </select>
                    <InfoPopup imgsrc={info} text = {"This is how you measure the waist width of a T-shirt"}/>
                </div>

                <div className='container-prompt'>
                    <p>Length</p>
                </div>
                <div className='container-input'>
                    <input name='length' type='number' min={0} />
                    <select value={units} onChange={selectUnits}>
                        <option value='cm'> cm </option>
                        <option value='inches'> in </option>
                    </select>
                    <InfoPopup imgsrc={info} text = {"This is how you measure the length of a T-shirt"}/>
                </div>

                <div className='container-prompt'>
                    <p>Sleeve Length</p>
                </div>
                <div className='container-input'>
                    <input name='sleeveLength' type='number' min={0} />
                    <select value={units} onChange={selectUnits}>
                        <option value='cm'> cm </option>
                        <option value='inches'> in </option>
                    </select>
                    <InfoPopup imgsrc={info} text = {"This is how you measure the sleeve length of a T-shirt"}/>
                </div>

                <div className='container-prompt'>
                    <p>Select a photo of you wearing the garment</p>
                </div>
                <div className='container-input'>
                    <input type='file'></input>
                </div>

                <button type='submit' className='button-form'>Save</button>
            </>
            )}
    
            {(option === 'Pants' || option === 'Denim' || option === 'Skirt') && (
            <>
                <div className='container-prompt'>
                    <p>Waist Width</p>
                </div>
                <div className='container-input'>
                    <input name='waistWidth' type='number' min={0} />
                    <select value={units} onChange={selectUnits}>
                        <option value='cm'> cm </option>
                        <option value='inches'> in </option>
                    </select>
                    <InfoPopup imgsrc={info} text = {"This is how you measure the waist width of pants"}/>
                </div>

                <div className='container-prompt'>
                    <p>Hip Width</p>
                </div>
                <div className='container-input'>
                    <input name='hipWidth' type='number' min={0} />
                    <select value={units} onChange={selectUnits}>
                        <option value='cm'> cm </option>
                        <option value='inches'> in </option>
                    </select>
                    <InfoPopup imgsrc={info} text = {"This is how you measure the hip width of pants"}/>
                </div>

                <div className='container-prompt'>
                    <p>Length</p>
                </div>
                <div className='container-input'>
                    <input name='length' type='number' min={0} />
                    <select value={units} onChange={selectUnits}>
                        <option value='cm'> cm </option>
                        <option value='inches'> in </option>
                    </select>
                    <InfoPopup imgsrc={info} text = {"This is how you measure the length of a T-shirt"}/>
                </div>

                <div className='container-prompt'>
                    <p>Pant Length</p>
                </div>
                <div className='container-input'>
                    <input name='pantLength' type='number' min={0} />
                    <select value={units} onChange={selectUnits}>
                        <option value='cm'> cm </option>
                        <option value='inches'> in </option>
                    </select>
                    <InfoPopup imgsrc={info} text = {"This is how you measure the sleeve length of a T-shirt"}/>
                </div>

                <div className='container-prompt'>
                    <p>Select a photo of you wearing the garment</p>
                </div>
                <div className='container-input'>
                    <input type='file'></input>
                </div>

                <button type='submit' className='button-form'>Save</button>
            </>
            )}

    
            {option === 'Dress' && (
            <>
                <div className='container-prompt'>
                    <p>Breast Width</p>
                </div>
                <div className='container-input'>
                    <input name='breastWidth' type='number' min={0} />
                    <select value={units} onChange={selectUnits}>
                        <option value='cm'> cm </option>
                        <option value='inches'> in </option>
                    </select>
                    <InfoPopup imgsrc={info} text = {"This is how you measure the breast width of a dress"}/>
                </div>

                <div className='container-prompt'>
                    <p>Waist Width</p>
                </div>
                <div className='container-input'>
                    <input name='waistWidth' type='number' min={0} />
                    <select value={units} onChange={selectUnits}>
                        <option value='cm'> cm </option>
                        <option value='inches'> in </option>
                    </select>
                    <InfoPopup imgsrc={info} text = {"This is how you measure the waist width of a dress"}/>
                </div>

                <div className='container-prompt'>
                    <p>Hip Width</p>
                </div>
                <div className='container-input'>
                    <input name='hipWidth' type='number' min={0} />
                    <select value={units} onChange={selectUnits}>
                        <option value='cm'> cm </option>
                        <option value='inches'> in </option>
                    </select>
                    <InfoPopup imgsrc={info} text = {"This is how you measure the hip width of a dress"}/>
                </div>

                <div className='container-prompt'>
                    <p>Length</p>
                </div>
                <div className='container-input'>
                    <input name='length' type='number' min={0} />
                    <select value={units} onChange={selectUnits}>
                        <option value='cm'> cm </option>
                        <option value='inches'> in </option>
                    </select>
                    <InfoPopup imgsrc={info} text = {"This is how you measure the length of a dress"}/>
                </div>

                <div className='container-prompt'>
                    <p>Sleeve Length</p>
                </div>
                <div className='container-input'>
                    <input name='sleeveLength' type='number' min={0} />
                    <select value={units} onChange={selectUnits}>
                        <option value='cm'> cm </option>
                        <option value='inches'> in </option>
                    </select>
                    <InfoPopup imgsrc={info} text = {"This is how you measure the length of a dress"}/>
                </div>

                <div className='container-prompt'>
                    <p>Select a photo of you wearing the garment</p>
                </div>
                <div className='container-input'>
                    <input type='file'></input>
                </div>

                <button type='submit' className='button-form'>Save</button>
            </>   
            )}
        </form>
    )
  }

  export default GarmentMeasurements_old;