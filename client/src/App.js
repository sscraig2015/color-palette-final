import React from 'react';
import './App.css';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogin } from './Slices/userSlice';
import HomepagePalette from './Components/HomepagePalette';
import Navbar from './Components/Navbar';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import UserProfile from './Pages/UserProfile';
import Community from './Pages/Community';
import UploadImage from './Pages/UploadImage'


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
      <Route path='/community' element={<Community />} />
      <Route path='/uploadImage' element={<UploadImage />} />
    </Routes>
    <Navbar />
  </div>
)
}

export default App;
