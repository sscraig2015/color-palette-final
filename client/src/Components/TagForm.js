import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTag } from '../Slices/paletteSlice'

const TagForm = () => {

    const [tag, setTag] = useState()
    const [errors, setErrors] = useState()
    const palette = useSelector((state) => state.palette.paletteInfo)
    const dispatch = useDispatch()

    
    function validateSearch(e){
        e.preventDefault()


        for (const oldTag of palette.tags) {
            if(oldTag.name === tag) {
                return setErrors(true)
            }
        }

        newTag()
    }

    function newTag(){




        fetch(`/palettes/${palette.id}`, {
            method: 'PATCH',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify({
                tag: tag,
            })
        })
        .then((r) => r.json())
        .then((data) => dispatch(addTag(data.tags)))
    }
  return (
    <form onSubmit={validateSearch}>
        <input type='text' placeholder='Add tag....' value={tag} onChange={(e) => setTag(e.target.value)}></input>
        <input type='submit'></input>
        {errors? <span>That tag is already taken...</span> : null}
    </form>
  )
}

export default TagForm