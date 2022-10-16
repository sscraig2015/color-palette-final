
import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomepagePalette from './Components/HomepagePalette';
import Navbar from './Components/Navbar';
import LoginPage from './Pages.js/LoginPage';

function App() {
  
  

return(
  <div>
    <Routes>
      <Route path='*' element={<HomepagePalette />} />
      <Route path='/home' element={<HomepagePalette />} />
      <Route path='/login' element={<LoginPage/>} />
    </Routes>
    <Navbar />
  </div>
)
}

export default App;
