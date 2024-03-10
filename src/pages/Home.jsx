import '../styles/main.scss';
import ScreenHeader from "../components/common/ScreenHeader";
import { changeTitle } from "../constants/functions/inputHandlers";
import Navbar from '../components/common/Navbar';

const Home = () => {
    changeTitle("Home");
    return (
        <div>
            <ScreenHeader />
            <div className="container main">
                <div>
                    <label className="container-title">Home</label>
                    <hr/>
                    <Navbar />
                </div>
            </div>
        </div>
    );
};

export default Home;