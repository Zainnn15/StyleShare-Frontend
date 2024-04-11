import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext'; // Adjust path as needed

import logo from '../assets/icons/logo.jpg';
import ScreenHeader from '../components/common/ScreenHeader';
import CircleImg from '../components/common/CircleImg';

export default function Login() {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext); // Assuming you have a context to manage user state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/login', { email, password }, { withCredentials: true });
            if(data.error) {
                toast.error(data.error);
            } else {
                setUser(data); // Update user state on successful login
                navigate('/dashboard');
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error('Login failed. Please try again.');
        }
    };

    // Check if user is already logged in
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
            <ScreenHeader isLogin={false} linkName={"Register"}/>
            <div className='container main'>                
            <form onSubmit={handleSubmit} autoComplete="off">
    <div className='container-small'>
        <div className='container-col'>
            <CircleImg iconUrl={logo} width="30%"/>
        </div>
        <div>
            <label className="container-title">Login</label>
            <hr/>
        </div>    
        <br/>
        <div>
            <label htmlFor="email">Email</label>
            <input 
                type="email" 
                id="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off" // Disabling autocomplete for this field
            />
            <label htmlFor="password">Password</label>
            <input 
                type="password" 
                id="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password" // Specially for passwords, this helps prevent autofill
            />
        </div>
        <br/>
        <button className='button-form' type="submit" style={{width:"100%"}}>Login</button>
    </div>
</form>

            </div>
        </div>
    );
}
