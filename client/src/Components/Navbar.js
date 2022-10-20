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
    <div className='border-2 w-[50%] mx-auto mb-[2%] absolute inset-x-0 bottom-0'>
        <div className='flex justify-evenly'>
            <Link to='/community'>Community</Link>
            <div>{user.id? <Link to={`/user/${user.id}`}>{user.username}</Link> : "Welcome"}</div>
            {user.id? <button onClick={handleLogout} className='border rounded-md bg-gray-500'>Logout</button > : <Link to='/login' className='border rounded-md bg-gray-500'>Login/Signup</Link >}
            <Link to='/uploadImage'>Upload Image</Link>
        </div>
    </div>
  )
}

export default Navbar