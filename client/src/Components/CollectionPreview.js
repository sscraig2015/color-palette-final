import React from 'react'

const CollectionPreview = ({index, updatePalettes, collection}) => {
    console.log(collection.palettes.length)

    if (collection.palettes.length > 0) {
        return (
            <div onClick={updatePalettes} className='flex flex-col cursor-pointer border-4 rounded-md grow p-1'>
                <div className='underline'>{collection.title}</div>
                <div className='flex grow p-1 gap-1'>
                    {collection.palettes[0].hexValues.map((color) => {
                    return <div className=' w-1/5 rounded-full' style={{background : color}}></div>
                })} 
                </div>
            </div>
        )

    } else {
        return (
        <div className='cursor-pointer border-4 rounded-md grow p-1'>
            <div>{collection.title}</div>
            <div>No palettes saved...</div>
        </div>
        )
    }

}

export default CollectionPreview