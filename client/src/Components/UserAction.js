import React from 'react'

const UserAction = ({ newPalette }) => {
  return (
    <div>
        <div className='flex justify-center'>
            <button onClick={newPalette} className='bg-blue-500 rounded-xl h-10 w-80'>Generate Palette</button>
        </div>
    </div>
  )
}

export default UserAction