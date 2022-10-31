import React from 'react'

const CollectionPreview = ({ updatePalettes, collection}) => {


    if (collection.palettes.length > 0) {
        return (

            <div className='flex flex-col border-4 rounded-md h-1/5 p-1'>
                <div onClick={updatePalettes} className='underline cursor-pointer'>{collection.title}</div>
                <div className='flex h-1/3 p-1 '>
                    {collection.palettes[0].hexValues.map((color, index) => {
                    return <div key={index} className=' w-1/5' style={{background : color}}></div>
                })} 
                </div>
            </div>

        )

    } else {
        return (
        <div className='flex flex-col border-4 rounded-md h-1/5 p-1'>
            <div className='underline'>{collection.title}</div>
            <div className=' text-sm'>No palettes saved...</div>
        </div>
        )
    }

}

export default CollectionPreview