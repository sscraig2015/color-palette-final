import React from 'react'

const CopyAlert = ( { mousePos } ) => {

    return (
        <div style={{left : mousePos.x + 15, top : mousePos.y}} className='absolute bg-slate-300 rounded-lg px-1'>
            Copied!
        </div>
  );
}

export default CopyAlert