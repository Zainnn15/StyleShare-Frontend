import { useState } from 'react';
import axios from 'axios';
import {toast} from 'react-hot-toast';
import ScreenHeader from '../components/common/ScreenHeaderIn';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/requestPasswordReset', { email });
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
      <div>
        <ScreenHeader isLogin={false} linkName={"Login"}/>
        <div className='container main'>                
          <div className='container-small'>
            <label className='container-title'>Reset Password</label>
            <hr/>
            <form onSubmit={handleSubmit}>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button className='button-regular' type="submit" style={{width:"100%"}}>Send Reset Link</button>
            </form>
          </div>
        </div>
      </div>
    );
};

export default ForgetPassword;
