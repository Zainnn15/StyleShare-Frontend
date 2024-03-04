import './App.css'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import axios from 'axios'
import { Toaster} from 'react-hot-toast'
import { UserContextProvider } from '../context/userContext'
import Dashboard from './pages/Dashboard'
import GarmentMeasure from './pages/GarmentPages/GarmentMeasure'
import Profile from './pages/Profile'
import GarmentWash from './pages/GarmentPages/GarmentWash'
import UserSearch from './pages/UserSearch'
import GarmentDetails from './pages/GarmentPages/GarmentDetails'

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
    <Toaster position='bottom-right' toastOptions={{duration: 2000}} />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path='/register' element={<Register />} /> 
      <Route path='/userprofile' element={<Profile />} /> 
      <Route path='/garment-measure' element={<GarmentMeasure />} />
      <Route path='/garment-wash' element={<GarmentWash />} />
      <Route path='/usersearch' element={<UserSearch />}/>
      <Route path='/garment-details' element={<GarmentDetails />} />
    </Routes>
    </UserContextProvider>
  )
}

export default App
