import { useState } from "react";
import ScreenHeaderIn from "../../components/common/ScreenHeaderIn";
import { PICKUP_LOCS, PICKUP_CAMPUS } from "../../constants/data/options";

export default function GarmentReserve() {
    // have to input a time, date, and location for the exchange
    const [exchangeTime, setExchangeTime] = useState('');
    const [exchangeDate, setExchangeDate] = useState('');
    const [exchangeLocation, setExchangeLocation] = useState('');
    const [otherLocation, setOtherLocation] = useState('');
    const [otherCampus, setOtherCampus] = useState('');
    const options = PICKUP_LOCS;

    const sendReserveDetails = async() => {
        // if other selected, updated exchange location to the other location
        if (otherLocation) {
            setExchangeLocation(otherLocation);
        }
        else if (otherCampus) {
            setExchangeLocation(otherCampus);
        }
        // send data to backend
        // try{
        //     const reserveData = {
        //         exchangeTime,
        //         exchangeDate,
        //         exchangeLocation
        //     }
        //     const {data} = axios.post('/garmentreserve', {...reserveData, userId: user.id}); 
        //     if (data.error) {
        //         toast.error(data.error);
        //     } else {
        //         toast.success(data.message);
        //     }
        // } catch (error) {
        //     console.log('Error sending reservation data to backend : ', error);
        // };
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        sendReserveDetails();
    }

    return(
        <div>
            <ScreenHeaderIn />
            <div className="container main">
                <div>
                    <label className="container-title">Reserve a Garment</label>
                    <hr/>
                </div>
                    <div className='container-content'>
                        <label className='text-b'>Selected Garment:</label>
                        <label className='tab'></label>
                        {/* Info about the garment */}
                    </div>

                <form action="" method="POST">
                    <div className='container-content'>
                        <label className='text-b'>What date do you want to exchange the garment?</label>
                        <label className='tab'></label>
                        <input type='date' value={exchangeDate} onChange={(e)=>setExchangeDate(e.target.value)} />
                    </div>

                    <div className='container-content'>
                        <label className='text-b'>What time do you want to exchange the garment?</label>
                        <label className='tab'></label>
                        <input type='time' value={exchangeTime} onChange={(e)=>setExchangeTime(e.target.value)} />
                    </div>

                    <div className='container-content'>
                        <label className='text-b'>Where at Seneca do you want to exchange the garment?</label>
                        <label className='tab'></label>
                        <select
                            value={exchangeLocation}
                            name="garment-locations"
                            id="garmenet-locations"
                            onChange={(e) => setExchangeLocation(e.target.value)}
                        >
                            <option key='type_null' value=''>Select a location...</option>
                            {options.map((opt) => {
                                return <option key={`type_${opt.value}`} value={opt.value}>{opt.label}</option>
                            })}
                        </select>
                        {exchangeLocation === 'Off Campus' && (
                            <div className='container-content'>
                                <label className='text-b'>Specify off campus location: </label>
                                <label className='tab'></label>
                                <textarea
                                    name="other-location"
                                    id="other-location"
                                    value={otherLocation}
                                    onChange={(e) => setOtherLocation(e.target.value)}
                                    rows={1}
                                    placeholder="Location" />
                            </div>
                        )}

                        {exchangeLocation === 'Other Campus' && (
                            <div className='container-content'>
                                <label className='text-b'>Which other campus? </label>
                                <label className='tab'></label>
                                <select
                                    value={otherCampus}
                                    name="garment-locations"
                                    id="garmenet-locations"
                                    onChange={(e) => setOtherCampus(e.target.value)}
                                >
                                    <option key='type_null' value=''>Select a location...</option>
                                    {PICKUP_CAMPUS.map((opt) => {
                                        return <option key={`type_${opt.value}`} value={opt.value}>{opt.label}</option>
                                    })}
                                </select>
                            </div>
                        )}
                    </div>

                    <div className='container-input'>
                        <button className="button-form full" type="submit" onClick={handleSubmit}>
                            Reserve
                        </button>
                    </div>    
                </form>
            </div>
        </div>
            
    )
}