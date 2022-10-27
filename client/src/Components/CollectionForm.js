import React, {useState}from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateCollection } from '../Slices/userSlice'

const CollectionForm = () => {
  
    const dispatch = useDispatch()
    const palette = useSelector((state) => state.palette.paletteInfo)
    const user = useSelector((state) => state.user)
    const [errors, setErrors] = useState(false)
    const [selection, setSelection] = useState()
    
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
  )
}

export default CollectionForm