import React, {useEffect, useState} from 'react'
import UserAction from './UserAction';

const HomepagePalette = () => {
  
    const [palette, setPalette] = useState()
    
    const [rgbOrHex, setRGBorHex] = useState(true)
    
    
    function ColorToHex(color) {
      var hexadecimal = color.toString(16);
      return hexadecimal.length === 1 ? "0" + hexadecimal : hexadecimal;
    }
    
    function ConvertRGBtoHex(red, green, blue) {
      return "#" + ColorToHex(red) + ColorToHex(green) + ColorToHex(blue);
    }
  
    function convertPalettetoHex(givenPalette){
        console.log(givenPalette)
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

      
         // Copy the text inside the text field
        navigator.clipboard.writeText(copyText);
      

      }
    
    useEffect(() => {
        const options = {
          method: 'POST',
          body: JSON.stringify({ 	
            model : "default",
            input : ["N","N","N","N","N"]})
        }
        fetch(`http://colormind.io/api/`, options)
          .then((r) => r.json())
          .then((data) => setPalette(data))
      }, [])

      function newPalette(){
        const options = {
            method: 'POST',
            body: JSON.stringify({ 	
              model : "default",
              input : ["N","N","N","N","N"]})
          }
          fetch(`http://colormind.io/api/`, options)
            .then((r) => r.json())
            .then((data) => setPalette(data))
      }
    
    if(palette){
        let hexValue = convertPalettetoHex(palette.result)
        return (
            <div className='h-screen w-screen'>
                <form className='h-[80%]'>
                    <div className='w-screen h-[100%] flex'>
                        {palette.result.map((color, key) => {
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


export default HomepagePalette