import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import MultiplePalettes from '../Components/MultiplePalettes'
import SinglePalette from '../Components/SinglePalette'
import {  paletteInfo  } from '../Slices/paletteSlice'
import Paginate from '../Components/Paginate'
import { createCollection } from '../Slices/userSlice'


const UserProfile = () => {
    const params = useParams()
    const dispatch = useDispatch()  

    let palettes = useSelector(((state) => state.user.palettes))
    
    const popUp = useSelector((state) => state.palette.paletteInfo)
    const [newCollection, setNewCollection] = useState()
    
    useEffect(() => {
        dispatch(paletteInfo(null))
    }, [])


      function addCollection(e) {
        e.preventDefault()

        fetch(`/collections`, {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify({
                title: newCollection,
            })
        })
        .then((r) => r.json())
        .then((data) => dispatch(createCollection(data)))
      }
    
    if (palettes) {
        return (
            <div className='h-screen mt-[2%]'>
                <div className='flex h-[80%]'>
                    <div className='border w-[20%]'>
                        Side panel
                        <div>
                            <form onSubmit={(e) => addCollection(e)}>
                                <label>Creat collection:</label>
                                <input className='border' type='text' value={newCollection} onChange={(e) => setNewCollection(e.target.value)}></input>
                                <input type='submit'></input>
                            </form>
                        </div>
                    </div>
                    <div className='flex flex-wrap gap-3 grow p-3'>
                        {palettes[params.page - 1].map((palette, key ) => {
                            return <MultiplePalettes key={key} palette={palette}/>
                        })}
                    </div>
                </div>
                {popUp? <SinglePalette /> : null}
                <Link className='bg-blue-500 rounded-xl h-10 w-80' to='/home'>Generate palette</Link>
                <Paginate palettes={palettes} />
            </div>
        )        
    }

}

export default UserProfile