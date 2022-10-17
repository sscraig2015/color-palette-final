
import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomepagePalette from './Components/HomepagePalette';
import Navbar from './Components/Navbar';
import Login from './Pages.js/Login';
import Signup from './Pages.js/Signup';

function App() {
  
  

return(
  <div>
    <Routes>
      <Route path='*' element={<HomepagePalette />} />
      <Route path='/home' element={<HomepagePalette />} />
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />
    </Routes>
    <Navbar />
  </div>
)
}

export default App;
