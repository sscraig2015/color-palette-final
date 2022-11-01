import React, { useEffect, useState } from 'react'
import {  useNavigate, useSearchParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import SinglePalette from '../Components/SinglePalette'
import {  currentPalettes  } from '../Slices/paletteSlice'
import Paginate from '../Components/Paginate'
import { createCollection } from '../Slices/userSlice'
import PaginateCollections from '../Components/PaginateCollections'

import UserMain from '../Components/UserMain'
import UserCollections from '../Components/UserCollections'



const UserProfile = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const page = searchParams.get('page')


    const dispatch = useDispatch()
    const navigate = useNavigate()

    
    const user = useSelector(((state) => state.user))
    const collections = useSelector((state) => state.user.collections)
    const palettes = useSelector((state) => state.palette.currentPalettes)
    const popUp = useSelector((state) => state.palette.paletteInfo)
    const errors = useSelector((state) => state.user.errors)
    const [newCollection, setNewCollection] = useState()
    const [collectionPage, setCollectionPage] = useState(0)


   
   useEffect( () => {

        if(user.id){
            dispatch(currentPalettes(user.palettes))
        }

    }, [user])
  
    
function updatePalettes(e){
    e.preventDefault()
    const collectionTitle = e.target.innerHTML


    user.collections.flat().forEach((collection) => {

     if (collection.title === collectionTitle) {
        dispatch((currentPalettes(collection.palettes)))
        setSearchParams({page : '1'})
    }
})

}

function addCollection(e) {
    e.preventDefault()

    dispatch(createCollection(newCollection))

}
    
if (palettes) {
        return (
        <div className='h-[90%]'>
            <div className='flex h-[90%] w-[95%] mx-auto'>
                <div className='w-[20%] p-1 flex flex-col gap-2'>
                    <form className='border-4 rounded-md p-1' onSubmit={(e) => addCollection(e)}>
                        <label>Create collection:</label>
                        <input className='border' type='text' value={newCollection} onChange={(e) => setNewCollection(e.target.value)}></input>
                        <input type='submit' className='border bg-slate-300 rounded-lg px-1 cursor-pointer active:bg-slate-500'></input>
                        {errors? <div>{errors.createCollection}</div> : null}
                    </form>
                    <div className='cursor-pointer border-4 rounded-md p-2  text-center active:bg-slate-500' onClick={(e) => dispatch(currentPalettes(user.palettes))}>ALL PALETTES</div>
                    <div className='h-[70%] flex flex-col gap-1 '>
                        <UserCollections page={collectionPage} updatePalettes={updatePalettes}/> 
                    </div>
                    <PaginateCollections collections={collections} setCollectionPage={setCollectionPage} page={collectionPage}/>
                </div>
                <div className='flex flex-col grow h'>
                    {palettes.length === 0?  <UserMain palette={false} /> : <UserMain palette={true} palettes={palettes} page={page} />}

                    {palettes.length > 0? <Paginate palettes={palettes}/> : null}
                </div>

            </div>
            {popUp? <SinglePalette /> : null}
            <div className=' w-[25%] mx-auto text-center'><button onClick={() => navigate('/home')} className='bg-blue-500 rounded-xl h-full'>Generate Palette</button></div>
            
        </div>
    )   
}
     



}

export default UserProfile