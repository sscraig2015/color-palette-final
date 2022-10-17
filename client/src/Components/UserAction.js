import React from 'react'
import { useSelector } from 'react-redux'

const UserAction = ({ newPalette }) => {
  
  const user = useSelector((state) => state.user)
  return (
    <div>
        <div className='flex justify-center gap-2'>
            <button onClick={newPalette} className='bg-blue-500 rounded-xl h-10 w-80'>Generate Palette</button>
            {user.id? <button onClick={newPalette} className='bg-blue-500 rounded-xl h-10 w-80'>Save Palette</button> : null}
        </div>
    </div>
  )
}

export default UserAction