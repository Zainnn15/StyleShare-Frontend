import { useState } from 'react';
import NavbarIn from '../../components/NavbarIn';
import Popup from 'reactjs-popup';
import info from '../../assets/info.png';

export default function GarmentMeasure() {
    const [option, setOption] = useState('');

    const selectType = (event) => {
      setOption(event.target.value);
    } 

    // eslint-disable-next-line react/prop-types, no-unused-vars
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

  return (
    <div>
    <NavbarIn />
    <form>
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
            <select>
              <option> cm </option>
              <option> in </option>
            </select>
            <InfoPopup imgsrc={info} text = {"This is how you measure the breast width of a T-shirt"}/>
          </label> <br/>

          <label>
            Waist Width: <input name='waistWidth' type='number' min={0} />
            <select>
              <option> cm </option>
              <option> in </option>
            </select>
            <InfoPopup imgsrc={info} text = {"This is how you measure the waist width of a T-shirt"}/>
          </label> <br/>

          <label>
            Hip Width: <input name='hipWidth' type='number' min={0} />
            <select>
              <option> cm </option>
              <option> in </option>
            </select>
            <InfoPopup imgsrc={info} text = {"This is how you measure the hip width of a T-shirt"}/>
          </label> <br/>

          <label>
            Length: <input name='length' type='number' min={0} />
            <select>
              <option> cm </option>
              <option> in </option>
            </select>
            <InfoPopup imgsrc={info} text = {"This is how you measure the length of a T-shirt"}/>
          </label> <br/>

          <label>
            Sleeve Length: <input name='sleeveLength' type='number' min={0} />
            <select>
              <option> cm </option>
              <option> in </option>
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
          <select>
            <option> cm </option>
            <option> in </option>
          </select>
          <InfoPopup imgsrc={info} text = {"This is how you measure the waist width of pants"}/>
        </label> <br/>

        <label>
          Hip Width: <input name='hipWidth' type='number' min={0} />
          <select>
            <option> cm </option>
            <option> in </option>
          </select>
          <InfoPopup imgsrc={info} text = {"This is how you measure the hip width of pants"}/>
        </label> <br/>

        <label>
          Length: <input name='length' type='number' min={0} />
          <select>
            <option> cm </option>
            <option> in </option>
          </select>
          <InfoPopup imgsrc={info} text = {"This is how you measure the length of pants"}/>
        </label> <br/>

        <label>
          Pant Length: <input name='sleeveLength' type='number' min={0} />
          <select>
            <option> cm </option>
            <option> in </option>
          </select>
          <InfoPopup imgsrc={info} text = {"This is how you measure the pant length of pants"}/>
        </label> <br/>

        <label>
          Select a photo of you wearing the garment:
          <input type='file'></input> <br />
        </label>
        
        <button type='submit'>Save</button>
      </>
      )}

      {option === 'Dress' && (
        <>
          <label>
            Breast Width: <input name='breastWidth' type='number' min={0} />
            <select>
              <option> cm </option>
              <option> in </option>
            </select>
            <InfoPopup imgsrc={info} text = {"This is how you measure the breast width of a dress"}/>
          </label> <br/>

          <label>
            Waist Width: <input name='waistWidth' type='number' min={0} />
            <select>
              <option> cm </option>
              <option> in </option>
            </select>
            <InfoPopup imgsrc={info} text = {"This is how you measure the waist width of a dress"}/>
          </label> <br/>

          <label>
            Hip Width: <input name='hipWidth' type='number' min={0} />
            <select>
              <option> cm </option>
              <option> in </option>
            </select>
            <InfoPopup imgsrc={info} text = {"This is how you measure the hip width of a dress"}/>
          </label> <br/>

          <label>
            Length: <input name='length' type='number' min={0} />
            <select>
              <option> cm </option>
              <option> in </option>
            </select>
            <InfoPopup imgsrc={info} text = {"This is how you measure the length of a dress"}/>
          </label> <br/>

          <label>
            Sleeve Length: <input name='sleeveLength' type='number' min={0} />
            <select>
              <option> cm </option>
              <option> in </option>
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

    </div>
  )
}


