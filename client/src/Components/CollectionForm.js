import React, {useEffect, useState}from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { newUserPalette } from '../Slices/paletteSlice'
import {  addPaletteToCollection, resetUserErrors, updateUserCollections } from '../Slices/userSlice'

const CollectionForm = () => {
  
    const dispatch = useDispatch()
    const palette = useSelector((state) => state.palette.paletteInfo)
    const user = useSelector((state) => state.user)
    const [errors, setErrors] = useState(null)
    const [selection, setSelection] = useState()
    
    useEffect(() => {
        setTimeout(() => {
            setErrors(null)
        }, 2500)
    }, [errors])

    function saveToCollection(e){
        e.preventDefault()
        
        user.collections.flat().forEach((coll) => {  
            if (coll.title === selection) {
                if(coll.palettes.length === 0){
                    dispatch(addPaletteToCollection({selection: selection, palette: palette}))
                } else {
                    if(coll.palettes.some(collPallete => palette.id === collPallete.id)){  

                        setErrors('Palette already saved')
                    } else {

                        dispatch(addPaletteToCollection({selection: selection, palette: palette}))
                    }                     
                }

            }
        })
    }


    return (
        <div>
            <form className='flex justify-end' onSubmit={(e) => saveToCollection(e)}>
                <label >Save to collection:</label>
                <select className='border-2' onChange={(e) => setSelection(e.target.value)}>
                    <option defaultValue={true}>Choose a collection...</option>
                    {user.collections.flat().map((collection, index) => {
                        return <option key={index}  value={collection.title}>{collection.title}</option>
                    })}
                </select>
                <input className='border bg-slate-300 rounded-lg px-1 cursor-pointer active:bg-slate-500' type='submit' value='save'></input>
            {errors? <div>{errors}</div> : null}
            </form>
            
        </div>
  )
}

export default CollectionForm