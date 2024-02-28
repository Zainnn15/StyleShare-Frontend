import './App.css';
import React from 'react';
import {Routes, Route } from 'react-router-dom';
import GarmentMeasurements from './views/garmentMeasurements';
import Home from './views/home';
import Group from './views/group';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}>Home</Route>
      <Route path='/group' element={<Group/>}>Group</Route>
      <Route path='/garment_measurements' element={<GarmentMeasurements/>}>Garment Measurements</Route>
    </Routes>
  );
}

export default App;
