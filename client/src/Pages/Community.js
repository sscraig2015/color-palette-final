import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { communityPalettes } from '../Slices/paletteSlice'
import MultiplePalettes from '../Components/MultiplePalettes'
import SinglePalette from '../Components/SinglePalette'
import { Link } from 'react-router-dom'

const Community = () => {
  
    const dispatch = useDispatch()
    const palettes = useSelector((state) => state.palette.paletteCommunity)
    const popUp = useSelector((state) => state.palette.paletteInfo)
 

    useEffect(() => {
        fetch('/api/palettes/popular')
        .then((r) => r.json())
        .then((data) => dispatch(communityPalettes(data.palettes)))
    }, [])

    if (palettes) {
        return (
            <div className='h-screen mt-[2%]'>
                <div className='flex h-[80%]'>
                    <div className='border w-[20%]'>
                        Side panel    
                    </div>
                    <div className='flex flex-col h-[100%] grow'>
                        <div className='flex flex-wrap h-[90%] gap-2 p-3'>
                            {palettes.map((palette) => {
                                return <MultiplePalettes palette={palette}/>
                            })}
                            
                        </div>
                        <div>Hello</div>
                    </div>
                </div>
                {popUp? <SinglePalette /> : null}
                <Link className='bg-blue-500 rounded-xl h-10 w-80' to='/home'>Generate palette</Link>
            </div>
        )
                    }
}

export default Community