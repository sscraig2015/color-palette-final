import React, { useEffect, useState } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import ImageUploading from 'react-images-uploading';
import { uploadPalette } from '../Slices/paletteSlice';
import UploadImagePalette from '../Components/UploadImagePalette';
import  ColorThief  from 'colorthief'
import {useNavigate} from 'react-router-dom'
import UploadImageButton from '../Components/UploadImageButton';
import DisplayUploadImage from '../Components/DisplayUploadImage';
import  {convertPalettetoHex} from '../Features/ConvertColor'


export function UploadImage() {

  const colorThief = new ColorThief()
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const palette = useSelector((state) => state.palette.paletteUpload)
  const [images, setImages] = useState(null);

  const maxNumber = 1;
  

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);

  };


  useEffect(() => {
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

  function savePalette(){
    const hexArray = convertPalettetoHex(palette)

    fetch('/palettes', {
      method: "POST",
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify({
        hexValues: hexArray,
        tags: [],

      })
    })
    .then((r) => r.json()).then((data) => console.log(data))
  }

  return (
    
    <div className='w-[50%] h-[80%] mt-[2%]  flex flex-col mx-auto'>
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
          <div className='grow'>
            {images? <DisplayUploadImage imageList={imageList} onImageUpdate={onImageUpdate} /> : <UploadImageButton isDragging={isDragging} onImageUpload={onImageUpload} dragProps={dragProps} />}  
          </div>
        )}
      </ImageUploading>
      <UploadImagePalette/>
      <div className='flex justify-center m-4'>
        <button onClick={() => navigate('/home')} className='bg-blue-500 rounded-xl h-full w-80'>Generate Palette</button>
        {user.id? <button  onClick={savePalette}className='bg-blue-500 rounded-xl h-full w-80'>Save Palette</button> : null }
      </div>
      
    </div>
  );
}

export default UploadImage