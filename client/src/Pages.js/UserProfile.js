import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import MultiplePalettes from '../Components/MultiplePalettes'

const UserProfile = () => {
  
    const palettes = useSelector((state) => state.user.userPalettes)
    return (
        <div className='h-screen'>
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
            <Link className='bg-blue-500 rounded-xl h-10 w-80' to='/home'>Generate palette</Link>
        </div>
  )
}

export default UserProfile