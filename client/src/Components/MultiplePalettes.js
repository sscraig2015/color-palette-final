import React from 'react'
import { useDispatch } from 'react-redux'
import { paletteInfo } from '../Slices/paletteSlice'


const MultiplePalettes = ({palette}) => {

    const dispatch = useDispatch()

    function selectPalette(palette){
        dispatch(paletteInfo(palette))
    }

    return (
    <div onClick={() => selectPalette(palette)}  className='h-[20%] flex w-[30%] hover:scale-[120%] hover:cursor-pointer hover:border-2'>
       {palette.hexValues.map((color, index) => {
            return <div key={index} className='w-[20%]' style={{background: color}}></div>
        })}
    </div>
  )
}

export default MultiplePalettes