import React from 'react'
import { useSelector } from 'react-redux'

const SavePaletteBox = ( { mousePos }) => {

  return (
    <div style={{left : mousePos.x + 15, top : mousePos.y}}>
        hello
    </div>
  )
}

export default SavePaletteBox