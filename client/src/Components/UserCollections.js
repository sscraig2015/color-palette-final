import React from 'react'
import { useSelector } from 'react-redux'
import CollectionPreview from './CollectionPreview'

const UserCollections = ( {page, updatePalettes }) => {
  
    const collections = useSelector((state) => state.user.collections)

    if(collections.length > 0){
        return(        
            collections[page].map((collection, index) => {
                return <CollectionPreview key={index} collection={collection} updatePalettes={updatePalettes}/>
            }) 
            
        )
        }   
}

export default UserCollections