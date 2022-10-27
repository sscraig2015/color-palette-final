import React from 'react'

const CopyAlert = ( {mousePos} ) => {

    console.log(mousePos.x)
    
    return (
        <div style={{left : mousePos.x + 15, top : mousePos.y}} className={` absolute bg-slate-300`}>
            Copied!
        </div>
  );
}

export default CopyAlert