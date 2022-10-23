import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserAction from '../Components/UserAction';
import {currentPalette} from '../Slices/paletteSlice'

const Homepage = () => {
  
    const dispatch = useDispatch()
    const [rgbOrHex, setRGBorHex] = useState(true)
    const [savedColors, setSavedColors] = useState([])
    console.log(savedColors)
    const palette = useSelector((state) => state.palette.paletteHome)
   
    
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
    
    function handleClick(){
      setRGBorHex(!rgbOrHex)
    }

    function saveValue(e) {
        e.preventDefault()
        var copyText = e.target.value

        navigator.clipboard.writeText(copyText);
      
      }
    
    //Generates new palette on load
    useEffect(() => {
        const options = {
          method: 'POST',
          body: JSON.stringify({ 	
            model : "default",
            input : ["N","N","N","N","N"]})
        }
        fetch(`http://colormind.io/api/`, options)
          .then((r) => r.json())
          .then((data) => dispatch(currentPalette(data)))
      }, [])

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

  //Resets user's palette selection
  function resetForm(){
    document.getElementById('colorForm').reset()
    const clist = document.getElementsByTagName("input");
    for (const el of clist) {
        el.checked = false;
    }
  }


    //Generates new palette with user's saved colors
    function newPalette(e){
    e.preventDefault()
  
    let userColors = [...savedColors]
    
      if(savedColors.length < 5){
        while ( userColors.length < 5) {
          userColors.push("N")
        }
      }
    
        const options = {
            method: 'POST',
            body: JSON.stringify({ 	
              model : "default",
              input : userColors})
          }
          fetch(`http://colormind.io/api/`, options)
            .then((r) => r.json())
            .then((data) => dispatch(currentPalette(data)))
            setSavedColors([])
            resetForm()
    }
    
    if(palette){
        let hexValue = convertPalettetoHex(palette)
        return (
            <div className='h-screen w-screen'>
                <form className='h-[80%]' id='colorForm'>
                    <div className='w-screen h-[100%] flex'>
                        {palette.map((color, key) => {
                            return (
                                //Color Tile
                                <div key={key} className='w-[20%] flex flex-col'>
                                    <div className='h-[80%]' style={{ backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`}}>
                                        
                                    </div>
                                    <div className='h-[13%] border text-center'>
                                        <div>
                                            {!rgbOrHex ? <button className='border-2 px-2 m-1 rounded-md' type='button' onClick={handleClick} >RGB</button> : null } {!rgbOrHex ? <button onClick={saveValue} value={hexValue[key]}>{hexValue[key].toUpperCase()}</button> : null }
                                            {rgbOrHex ? <button  className='border-2 px-2 m-1 rounded-md' onClick={handleClick} type='button' >HEX</button> : null } {rgbOrHex ? <button onClick={saveValue} value={`rgb(${color[0]}, ${color[1]}, ${color[2]})`}>{`rgb(${color[0]}, ${color[1]}, ${color[2]})`}</button> : null }
                                        </div>
                                          <label htmlFor={`lockin${key}`}>Lock in:
                                            <input
                                              id={`lockin${key}`}
                                              type="checkbox"
                                              name="subscribe"
                                              value = {key}
                                              onChange= {lockColor}
                                            />
                                          </label>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </form>
                <UserAction newPalette={newPalette}/>
            </div>
        )
    }
}


export default Homepage