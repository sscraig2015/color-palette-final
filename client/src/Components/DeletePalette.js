import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const DeletePalette = () => {

    const palette = useSelector((state) => state.palette.paletteInfo)
    const user = useSelector((state) => state.user)


    function handleClick(){
        const response = window.confirm("Are you sure? This can not be undone.")
        
        if (response) {
            console.log('delete')
            fetch(`/users/${user.id}/palettes/${palette.id}`,{
                method: 'DELETE',
            })
            .then(window.location.reload())
        }
    }
  return (
    <button onClick={handleClick} className='bg-red-100 text-red-600 p-1 rounded-lg'>Delete Palette</button>
  )
}

export default DeletePalette