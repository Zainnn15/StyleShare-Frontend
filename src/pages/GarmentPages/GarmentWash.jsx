/* eslint-disable react/prop-types */
import { useState } from 'react';

import '../../styles/main.scss';

import ScreenHeader from "../../components/common/ScreenHeader";
import { CARE_DRY_METHODS, CARE_WASH_METHODS } from '../../constants/data/options';
import InfoPopup from '../../components/common/InfoPopup';

export default function GarmentWash() {
  const [washDate, setWashDate] = useState('');
  const [washMethod, setWashMethod] = useState('');
  const [dryerMethod, setDryerMethod] = useState('');
  const [useIron, setUseIron] = useState(false);
  const [ventilatedTime, setVentilatedTime] = useState('');

  const handleDateChange = (event) => {
    setWashDate(event.target.value);
  };

  const handleWashMethodChange = (event) => {
    setWashMethod(event.target.value);
  };

  const handleDryerMethodChange = (event) => {
    setDryerMethod(event.target.value);
  };

  const handleUseIronChange = (event) => {
    setUseIron(event.target.checked);
  };

  const handleVentilatedTimeChange = (event) => {
    setVentilatedTime(event.target.value);
  };

  // function InfoPopup({ text }) {
  //   return (
  //     <Popup trigger={<button type='button'>Info</button>} position='right center'>
  //       <div>
  //         {text}
  //       </div>
  //     </Popup>
  //   );
  // }

  return (
    <div>
      <ScreenHeader />
      <div className='container main'>
        <div>
            <label className="container-title">Garment Care</label>
            <hr/>
        </div>
        <form>
          <div className='container-content'>
            <label className='text-b'>Wash Date:</label>
            <label className='tab'></label>
            <input type='date' value={washDate} onChange={handleDateChange} />
          </div>

          <div className='container-grid-2-md'>
            <div>
              <div className='container-prompt'>
                <p>Wash Method</p>
                <InfoPopup text='Select the method used to wash the garment' />
              </div>
              <div className='container-input'>
                <select id='washMethod' 
                  name='washMethod' 
                  value={washMethod} 
                  onChange={handleWashMethodChange}
                  required
                >
                  <option key='wash_null' value=''>Select a wash method...</option>
                  {CARE_WASH_METHODS.map((opt) => {
                      return (
                          <option key={"wash_" + opt.value} value={opt.value}>
                              {opt.label}
                          </option>
                      )
                  })}
                </select> 
              </div>
            </div>

            <div>
              <div className='container-prompt'>
                <p>Dryer Method</p>
                <InfoPopup text='Select the method used for drying the garment'/>
              </div>
              <div className='container-input'>
                <select id='dryMethod' 
                  name='dryMethod' 
                  value={dryerMethod} 
                  onChange={handleDryerMethodChange}
                  required
                >
                  <option key='dry_null' value=''>Select a dryer method...</option>
                  {CARE_DRY_METHODS.map((opt) => {
                      return (
                          <option key={"dry_" + opt.value} value={opt.value}>
                              {opt.label}
                          </option>
                      )
                  })}
                </select> 
              </div>
            </div>

            <div className='container-content'>
              <label className='text-b'>Use Iron:</label>
              <label className='tab'></label>
              <input type='checkbox' checked={useIron} onChange={handleUseIronChange} />
              <InfoPopup text='Check if an iron was used on the garment after washing'/>
            </div>

            {useIron && (
              <div>
                <div className='container-prompt'>
                  <p>Ventilated Time (in minutes)</p>
                  <InfoPopup text='Enter the duration for which the garment was ventilated after ironing'/>
                </div>
                <div className='container-input'>
                  <input
                    type='number'
                    value={ventilatedTime}
                    onChange={handleVentilatedTimeChange}
                    placeholder='Enter minutes'
                    min={0}
                    step={1}
                  />                
                </div>
              </div>
            )}
          </div>
          
          <div>
            <div className='container-prompt'>
                <p>Select a photo of you wearing the garment</p>
            </div>
            <div className="container-input">
                <input id="fileWear" name="fileWear" type="file" required />
            </div>
          </div>

          <br/>
          <div className='container-input'>
              <button className="button-form full" type="submit">
                  Save
              </button>
          </div>
        </form>
      </div>      
    </div>
  );
}