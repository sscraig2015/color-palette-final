import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { currentPalettes } from '../Slices/paletteSlice'
import MultiplePalettes from '../Components/MultiplePalettes'
import SinglePalette from '../Components/SinglePalette'
import { Link } from 'react-router-dom'
import Header from '../Components/Header'

const Community = () => {
  
    const dispatch = useDispatch()
    const palettes = useSelector((state) => state.palette.currentPalettes.palettes)
    const popUp = useSelector((state) => state.palette.paletteInfo)
 

    useEffect(() => {
        fetch('/api/palettes/popular')
        .then((r) => r.json())
        .then((data) => dispatch(currentPalettes(data)))
    }, [])

    if (palettes) {
        return (
            <div className='h-screen'>
                <Header />
                <div className='h-[75%] w-[87%] mx-auto text-center'>
                            <div className='flex flex-wrap justify-evenly h-[100%] gap-2 p-2'>
                                {palettes.map((palette, index) => {
                                    return <MultiplePalettes key={index} palette={palette}/>
                                })}
                            </div>
                    {popUp? <SinglePalette /> : null}
                    <Link className='bg-blue-500 rounded-xl h-10 w-80' to='/home'>Generate palette</Link>
                </div>
            </div>
        )
                    }
}

export default Community