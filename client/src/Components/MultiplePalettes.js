import React from 'react'
import { useDispatch } from 'react-redux'
import { paletteInfo } from '../Slices/paletteSlice'


const MultiplePalettes = ({palette}) => {

    const dispatch = useDispatch()

  
    function handleClick(palette){
        dispatch(paletteInfo(palette))
    }

    return (
    <div onClick={() => handleClick(palette)}  className='flex w-[30%] hover:scale-[120%] hover:cursor-pointer hover:border-2'>
`        {palette.map((color) => {
            return <div className='w-[20%]' style={{background: color}}></div>
        })}`
    </div>
  )
}

export default MultiplePalettes