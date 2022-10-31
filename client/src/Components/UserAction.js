import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { savePalette } from '../Slices/userSlice'
import { convertPalettetoHex } from '../Features/ConvertColor'

const UserAction = ({newPalette, setSaveAlert, setMousePos}) => {
  
  const dispatch = useDispatch()
  
  const user = useSelector((state) => state.user)
  const palette = useSelector((state) => state.palette.paletteHome)




  // Creates palette in hex to the backend
  function handleSave(e){
    const hexArray = convertPalettetoHex(palette)
    
    setMousePos({
      x : e.clientX,
      y : e.clientY,
    })
    setSaveAlert(true)

    dispatch(savePalette(hexArray))

    setTimeout(() => {
      setSaveAlert(false)
    }, 1000)

  }
  
  
  
  return (

        <div className='flex justify-center gap-2 h-[8%] my-2'>
            <button onClick={newPalette} className='bg-blue-500 rounded-xl px-1  w-[30%]'>Generate Palette</button>
            {user.id? <button  onClick={(e)=> handleSave(e)} className='bg-blue-500 rounded-xl w-[30%]'>Save Palette</button> : null}
        </div>

  )
}

export default UserAction