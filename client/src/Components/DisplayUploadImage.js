import React from 'react'

const DisplayUploadImage = ({imageList, onImageUpdate}) => {
  return (
    <div className='m-[3%] relative'>
    {imageList.map((image, index) => (
      <div className='flex flex-col' key={index} >
        <img src={image['data_url']} alt="" width="300" />
        <div className='border'>
          <button onClick={() => onImageUpdate(index)}>Update</button>
        </div>
      </div>
    ))}
  </div>
  )
}

export default DisplayUploadImage