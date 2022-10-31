import React, { useEffect, useState } from 'react'
import {  useNavigate, useSearchParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import MultiplePalettes from '../Components/MultiplePalettes'
import SinglePalette from '../Components/SinglePalette'
import {  currentPalettes  } from '../Slices/paletteSlice'
import Paginate from '../Components/Paginate'
import { createCollection } from '../Slices/userSlice'
import PaginateCollections from '../Components/PaginateCollections'
import CollectionPreview from '../Components/CollectionPreview'



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


    user.collections.flat().map((collection) => {

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
                    <div className='w-[20%] p-1'>
                        <form className='border p-1' onSubmit={(e) => addCollection(e)}>
                            <label>Create collection:</label>
                            <input className='border' type='text' value={newCollection} onChange={(e) => setNewCollection(e.target.value)}></input>
                            <input type='submit' className='cursor-pointer bg-slate-400 rounded-lg px-1'></input>
                            {errors? <div>{errors}</div> : null}
                        </form>
                        <div className='cursor-pointer' onClick={(e) => dispatch(currentPalettes(user.palettes))}>All palettes</div>
                        <div className='h-[70%] flex flex-col gap-1 '>
                            {collections[collectionPage].map((collection, index) => {
                                    return <CollectionPreview key={index} collection={collection}  updatePalettes={updatePalettes}/>
                            })}                                    
                        </div>
                        <PaginateCollections collections={collections} setCollectionPage={setCollectionPage} page={collectionPage}/>
                    </div>
                    <div className='flex flex-col grow h'>
                        <div className='flex flex-wrap justify-start gap-3 grow p-3'>
                            {palettes[page - 1].map((palette, key ) => {
                                return <MultiplePalettes key={key} palette={palette}/>
                            })}
                            
                        </div>
                        <Paginate palettes={palettes}/>
                    </div>

                </div>
                {popUp? <SinglePalette /> : null}
                <div className=' w-[25%] mx-auto text-center'><button onClick={() => navigate('/home')} className='bg-blue-500 rounded-xl h-full'>Generate Palette</button></div>
                
            </div>
        )        
    } 
    // else {
    //     return (
    //         <div className='h-[80%] mt-[2%]'>
    //             <div className='flex h-[80%] w-[95%] mx-auto'>
    //                 <div className='border w-[20%] p-1'>
    //                     Side panel
    //                     <div>
    //                         <form onSubmit={(e) => addCollection(e)}>
    //                             <label>Create collection:</label>
    //                             <input className='border' type='text' value={newCollection} onChange={(e) => setNewCollection(e.target.value)}></input>
    //                             <input type='submit' className='cursor-pointer bg-slate-400 rounded-lg px-1'></input>
    //                         </form>
    //                         <div>
    //                         <div id='collections'>
    //                             <div className='cursor-pointer' onClick={(e) => dispatch(currentPalettes(user.palettes))}>All palettes</div>
    //                             {user.collections.map((collection, index) => {
    //                                 return <div key={index} className='cursor-pointer' onClick={updatePalettes}>{collection.title}</div>
    //                             })}
    //                         </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className='border gap-3 grow p-3'>
    //                     <div className='border text-center w-[30%] mx-auto'>You haven't saved any palettes yet. Generate a new palette below to start!</div>
    //                 </div>
    //             </div>
    //             {popUp? <SinglePalette /> : null}
    //             <button onClick={() => navigate('/home')} className='bg-blue-500 rounded-xl h-10 w-80'>Generate Palette</button>
                
    //         </div>
    //     )        
    // }

}

export default UserProfile