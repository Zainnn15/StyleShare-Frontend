import { useState } from "react";
import ScreenHeaderIn from "../../components/common/ScreenHeaderIn";
import { PICKUP_LOCS } from "../../constants/data/options";

export default function GarmentReserve() {
    // have to input a time and date for the exchange
    const [exchangeTime, setExchangeTime] = useState('');
    const [exchangeDate, setExchangeDate] = useState('');
    const [exchangeLocation, setExchangeLocation] = useState('');
    const options = PICKUP_LOCS;

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
                        <label className='text-b'>Where on the Newnham campus do you want to exchange the garment?</label>
                        <label className='tab'></label>
                        <select
                            name="garment-locations"
                            id="garmenet-locations"
                            onChange={(e) => setExchangeLocation(e.target.value)}
                        >
                            <option key='type_null' value=''>Select a location...</option>
                            {options.map((opt) => {
                                return <option key={`type_${opt.value}`} value={opt.value}>{opt.label}</option>
                            })}

                        </select>
                    </div>

                    <div className='container-input'>
                        <button className="button-form full" type="submit" /*onClick={handleSubmit}*/>
                            Reserve
                        </button>
                    </div>    
                </form>
            </div>
        </div>
            
    )
}