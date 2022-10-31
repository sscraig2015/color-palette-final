import React, {useState}from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateCollection, addPaletteToCollection } from '../Slices/userSlice'

const CollectionForm = () => {
  
    const dispatch = useDispatch()
    const palette = useSelector((state) => state.palette.paletteInfo)
    const user = useSelector((state) => state.user)
    const [errors, setErrors] = useState(false)
    const [selection, setSelection] = useState()
    
    function saveToCollection(e){
        e.preventDefault()
        
        //checks if palette is already in collection
        for (const coll of user.collections) {  
            if (coll.title === selection) {
                for (const collPalette of coll.palettes) {
                    if(palette.id === collPalette.id) {
                       setErrors(true)

                       return setTimeout(() => {
                        setErrors(false)
                       }, 2500)
                    }
                }
            }
        }

        dispatch(addPaletteToCollection({selection: selection, palette: palette}))

        
    }

    return (
        <div>
            <form className='flex justify-end' onSubmit={(e) => saveToCollection(e)}>
                <label >Save to collection:</label>
                <select className='border-2' onChange={(e) => setSelection(e.target.value)}>
                    <option selected>Choose a collection...</option>
                    {user.collections.flat().map((collection, index) => {
                        return <option key={index}  value={collection.title}>{collection.title}</option>
                    })}
                </select>
                <input className='border bg-slate-300 rounded-lg px-1 cursor-pointer active:bg-slate-500' type='submit' value='save'></input>
            </form>
            {errors? <div>Collection already saved...</div> : null}
        </div>
  )
}

export default CollectionForm