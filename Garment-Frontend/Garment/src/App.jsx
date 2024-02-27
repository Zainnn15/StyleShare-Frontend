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
    </Routes>
    </UserContextProvider>
  )
}

export default App
