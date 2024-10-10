import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext'; 
import { Link } from 'react-router-dom';
import ScreenHeader from '../components/common/ScreenHeader';
import CircleImg from '../components/common/CircleImg';
import logo_purple from '../assets/images/thumbnail_Style Share Purple.png';
import { addErrorMessageByID } from '../constants/functions/inputHandlers';

export default function Login() {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/login', { email, password }, { withCredentials: true });
            
            if(data.error) {
                toast.error(data.error);
                addErrorMessageByID("login_error", "Invalid credentials. Please try again");
            } else {
                // Fetch the full user profile after login
                const profileResponse = await axios.get('/profile', { withCredentials: true });

                if (profileResponse.data) {
                    // Set the user profile in context after successful login
                    setUser(profileResponse.data);

                    // Redirect to dashboard
                    navigate('/dashboard');

                    // Automatically refresh the dashboard page after a short delay to load user data
                    setTimeout(() => {
                        window.location.reload();
                    }, 500); // Adjust the delay as necessary
                }
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error('Login failed. Please try again.');
        }
    };

    // Check if user is already logged in when the component is mounted
    useEffect(() => {
        const verifyUser = async () => {
            try {
                const { data } = await axios.get('/profile', { withCredentials: true });
                if (data) {
                    setUser(data); // Set user context upon successful profile fetch
                    navigate('/dashboard');
                }
            } catch (error) {
                console.error("Error verifying user:", error);
            }
        };
        verifyUser();
    }, [navigate, setUser]);

    return (
        <div>
            <ScreenHeader isLogin={false} linkName={"Register"} />
            <div className='container main'>
                <form onSubmit={handleSubmit} autoComplete="off">
                    <div className='container-small'>
                        <div className='container-col'>
                            <CircleImg iconUrl={logo_purple} width="30%" />
                        </div>
                        <div>
                            <label className="container-title">Login</label>
                            <hr />
                        </div>
                        <br />
                        <div>
                            <div id={"login_error"} style={{ textAlign: "center" }}></div>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="off"
                                required
                            />
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="new-password"
                                required
                            />
                            <div className="forgetPassword">
                                <Link to="/forgetPassword">Forgot Password?</Link>
                            </div>
                        </div>
                        <br />
                        <div style={{ marginRight: '55px' }}>
                            <button className='button-form' type="submit" style={{ width: "100%" }}>Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
