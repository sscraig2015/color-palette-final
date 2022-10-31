import React from 'react'
import MultiplePalettes from './MultiplePalettes'

const UserMain = ({palette, palettes, page}) => {

    if (palette) {
        return (
            <div className='flex flex-wrap justify-start gap-3 grow p-3'>
                {palettes[page - 1].map((palette, key ) => {
                    return <MultiplePalettes key={key} palette={palette}/>
                })}
            
            </div>
        )
    } else {
        return (
            <div className='border gap-3 grow p-3'>
                <div className='border text-center w-[30%] mx-auto'>You haven't saved any palettes yet. Generate a new palette below to start!</div>
            </div>            
        )
    }
}

export default UserMain