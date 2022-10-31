import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTag } from '../Slices/paletteSlice'



const TagForm = () => {

    const [tag, setTag] = useState('')
    const [errors, setErrors] = useState()
    const palette = useSelector((state) => state.palette.paletteInfo)
    const dispatch = useDispatch()
    console.log(tag)
    
    useEffect(() => {

        setTimeout(() => {
            setErrors(null)
        }, 3500)

    }, [errors])
    
    function validateSearch(e){
        e.preventDefault()

        if(tag.trim().length === 0){
            return setErrors({errors: 'Tag can not be blank.'})
            
        }
        
        for (const oldTag of palette.tags) {
            if(oldTag.name.trim() === tag.trim()) {
                return setErrors({errors: 'Palette already has this tag.'})
            }         
        }
        newTag()
    }

    function newTag(){
        dispatch(addTag({id: palette.id, tag: tag.trim()}))

    }
  
    return (
    <form  onSubmit={(e) => validateSearch(e)}>
        <input type='text' placeholder='Add tag....' value={tag} onChange={(e) => setTag(e.target.value)}></input>
        <input className='border-1 bg-slate-300 rounded-lg px-1 cursor-pointer active:bg-slate-500' type='submit'></input>
        {errors? <span>{errors.errors}</span> : null}
    </form>
  )
}

export default TagForm