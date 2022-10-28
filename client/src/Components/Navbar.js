import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from '../Slices/userSlice'
import UserProfile from '../Pages/UserProfile';

const Navbar = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  
  
  function handleLogout(){

    fetch('/sessions', {
      method: 'DELETE',
      headers: {
        'Contenty-type' : 'application/json'
      },
    })
    dispatch(userLogout())
    navigate('/home')
  }

  return (

        <div className='flex justify-evenly border-2 w-[50%] mx-auto'>
            <Link className='underline'reloadDocument to='/community/popular/?page=1'>Browse</Link>
            <Link to='/uploadImage' className=' underline'>Upload Image</Link>             
            {user.id? <Link className=' underline' to={`/users/${user.id}/?page=1`}>{user.username}</Link> : null }
            {user.id? <button onClick={handleLogout} className=' underline rounded-md '>Logout</button > : <Link to='/login' className=' underline rounded-md '>Login/Signup</Link >}
        </div>

  )
}

export default Navbar