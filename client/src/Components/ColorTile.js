import React, { useState } from 'react'

import { useSelector } from 'react-redux'

import { hexToRGB } from '../Features/ConvertColor'

const ColorTile = ( { index, color, setSavedColors, savedColors, setMousePos, setAlert }) => {
  
  const [rgbOrHex, setRGBorHex] = useState(true)
  const palette = useSelector((state) => state.palette.paletteHome)
  let rgbValue = hexToRGB(color)
  console.log(rgbValue)

  
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
            {!rgbOrHex ? <button className='border-2 px-2 m-1 rounded-md' type='button' onClick={handleClick} >RGB</button> : <button className='border-2 px-2 m-1 rounded-md' type='button' onClick={handleClick} >HEX</button> } 
            {!rgbOrHex ? <button onClick={saveValue} value={color}>{color.toUpperCase()}</button> : <button onClick={saveValue} value={rgbValue}>{rgbValue}</button> }
        </div>

          <label className=' cursor-pointer'htmlFor={`lockin${index}`}>Lock in:
            <input
              className='cursor-pointer'
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