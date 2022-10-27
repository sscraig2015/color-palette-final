import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { paletteInfo } from '../Slices/paletteSlice'
import CopyAlert from './CopyAlert'

import TagForm from './TagForm'
import CollectionForm from './CollectionForm'


const SinglePalette = () => {
    
    const dispatch = useDispatch()
    const palette = useSelector((state) => state.palette.paletteInfo)
    const user = useSelector((state) => state.user)
    const [mousePos, setMousePos] = useState({})
    const [alert, setAlert] = useState(false)

    
    function closePopUp(){
        dispatch(paletteInfo(null))
    }

    function saveValue(e) {
        e.preventDefault()
        var copyText = e.target.value

        setMousePos({
          x : e.clientX,
          y : e.clientY,
        })
        setAlert(true)

        setTimeout(() => {
          setAlert(false)
        }, 2500)

        navigator.clipboard.writeText(copyText);
      
      }


    return (
        <div className='w-screen h-screen absolute z-[9999] inset-0' style={{background: 'rgba(90, 90, 90, 0.5)'}}>
            {alert? <CopyAlert mousePos = {mousePos}/> : null }
            <div className='w-[50%] m-auto mt-[5%] bg-slate-100 rounded-lg p-1'>
                <div className='flex justify-end w-[99%]'><button onClick={closePopUp} className='px-1 my-1 w-[5%] rounded-lg hover:bg-gray-400 hover:text-white'>X</button></div>
                
                <div className='bg-white h-60 flex'>
                    {palette.hexValues.map((color, index) => {
                        return <div onClick={saveValue} key={index} className='w-[20%] text-white text-lg hover:cursor-pointer' style={{background: color}}>{color}</div>
                    })}
                </div>
                <div className='bg-slate-100'>
                    <div>
                        {user.id? <CollectionForm /> : null} 
                    
                    </div>
                    {user.id? <TagForm /> : null}
                    
                    <div className='flex gap-2 my-6'>
                        <div >
                            Tags...   
                        </div>
                        <div className='flex flex-wrap gap-3'>
                            {palette.tags.map((tag) => {
                                return <span onClick={((e) => console.log('can click span'))}className='bg-blue-200 p-1 rounded-lg'>{tag.name}</span>
                            })}                            
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default SinglePalette