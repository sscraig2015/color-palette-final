import React, { useEffect, useState } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import ImageUploading from 'react-images-uploading';
import { uploadPalette } from '../Slices/paletteSlice';
import UploadImagePalette from '../Components/UploadImagePalette';
import  ColorThief  from 'colorthief'
import {Link, useNavigate} from 'react-router-dom'


export function UploadImage() {

  const colorThief = new ColorThief()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const palette = useSelector((state) => state.palette.paletteUpload)
  const [images, setImages] = useState(null);
  const maxNumber = 1;

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);

  };

  function ColorToHex(color) {
    var hexadecimal = color.toString(16);
    return hexadecimal.length === 1 ? "0" + hexadecimal : hexadecimal;
  }
  
  function ConvertRGBtoHex(red, green, blue) {
    return "#" + ColorToHex(red) + ColorToHex(green) + ColorToHex(blue);
  }

  function convertPalettetoHex(givenPalette){
    return givenPalette.map((colorRGB) => {
      return ConvertRGBtoHex(colorRGB[0], colorRGB[1], colorRGB[2])
    })
  }

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
      <div>
      <button onClick={() => navigate('/home')} className='bg-blue-500 rounded-xl h-10 w-80'>Generate Palette</button>
        <button  onClick={savePalette}className='bg-blue-500 rounded-xl h-10 w-80'>Save Palette</button>
      </div>
      
    </div>
  );
}

export default UploadImage