import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { paletteInfo } from '../Slices/paletteSlice'
import TagForm from './TagForm'


const SinglePalette = () => {
    
    const palette = useSelector((state) => state.palette.paletteInfo)

    const user = useSelector((state) => state.user.id)
    const dispatch = useDispatch()


    function closePopUp(){
        dispatch(paletteInfo(null))
    }

    return (
        <div className='w-screen h-screen absolute z-[9999] inset-0' style={{background: 'rgba(90, 90, 90, 0.5)'}}>
            <div className='h-[30%] w-[50%] m-auto mt-[5%]'>
                <button onClick={closePopUp} className='relative right-0 bg-slate-300 px-1 mb-1 ml-1'>X</button>
                <div className='border-2 bg-white h-[100%] flex'>
                    {palette.hexValues.map((color, index) => {
                        return <div key={index} className='w-[20%]' style={{background: color}}></div>
                    })}
                </div>
                <div className='bg-white'>
                    {user? <TagForm /> : null}
                    <div className='flex justify-between'>
                        {palette.tags.map((tag) => {
                            return <span>{tag.name}</span>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SinglePalette