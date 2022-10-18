import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { paletteInfo } from '../Slices/paletteSlice'


const SinglePalette = () => {
    
    const palette = useSelector((state) => state.palette.paletteInfo)
    const dispatch = useDispatch()

    function closePopUp(){
        dispatch(paletteInfo(null))
    }

    function newTag(e){
        e.preventDefault()
    }

    return (
        <div className='w-screen h-screen absolute z-[9999] inset-0' style={{background: 'rgba(90, 90, 90, 0.5)'}}>
            <div className='h-[30%] w-[50%] m-auto mt-[5%]'>
                <button onClick={closePopUp} className='relative right-0 bg-slate-300 px-1 mb-1 ml-1'>X</button>
                <div className='border-2 bg-white h-[100%] flex'>
                    {palette.hexValues.map((color) => {
                        return <div className='w-[20%]' style={{background: color}}></div>
                    })}
                </div>
                <div className='bg-white'>
                    <form onSubmit={newTag}>
                        <input type='text' placeholder='Add tag....'></input>
                        <input type='submit'></input>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SinglePalette