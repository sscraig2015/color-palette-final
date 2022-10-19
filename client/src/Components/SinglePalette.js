import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { paletteInfo, addTag } from '../Slices/paletteSlice'


const SinglePalette = () => {
    
    const palette = useSelector((state) => state.palette.paletteInfo)
    const dispatch = useDispatch()
    const [tag, setTag] = useState()

    function closePopUp(){
        dispatch(paletteInfo(null))
    }

    function newTag(e){
        e.preventDefault()

        fetch(`/palettes/${palette.id}`, {
            method: 'PATCH',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify({
                tags: tag,
            })
        })
        .then((r) => r.json())
        .then((data) => dispatch(addTag(data)))
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
                    <form onSubmit={(e) => newTag(e)}>
                        <input type='text' placeholder='Add tag....' value={tag} onChange={(e) => setTag(e.target.value)}></input>
                        <input type='submit'></input>
                    </form>
                    <div className='flex justify-between'>
                        {palette.tags.map((tag) => {
                            return <span>{tag}</span>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SinglePalette