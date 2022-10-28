import React from 'react';
import './App.css';
import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './Components/Navbar';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import UserProfile from './Pages/UserProfile';
import Community from './Pages/Community';
import UploadImage from './Pages/UploadImage'
import Homepage from './Pages/Homepage';
import NotAuthorized from './Pages/NotAuthorized';

import { fetchUser } from './Slices/userSlice'


function App() {

  const dispatch = useDispatch()




  //Auto login user
  useEffect(() => {

      dispatch(fetchUser())
      }, []);

return(
  <div className='h-screen w-screen'>
    <Routes>
      <Route path='/home' element={<Homepage />} />
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/users/:id/' element={<UserProfile />} />
      <Route path='/community/:category/' element={<Community />} />
      <Route path='/uploadImage' element={<UploadImage />} />
      <Route path='/oopsie' element={<NotAuthorized /> } />
      <Route path='*' element={<NotAuthorized />} />
    </Routes>

    <Navbar />
  </div>
)
}

export default App;
