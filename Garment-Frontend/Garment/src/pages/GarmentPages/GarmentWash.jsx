/* eslint-disable react/prop-types */
import NavbarIn from '../../components/NavbarIn';
import { useState } from 'react';
import Popup from 'reactjs-popup';

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

  function InfoPopup({ text }) {
    return (
      <Popup trigger={<button type='button'>Info</button>} position='right center'>
        <div>
          {text}
        </div>
      </Popup>
    );
  }

  return (
    <div>
      <NavbarIn />
      <h1>Garment Wash</h1>
      <form>
        <label>
          Wash Date:
          <input type='date' value={washDate} onChange={handleDateChange} />
        </label>
        <br />

        <label>
          Wash Method:
          <select value={washMethod} onChange={handleWashMethodChange}>
            <option value=''>--</option>
            <option value='washingMachine'>Washing Machine</option>
            <option value='handWash'>Hand Wash</option>
          </select>
          <InfoPopup text='Select the method used to wash the garment.' />
        </label>
        <br />

        <label>
          Dryer Method:
          <select value={dryerMethod} onChange={handleDryerMethodChange}>
            <option value=''>--</option>
            <option value='dryer'>Dryer</option>
            <option value='hangDry'>Hang & Dry</option>
          </select>
          <InfoPopup text='Select the method used for drying the garment.' />
        </label>
        <br />

        <label>
          Use Iron:
          <input type='checkbox' checked={useIron} onChange={handleUseIronChange} />
          <InfoPopup text='Check if an iron was used on the garment after washing.' />
        </label>
        <br />

        {useIron && (
          <label>
            Ventilated Time:
            <input
              type='text'
              value={ventilatedTime}
              onChange={handleVentilatedTimeChange}
              placeholder='Enter time (e.g., 1 hour)'
            />
            <InfoPopup text='Enter the duration for which the garment was ventilated after ironing.' />
          </label>
        )}
        <br />

        <label>
          Select a photo of you wearing the garment:
          <input type='file' />
        </label>
        <br />

        <button type='submit'>Save</button>
      </form>
    </div>
  );
}