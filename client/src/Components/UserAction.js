import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {updateUserPalettes} from '../Slices/userSlice'
const UserAction = ({newPalette}) => {

  const palette = useSelector((state) => state.palette.paletteHome)
  const dispatch = useDispatch()

  function ColorToHex(color) {
    var hexadecimal = color.toString(16);
    return hexadecimal.length === 1 ? "0" + hexadecimal : hexadecimal;
  }
  
  function ConvertRGBtoHex(red, green, blue) {
    return "#" + ColorToHex(red) + ColorToHex(green) + ColorToHex(blue);
  }

  function convertPalettetoHex(givenPalette){
    return givenPalette.map((colorRGB) => {
      return ConvertRGBtoHex(colorRGB[0], colorRGB[1], colorRGB[2])
    })
  }


  // Creates palette in hex to the backend
  function savePalette(){
    const hexArray = convertPalettetoHex(palette)

    fetch('/palettes', {
      method: "POST",
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify({
        hexValues: hexArray,
        tags: [],

      })
    })
    .then((r) => r.json()).then((data) => dispatch(updateUserPalettes(data)))
  }
  
  const user = useSelector((state) => state.user)
  return (

        <div className='flex justify-center gap-2 h-[8%] my-2'>
            <button onClick={newPalette} className='bg-blue-500 rounded-xl px-1  w-[30%]'>Generate Palette</button>
            {user.id? <button  onClick={savePalette}className='bg-blue-500 rounded-xl h-10 w-80'>Save Palette</button> : null}
        </div>

  )
}

export default UserAction