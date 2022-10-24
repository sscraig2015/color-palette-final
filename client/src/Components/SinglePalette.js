import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { paletteInfo } from '../Slices/paletteSlice'
import TagForm from './TagForm'


const SinglePalette = () => {
    
    const dispatch = useDispatch()
    const palette = useSelector((state) => state.palette.paletteInfo)
    const user = useSelector((state) => state.user)
    const [selection, setSelection] = useState()
    console.log(selection)


    function closePopUp(){
        dispatch(paletteInfo(null))
    }

    function saveCollection(e){
        e.preventDefault()



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
                    <div>
                        <form onSubmit={(e) => saveCollection(e)}>
                            <label for='collections'>Save to collection:</label>
                            <select id='collections' onChange={(e) => setSelection(e.target.value)}>
                                {user.collections.map((collection) => {
                                    return <option value={collection.title}>{collection.title}</option>
                                })}
                            </select>
                            <input className='border bg-slate-300 rounded-lg' type='submit' value='save'></input>
                        </form>
                    </div>
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