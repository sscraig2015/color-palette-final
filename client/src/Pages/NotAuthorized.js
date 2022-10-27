import React from 'react'
import { Link } from 'react-router-dom'

const NotAuthorized = () => {
  return (
    <div className='flex flex-col w-[50%] mx-auto gap-14 mt-10 '>
      <div className='text-6xl text-gray-500'>
          {`Hmmm...I either don't recognize that url or you're not supposed to be here. Either way don't do it again >:(`}
          
      </div>
      <Link className='bg-blue-500 rounded-xl h-10 w-[30%] mx-auto text-center p-2' to='/home'>Generate palette</Link>
    </div>

  )
}

export default NotAuthorized