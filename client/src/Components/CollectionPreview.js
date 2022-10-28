import React from 'react'

const CollectionPreview = ({index, updatePalettes, collection}) => {
    console.log(collection.palettes.length)

    if (collection.palettes.length > 0) {
        return (

            <div onClick={updatePalettes} className='flex flex-col cursor-pointer border-4 rounded-md h-1/5 p-1'>
                <div className='underline'>{collection.title}</div>
                <div className='flex h-1/3 p-1 '>
                    {collection.palettes[0].hexValues.map((color) => {
                    return <div className=' w-1/5' style={{background : color}}></div>
                })} 
                </div>
            </div>

        )

    } else {
        return (
        <div className='flex flex-col cursor-pointer border-4 rounded-md h-1/5 p-1'>
            <div>{collection.title}</div>
            <div className=' text-sm'>No palettes saved...</div>
        </div>
        )
    }

}

export default CollectionPreview