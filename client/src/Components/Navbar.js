import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { userLogout } from '../Slices/userSlice'

const Navbar = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  
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
            <div>Community</div>
            <div>User</div>
            <button onClick={handleLogout} className='border rounded-md bg-gray-500'>Logout</button >
        </div>
    </div>
  )
}

export default Navbar