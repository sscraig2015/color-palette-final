import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTag, resetPaletteErrors } from '../Slices/paletteSlice'



const TagForm = () => {

    const [tag, setTag] = useState('')

    const errors = useSelector((state) => state.palette.errors)
    const palette = useSelector((state) => state.palette.paletteInfo)
    const dispatch = useDispatch()

    

    

    function newTag(e){
        e.preventDefault()
        dispatch(addTag({id: palette.id, tag: tag.trim(), palette: palette}))
        .then((r) => {
            if(r.meta.requestStatus === 'fulfilled'){
              console.log(r)
            } else {
              setTimeout(() => {
                dispatch(resetPaletteErrors())
              }, 2500)
            }})

    }
  
    return (
    <form  onSubmit={(e) => newTag(e)}>
        <input type='text' placeholder='Add tag....' value={tag} onChange={(e) => setTag(e.target.value)}></input>
        <input className='border-1 bg-slate-300 rounded-lg px-1 cursor-pointer active:bg-slate-500' type='submit'></input>
        {errors? <span>{errors}</span> : null}
    </form>
  )
}

export default TagForm