import React from 'react'

const Navbar = () => {
  return (
    <div className='border-2 w-[50%] mx-auto mb-[2%] absolute inset-x-0 bottom-0'>
        <div className='flex justify-evenly'>
            <div>Community</div>
            <div>User</div>
            <div>Logout</div>
        </div>
    </div>
  )
}

export default Navbar