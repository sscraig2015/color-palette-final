import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  fetchLatestPalettes } from '../Slices/paletteSlice'
import MultiplePalettes from '../Components/MultiplePalettes'
import SinglePalette from '../Components/SinglePalette'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Header from '../Components/Header'

const Community = () => {
  
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const page = searchParams.get('page')
    const palettes = useSelector((state) => state.palette.currentPalettes)
    const popUp = useSelector((state) => state.palette.paletteInfo)
 

    useEffect(() => {
        dispatch(fetchLatestPalettes())
    }, [])

    if (palettes) {
        return (
            <div className='h-[90%]'>
                <Header />
                <div className='h-[75%] w-[87%] mx-auto text-center'>
                            <div className='flex flex-wrap justify-evenly h-[100%] gap-2 p-2'>
                                {palettes[parseInt(page) - 1].map((palette, index) => {
                                    return <MultiplePalettes key={index} palette={palette}/>
                                })}
                            </div>
                    {popUp? <SinglePalette /> : null}
                    <button onClick={() => navigate('/home')} className='bg-blue-500 rounded-xl h-10 w-80'>Generate Palette</button>
                </div>
            </div>
        )
                    }
}

export default Community