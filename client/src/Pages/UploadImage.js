import React from 'react';
import ImageUploading from 'react-images-uploading';

export function UploadImage({imageList, dragProps, isDragging}) {
  const [images, setImages] = React.useState([]);
  const maxNumber = 1;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

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
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          
          
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
                  <img src={image['data_url']} alt="" width="100" />
                  <div className='border'>
                    <button onClick={() => onImageUpdate(index)}>Update</button>
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        )}
      </ImageUploading>
      <div>hello</div>
    </div>
  );
}

export default UploadImage