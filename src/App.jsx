// import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from '../context/userContext';
import { GarmentContextProvider } from '../context/garmentContext';
import { GroupContextProvider } from '../context/groupContext'; // Add this line
import Dashboard from './pages/Dashboard';
import GarmentMeasure from './pages/GarmentPages/GarmentMeasure';
import Profile from './pages/Profile';
import Group from './pages/Group';
import GarmentWash from './pages/GarmentPages/GarmentWash';
import UserSearch from './pages/UserSearch';
import GarmentDetails from './pages/GarmentPages/GarmentDetails';
import GarmentReserve from './pages/GarmentPages/GarmentReserve';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <GarmentContextProvider>
        <GroupContextProvider> {/* Add this line */}
          <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path='/register' element={<Register />} />
            <Route path='/userprofile' element={<Profile />} />
            <Route path='/group' element={<Group />} />
            <Route path='/garment-measure' element={<GarmentMeasure />} />
            <Route path='/garment-wash' element={<GarmentWash />} />
            <Route path='/usersearch' element={<UserSearch />} />
            <Route path='/garment-details' element={<GarmentDetails />} />
            <Route path='/garment-reserve' element={<GarmentReserve />} />
          </Routes>
        </GroupContextProvider>
      </GarmentContextProvider>
    </UserContextProvider>
  );
}

export default App;