import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTag } from '../Slices/paletteSlice'

const TagForm = () => {

    const [tag, setTag] = useState()
    const palette = useSelector((state) => state.palette.paletteInfo)
    const dispatch = useDispatch()

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
    <form onSubmit={(e) => newTag(e)}>
        <input type='text' placeholder='Add tag....' value={tag} onChange={(e) => setTag(e.target.value)}></input>
        <input type='submit'></input>
    </form>
  )
}

export default TagForm