import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import info from '../assets/images/info.png'

export default function GarmentMeasurements() {
    const [option, setOption] = useState('');
    const [units, setUnits] = useState('cm');
  
    const selectUnits = (event) => {
        setUnits(event.target.value);
    }

    const selectType = (event) => {
      setOption(event.target.value);
    } 

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return(
      <form method='post' action='#'>
        <label>
          Select clothing type: 
          <select name='clothingType' id='clothingType' onChange={selectType}>
            <option>--</option>
            <option>T-Shirt</option>
            <option>Pants</option>
            <option>Dress</option>
          </select> <br/>
        </label>
        
        {option === 'T-Shirt' && (
          <>
            <label>
              Breast Width: <input name='breastWidth' type='number' min={0} />
              <select value={units} onChange={selectUnits}>
                <option value='cm'> cm </option>
                <option value='inches'> in </option>
              </select>
              <InfoPopup imgsrc={info} text = {"This is how you measure the breast width of a T-shirt"}/>
            </label> <br/>
  
            <label>
              Waist Width: <input name='waistWidth' type='number' min={0} />
              <select value={units} onChange={selectUnits}>
                <option value='cm'> cm </option>
                <option value='inches'> in </option>
              </select>
              <InfoPopup imgsrc={info} text = {"This is how you measure the waist width of a T-shirt"}/>
            </label> <br/>
  
            <label>
              Hip Width: <input name='hipWidth' type='number' min={0} />
              <select value={units} onChange={selectUnits}>
                <option value='cm'> cm </option>
                <option value='inches'> in </option>
              </select>
              <InfoPopup imgsrc={info} text = {"This is how you measure the hip width of a T-shirt"}/>
            </label> <br/>
  
            <label>
              Length: <input name='length' type='number' min={0} />
              <select value={units} onChange={selectUnits}>
                <option value='cm'> cm </option>
                <option value='inches'> in </option>
              </select>
              <InfoPopup imgsrc={info} text = {"This is how you measure the length of a T-shirt"}/>
            </label> <br/>
  
            <label>
              Sleeve Length: <input name='sleeveLength' type='number' min={0} />
              <select value={units} onChange={selectUnits}>
                <option value='cm'> cm </option>
                <option value='inches'> in </option>
              </select>
              <InfoPopup imgsrc={info} text = {"This is how you measure the sleeve length of a T-shirt"}/>
            </label> <br/>
  
            <label>
              Select a photo of you wearing the garment:
              <input type='file'></input> <br />
            </label>
        
            <button type='submit'>Save</button>
          </>
        )}
  
        {option === 'Pants' && (
          <>
          <label>
            Waist Width: <input name='waistWidth' type='number' min={0} />
            <select value={units} onChange={selectUnits}>
                <option value='cm'> cm </option>
                <option value='inches'> in </option>
              </select>
            <InfoPopup imgsrc={info} text = {"This is how you measure the waist width of pants"}/>
          </label> <br/>
  
          <label>
            Hip Width: <input name='hipWidth' type='number' min={0} />
            <select value={units} onChange={selectUnits}>
                <option value='cm'> cm </option>
                <option value='inches'> in </option>
            </select>
            <InfoPopup imgsrc={info} text = {"This is how you measure the hip width of pants"}/>
          </label> <br/>
  
          <label>
            Length: <input name='length' type='number' min={0} />
            <select value={units} onChange={selectUnits}>
                <option value='cm'> cm </option>
                <option value='inches'> in </option>
            </select>
            <InfoPopup imgsrc={info} text = {"This is how you measure the length of pants"}/>
          </label> <br/>
  
          <label>
            Pant Length: <input name='sleeveLength' type='number' min={0} />
            <select value={units} onChange={selectUnits}>
                <option value='cm'> cm </option>
                <option value='inches'> in </option>
            </select>
            <InfoPopup imgsrc={info} text = {"This is how you measure the pant length of pants"}/>
          </label> <br/>
          
          <button type='submit'>Save</button>
        </>
        )}
  
        {option === 'Dress' && (
          <>
            <label>
              Breast Width: <input name='breastWidth' type='number' min={0} />
              <select value={units} onChange={selectUnits}>
                <option value='cm'> cm </option>
                <option value='inches'> in </option>
              </select>
              <InfoPopup imgsrc={info} text = {"This is how you measure the breast width of a dress"}/>
            </label> <br/>
  
            <label>
              Waist Width: <input name='waistWidth' type='number' min={0} />
              <select value={units} onChange={selectUnits}>
                <option value='cm'> cm </option>
                <option value='inches'> in </option>
              </select>
              <InfoPopup imgsrc={info} text = {"This is how you measure the waist width of a dress"}/>
            </label> <br/>
  
            <label>
              Hip Width: <input name='hipWidth' type='number' min={0} />
              <select value={units} onChange={selectUnits}>
                <option value='cm'> cm </option>
                <option value='inches'> in </option>
              </select>
              <InfoPopup imgsrc={info} text = {"This is how you measure the hip width of a dress"}/>
            </label> <br/>
  
            <label>
              Length: <input name='length' type='number' min={0} />
              <select value={units} onChange={selectUnits}>
                <option value='cm'> cm </option>
                <option value='inches'> in </option>
              </select>
              <InfoPopup imgsrc={info} text = {"This is how you measure the length of a dress"}/>
            </label> <br/>
  
            <label>
              Sleeve Length: <input name='sleeveLength' type='number' min={0} />
              <select value={units} onChange={selectUnits}>
                <option value='cm'> cm </option>
                <option value='inches'> in </option>
              </select>
              <InfoPopup imgsrc={info} text = {"This is how you measure the sleeve length of a dress"}/>
            </label> <br/>
  
            <label>
              Select a photo of you wearing the garment:
              <input type='file'></input> <br />
            </label>
            
            <button type='submit'>Save</button>
          </>      
        )}
  
        
  
      </form>
      
    )
  }
  
  function InfoPopup({text, imgsrc}) {
    return(
      <Popup trigger={<button type='button'>Info</button>} position='right center'>
        <div>
          {/* <img src={imgsrc} alt={imgsrc} /> */}
          {text}
        </div>
      </Popup>
    )
  }