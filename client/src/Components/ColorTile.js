import React, { useState } from 'react'

import { useSelector } from 'react-redux'

import { convertPalettetoHex } from '../Features/ConvertColor'

const ColorTile = ( { index, color, setSavedColors, savedColors, setMousePos, setAlert }) => {
  
  const [rgbOrHex, setRGBorHex] = useState(true)
  const palette = useSelector((state) => state.palette.paletteHome)
  let hexValue = convertPalettetoHex(palette)

  function handleClick(){
    setRGBorHex(!rgbOrHex)
  }

  function saveValue(e) {
    e.preventDefault()
    var copyText = e.target.value

    setMousePos({
      x : e.clientX,
      y : e.clientY,
    })
    setAlert(true)

    setTimeout(() => {
      setAlert(false)
    }, 1000)

    navigator.clipboard.writeText(copyText);
  
  }
    //Locks color in
    function lockColor(e){
  
      let colorNum = e.target.value
      let lockedColor = palette[colorNum]

      if (e.target.checked){
        setSavedColors([...savedColors, lockedColor])
  
      } else {
        setSavedColors(savedColors.filter((color) => color.toString() !== lockedColor.toString()))
      }
  
    }

     

  return (
    <div key={index} className='w-[20%] flex flex-col'>
      <div className='h-[80%] grow' style={{ backgroundColor: color}} />
      <div className=' border text-center w-full p-1'>
        <div>
            {!rgbOrHex ? <button className='border-2 px-2 m-1 rounded-md' type='button' onClick={handleClick} >RGB</button> : null } {!rgbOrHex ? <button onClick={saveValue} value={hexValue[index]}>{hexValue[index].toUpperCase()}</button> : null }
            {rgbOrHex ? <button  className='border-2 px-2 m-1 rounded-md' onClick={handleClick} type='button' >HEX</button> : null } {rgbOrHex ? <button onClick={saveValue} value={`rgb(${color[0]}, ${color[1]}, ${color[2]})`}>{`rgb(${color[0]}, ${color[1]}, ${color[2]})`}</button> : null }
        </div>

          <label htmlFor={`lockin${index}`}>Lock in:
            <input
              
              id={`lockin${index}`}
              type="checkbox"
              name="subscribe"
              value = {index}
              onChange= {lockColor}
            />
          </label>          


    </div>
</div>
  )
}

export default ColorTile