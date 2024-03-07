import {useState, useEffect} from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';

import logo from '../assets/icons/logo192.png';
import ScreenHeader from '../components/common/ScreenHeader';
import CircleImg from '../components/common/CircleImg';

export default function Login() {
    const navigate = useNavigate();
    const [data , setData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {email, password} = data;
        try {
            const {data} = await axios.post('/login',{email, password})  
            if(data.error) {
                toast.error(data.error);
            } else {
                setData({});
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (Object.keys(data).length === 0) {
          // Navigate only when the data has been cleared
          navigate('/dashboard');
        }
      }, [data, navigate]);
  return (
    <div>
        <ScreenHeader isLogin={false} linkName={"Register"}/>
        <div className='container main'>                
            <form onSubmit={handleSubmit}>
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
                        <input type="email" id="email" value={data.email} 
                            onChange={(e) => setData({...data, email: e.target.value})}
                        />
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={data.password} 
                            onChange={(e) => setData({...data, password: e.target.value})}
                        />
                    </div>
                    <br/>
                    <button className='button-form' type="submit" style={{width:"100%"}}>Login</button>
                </div>

            </form>
        </div>
    </div>
  )
}
