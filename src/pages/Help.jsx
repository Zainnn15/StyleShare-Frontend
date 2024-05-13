// Help.jsx
import ScreenHeaderIn from "../components/common/ScreenHeaderIn";
const Help = () => {
    return (
        
        <div className="help-page">
            <ScreenHeaderIn />
            <div className="container main">
                <h1>Help & Support</h1>
                <hr/>
                <br/>
                <div className="container-border">
                    <h2>Contact Information</h2>
                    <hr/>
                    <p>If you experience any trouble with your group members, have questions about the research, or any other inquiries, please contact:</p>
                    <ul>
                        <li><strong>Sabine Weber:</strong> <a href="mailto:Sabine.Weber@senecacollege.ca">Sabine.Weber@senecacollege.ca</a></li>
                        <li><strong>Good2Talk Helpline:</strong> Call 1-866-925-5454 or text GOOD2TALKON to 686868</li>
                        <li><strong>Arafat Khan:</strong> For garment-related issues, email <a href="mailto:md-arafat-ali.khan@senecapolytechnic.ca">md-arafat-ali.khan@senecapolytechnic.ca</a></li>
                    </ul>
                </div>
                <br/>
                <br/>
                <div className="container-border">
                    <h2>Common Questions & Answers</h2>
                    <hr/>
                    <h3>Purchasing Garments</h3>
                    <hr/>
                    <p>Garments must be new to track wear and tear accurately. Each participant will receive $70-80 in funds to purchase a garment, including taxes and potential shipping costs.</p>
                    
                    <br/>
                    <hr/>
                    <h3>Garment Wear, Care & Feel</h3>
                    <hr/>
                    <p>You are required to update your garments diary after each wear and care. Follow the instructions on the care label for washing.</p>
                    
                    <br/>
                    <hr/>
                    <h3>For Group Participants: Garment Exchange</h3>
                    <hr/>
                    <p>Garment exchange schedules are flexible; communicate with your group to manage exchanges effectively.</p>
                </div>
            </div>
        </div>
    );
};

export default Help;
