import '../../styles/main.scss';
import ScreenHeader from "../../components/common/ScreenHeader";
import { changeTitle } from '../../constants/functions/inputHandlers';
import GarmentMeasurements from '../../components/garment_measurements/GarmentMeasurements';

const GarmentMeasurement = () => {
    changeTitle("Garment Measurement")
    return (
        <div>
            <ScreenHeader />
            <div className="container main">
                <div>
                    <label className="container-title">Add Garment Measurement</label>
                    <hr/>
                </div>
                <form action="" method="POST">
                    <GarmentMeasurements menuShouldScrollIntoView={false}/>
                </form>
            </div>
        </div>
    );
};

export default GarmentMeasurement;