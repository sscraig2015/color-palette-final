import React from 'react'

import {  useSelector } from 'react-redux'


const UploadImagePalette = () => {


  const palette = useSelector((state) => state.palette.paletteUpload)

  if (palette) {
    console.log(palette)
      return (
        <div className='flex'>
          {palette.map((color) => {
            return <div className='w-10 h-10 rounded-full' style={{background : `rgb(${color})`}}></div>
          })}
        </div>
      ) 
        }
    

}

export default UploadImagePalette