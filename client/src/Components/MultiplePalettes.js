import React from 'react'
import { useDispatch } from 'react-redux'
import { paletteInfo } from '../Slices/paletteSlice'


const MultiplePalettes = ({palette}) => {

    const dispatch = useDispatch()

  
    function handleClick(palette){

        fetch(`/palettes/${palette.id}`)
        .then((r) => r.json())
        .then((data) => dispatch(paletteInfo(data)))
        
    }

    return (
    <div onClick={() => handleClick(palette)}  className='h-[20%] flex w-[30%] hover:scale-[120%] hover:cursor-pointer hover:border-2'>
       {palette.hexValues.map((color) => {
            return <div className='w-[20%]' style={{background: color}}></div>
        })}
    </div>
  )
}

export default MultiplePalettes