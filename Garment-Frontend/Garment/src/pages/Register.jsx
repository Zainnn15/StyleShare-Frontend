import {useState} from 'react';
import axios from 'axios';
import {toast} from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import Navbar from '../components/Navbar'

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
        <Navbar />
        <form onSubmit={handleSubmit}>
            <h1>Register</h1>

            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" value={data.name} onChange={(e) => setData({...data, name: e.target.value})} />

            <label htmlFor="name">Username</label>
            <input type="text" id="username" value={data.username} onChange={(e) => setData({...data, username: e.target.value})} />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
            
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
          
         
                <button type="submit">Register</button>
            
        </form>


    </div>
  )
}
