import React from 'react'

const MultiplePalettes = ({palette}) => {
  return (
    <div className='border flex w-[30%] hover:scale-[120%] hover:cursor-pointer'>
        {palette.map((color) => {
            return <div className='w-[20%]' style={{background: color}}></div>
        })}
    </div>
  )
}

export default MultiplePalettes