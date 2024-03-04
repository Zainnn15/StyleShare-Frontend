import '../../styles/main.scss';


const GarmentDetails_Second = () => {
    return(

        <div>
            <div>
                <div className="container-prompt">
                    <p>What type of garment is it?</p>
                </div>
                <div className="container-input">
                    <select 
                        name="garmentType" 
                        id="garmentType"
                        required
                    >
                        <option key='type_null' value=''>Select a garment...</option>
                    </select>
                </div>
            </div>

            <div>
                <div className="container-prompt" >
                    <p>Give a short description about the garment</p>
                </div>
                <div className="container-input">
                    <textarea 
                        name="garmentDescription"
                        id="garmentDescription"
                        placeholder="Enter short description of garment. (Max characters 100)"
                        rows={4}
                        maxLength={100}
                        required
                    ></textarea>
                </div>
            </div>
        </div>
    );
}

export default GarmentDetails_Second;