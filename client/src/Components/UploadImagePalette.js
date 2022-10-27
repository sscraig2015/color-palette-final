import React from 'react'

import {  useSelector } from 'react-redux'


const UploadImagePalette = () => {


  const palette = useSelector((state) => state.palette.paletteUpload)
  const array = Array.from('fivex')

    if (palette) {
      return (
        <div className='flex border h-11'>
          {palette.map((color, index) => {
            return <div key={index} className='w-[20%] h-full' style={{background : `rgb(${color})`}}></div>
          })}
        </div>
      ) 
    } else {
      return (
        <div className='flex border h-11 align-baseline'>
          {array.map((n, index) => {
            return <div key={index} className='w-[20%] h-full text-center' >?</div>
          })}
        </div>
      )
    }
    

}

export default UploadImagePalette          







