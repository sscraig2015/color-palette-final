import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import MultiplePalettes from '../Components/MultiplePalettes'
import SinglePalette from '../Components/SinglePalette'
import { paletteInfo  } from '../Slices/paletteSlice'

const UserProfile = () => {
  
    const palettes = useSelector((state) => state.user.userPalettes)
    const popUp = useSelector((state) => state.palette.paletteInfo)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(paletteInfo(null))
    }, [])
    
    return (
        <div className='h-screen mt-[2%]'>
            <div className='flex h-[80%]'>
                <div className='border w-[20%]'>
                    Side panel    
                </div>
                <div className='flex flex-wrap gap-3 grow p-3'>
                    {palettes.map((palette) => {
                        return <MultiplePalettes palette={palette.hexValues}/>
                    })}
                </div>
            </div>
            {popUp? <SinglePalette /> : null}
            <Link className='bg-blue-500 rounded-xl h-10 w-80' to='/home'>Generate palette</Link>
        </div>
  )
}

export default UserProfile