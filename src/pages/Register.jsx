import {useState} from 'react';
import axios from 'axios';
import {toast} from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import ScreenHeader from '../components/common/ScreenHeader';
import CircleImg from '../components/common/CircleImg';
import logo_purple from '../assets/images/ShareStyle_purple.png';

export default function Register() {
    const navigate = useNavigate();
    const [data , setData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name, username, email, password} = data
        try {
          const {data} = await axios.post('/register', {name, username, email, password})  
          if (data.error) {
              toast.error(data.error);
          } else {
                setData({})
                toast.success(data.message);
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
        }

    }

  return (
    <div>
        <ScreenHeader isLogin={false} linkName={"Login"}/>
        <div className='container main'>           
            <form onSubmit={handleSubmit}>
                <div className='container-small'>
                    <div className='container-col'>
                    <CircleImg iconUrl={logo_purple} width="30%"/>
                    </div>
                    <div>
                        <label className="container-title">Register</label>
                        <hr/>
                    </div>    
                    <br/>

                    <div>
                    <label htmlFor="name">Full Name (Optional)</label>
                    <input type="text" id="name" value={data.name} 
                    onChange={(e) => setData({...data, name: e.target.value})} 
                    />

                        <label htmlFor="name">Username</label>
                        <input type="text" id="username" value={data.username} 
                            onChange={(e) => setData({...data, username: e.target.value})} 
                        />

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
            
                    <button className='button-form' type="submit" style={{width:"100%"}}>Register</button>
                </div>                
            </form>
        </div>
    </div>
  )
}
