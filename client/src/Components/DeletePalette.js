import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { paletteInfo } from '../Slices/paletteSlice'
import { deletePalette } from '../Slices/userSlice'

const DeletePalette = () => {

    const dispatch = useDispatch()
    const palette = useSelector((state) => state.palette.paletteInfo)

    function handleClick(){

        if (window.confirm("Are you sure? This can not be undone.")) {
          
          dispatch(deletePalette(palette))
          .then(dispatch(paletteInfo(null)))
        }
    }
  return (
    <div className='ml-[80%]'><button onClick={handleClick} className='bg-red-100 text-red-600 p-1 rounded-lg my-4'>Delete Palette</button></div>
  )
}

export default DeletePalette