import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTag } from '../Slices/paletteSlice'


const TagForm = () => {

    const [tag, setTag] = useState()
    const [errors, setErrors] = useState()
    const palette = useSelector((state) => state.palette.paletteInfo)
    const dispatch = useDispatch()

    useEffect(() => {

        setTimeout(() => {
            setErrors(false)
        }, 4500)

    }, [errors])
    
    function validateSearch(e){
        e.preventDefault()

        for (const oldTag of palette.tags) {
            if(oldTag.name === tag) {
                return (
                    setErrors(true)
                )
            }         
        }
        newTag()
    }

    function newTag(){
        const id = palette.id
        dispatch(addTag({id: id, tag: tag}))
    }
  
    return (
    <form onSubmit={(e) => validateSearch(e)}>
        <input type='text' placeholder='Add tag....' value={tag} onChange={(e) => setTag(e.target.value)}></input>
        <input type='submit'></input>
        {errors? <span>That tag is already taken...</span> : null}
    </form>
  )
}

export default TagForm