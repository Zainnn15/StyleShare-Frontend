import '../../styles/main.scss';

const GarmentDetails_First = () => {
    return(
        <div>
            <div>
                <div className="container-prompt">
                    <p>Where was the garment purchased?</p>
                </div>
                <div className="container-input">
                    <input type="text" id="purchaseLocation" name="purchaseLocation" 
                        placeholder="Enter garment store location" 
                        //value={formData.purchaseLocation}
                        required 
                    />
                </div>
            </div>

            <div>
                <div className="container-prompt">
                    <p>How was it purchased?</p>
                </div>
                <div className="container-radio">
                    <div className="container-radio-group">
                        <input type="radio" id="method_online" name="purchaseMethod"
                            value={"online"} 
                        />
                        <label htmlFor="method_online">Online</label>
                    </div>
                    <div className="container-radio-group">
                        <input type="radio" id="method_store" name="purchaseMethod"
                            value={"store"} 
                        />
                        <label htmlFor="method_store">Brick & Mortar Store</label>
                    </div>
                </div>
            </div>

            <div>
                <div className="container-prompt">
                    <p>When was it purchased? (dd/mm/yyyy)</p>
                </div>
                <div className="container-input">
                    <input type="date" id="purchaseDate" name="purchaseDate" 
                        required 
                    />
                </div>
            </div>
        </div>
    );
}

export default GarmentDetails_First;