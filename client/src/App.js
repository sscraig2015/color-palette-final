
import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from './Slices/userSlice';
import HomepagePalette from './Components/HomepagePalette';
import Navbar from './Components/Navbar';
import Login from './Pages.js/Login';
import Signup from './Pages.js/Signup';
import UserProfile from './Pages.js/UserProfile';

function App() {

  const dispatch = useDispatch()
  
  //Auto login user
  useEffect(() => {

    fetch('/me').then((r) => {
        if (r.ok) {
          r.json().then((user) => dispatch(userLogin(user)));
        }
      })
      }, []);

return(
  <div>
    <Routes>
      <Route path='*' element={<HomepagePalette />} />
      <Route path='/home' element={<HomepagePalette />} />
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/user/:id' element={<UserProfile />} />
    </Routes>
    <Navbar />
  </div>
)
}

export default App;
