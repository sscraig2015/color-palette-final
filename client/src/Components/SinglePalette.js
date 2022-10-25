import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { paletteInfo } from '../Slices/paletteSlice'
import { updateCollection } from '../Slices/userSlice'
import TagForm from './TagForm'


const SinglePalette = () => {
    
    const dispatch = useDispatch()
    const palette = useSelector((state) => state.palette.paletteInfo)
    const user = useSelector((state) => state.user)
    const [selection, setSelection] = useState()
    const [errors, setErrors] = useState(false)

    
    function closePopUp(){
        dispatch(paletteInfo(null))
    }

    function saveToCollection(e){
        e.preventDefault()
        
        for (const coll of user.collections) {  
            if (coll.title === selection) {
                for (const collPalette of coll.palettes) {
                    if(palette.id === collPalette.id) {
                        return setErrors(true)
                    }
                }
            }
        }

        fetch(`/collections/${selection}`, {
            method: 'PATCH',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify({
                palette_id: palette.id,
            })
        })
        .then((r) => r.json())
        .then((data) => dispatch(updateCollection(data)))
        
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
                        <form onSubmit={(e) => saveToCollection(e)}>
                            <label htmlFor='collections'>Save to collection:</label>
                            <select id='collections' onChange={(e) => setSelection(e.target.value)}>
                                {user.collections.map((collection) => {
                                    return <option value={collection.title}>{collection.title}</option>
                                })}
                            </select>
                            <input className='border bg-slate-300 rounded-lg' type='submit' value='save'></input>
                        </form>
                        {errors? <div>Collection already saved...</div> : null}
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