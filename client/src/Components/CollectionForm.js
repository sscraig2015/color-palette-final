import React, {useState}from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  addPaletteToCollection, resetUserErrors, updateUserCollections } from '../Slices/userSlice'

const CollectionForm = () => {
  
    const dispatch = useDispatch()
    const palette = useSelector((state) => state.palette.paletteInfo)
    const user = useSelector((state) => state.user)
    const errors = useSelector((state) => state.user.errors)
    const [selection, setSelection] = useState()
    
    function saveToCollection(e){
        e.preventDefault()
        
        dispatch(addPaletteToCollection({selection: selection, palette: palette, user:user}))
        .then((r) => {
            if(r.meta.requestStatus === 'fulfilled'){
                console.log('updated collection')
            } else {
                setTimeout(() => {
                    dispatch(resetUserErrors())
                }, 2500)
            }})
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