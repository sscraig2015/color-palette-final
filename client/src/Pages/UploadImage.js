import React, { useEffect, useState } from 'react';
import {  useDispatch } from 'react-redux';
import ImageUploading from 'react-images-uploading';
import { uploadPalette } from '../Slices/paletteSlice';
import UploadImagePalette from '../Components/UploadImagePalette';
import  ColorThief  from 'colorthief'


export function UploadImage() {

  const colorThief = new ColorThief()
  const dispatch = useDispatch()

  
  const [images, setImages] = useState(null);
  const maxNumber = 1;

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);

  };

  useEffect(() => {

    console.log('render')
    const img = document.querySelector('img');

      if(img){

        if(img.complete) {

          dispatch(uploadPalette(colorThief.getPalette(img,5)))
        }  else {
  
            img.addEventListener('load', function() {
              dispatch(uploadPalette(colorThief.getPalette(img, 5)))
          });
      }}
    
  }, [images])


  return (
    <div className='w-[50%] mx-auto mt-[5%]'>
      <ImageUploading
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageUpdate,
          isDragging,
          dragProps,
        }) => (

          
          <div className='border flex'>
            
            <div>
                <button className='border bg-slate-400 px-1 h-[100%]'
                  style={isDragging ? { color: 'red' } : undefined}
                  onClick={onImageUpload}
                  {...dragProps} >
                  Click or Drop here
                </button>
            </div>
            <div className='m-[3%]'>
              {imageList.map((image, index) => (
                <div className='flex flex-col' key={index} >
                  <img src={image['data_url']} alt="" width="200" />
                  <div className='border'>
                    <button onClick={() => onImageUpdate(index)}>Update</button>
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        )}
      </ImageUploading>
      <div>
            {images? <UploadImagePalette/> : null}
      </div>
    </div>
  );
}

export default UploadImage