import React, { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import MultiplePalettes from '../Components/MultiplePalettes'
import SinglePalette from '../Components/SinglePalette'
import {  currentPalettes  } from '../Slices/paletteSlice'
import Paginate from '../Components/Paginate'
import { createCollection } from '../Slices/userSlice'



const UserProfile = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const page = searchParams.get('page')

    const dispatch = useDispatch()  

    
    const user = useSelector(((state) => state.user))
    const palettes = useSelector((state) => state.palette.currentPalettes)

    const popUp = useSelector((state) => state.palette.paletteInfo)
    const [newCollection, setNewCollection] = useState()
   
   
   useEffect( () => {

        if(user.id){
            dispatch(currentPalettes(user.palettes))
        }

    }, [user])
  
    
    function updatePalettes(e){
        e.preventDefault()
        const collectionTitle = e.target.innerHTML

        user.collections.map((collection) => {

            if (collection.title === collectionTitle) {
                return dispatch(currentPalettes(collection.palettes))
            }
        })
        
    }

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
                                <label>Create collection:</label>
                                <input className='border' type='text' value={newCollection} onChange={(e) => setNewCollection(e.target.value)}></input>
                                <input type='submit'></input>
                            </form>
                            <div>
                            <div id='collections'>
                                <div className='cursor-pointer' onClick={(e) => dispatch(currentPalettes(user.palettes))}>All palettes</div>
                                {user.collections.map((collection, index) => {
                                    return <div key={index} className='cursor-pointer' onClick={updatePalettes}>{collection.title}</div>
                                })}
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-wrap justify-start gap-3 grow p-3'>
                        {palettes[page - 1].map((palette, key ) => {
                            return <MultiplePalettes key={key} palette={palette}/>
                        })}
                    </div>
                </div>
                {popUp? <SinglePalette /> : null}
                <Link className='bg-blue-500 rounded-xl h-10 w-80' to='/home'>Generate palette</Link>
                <Paginate palettes={user.palettes} />
            </div>
        )        
    }

}

export default UserProfile