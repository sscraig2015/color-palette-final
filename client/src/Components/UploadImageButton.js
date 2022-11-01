import React from 'react'

const UploadImageButton = ({isDragging, onImageUpload, dragProps}) => {
  return (
    <div>
      <button className='border bg-slate-400 px-1 w-full'
        style={isDragging ? { color: 'red' } : undefined}
        onClick={onImageUpload}
        {...dragProps} >
        Click or Drop here
      </button>
    </div>
  )
}

export default UploadImageButton