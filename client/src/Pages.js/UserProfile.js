import React from 'react'
import { useParams, Link } from 'react-router-dom'

const UserProfile = () => {
  
    const params = useParams()



    return (
        <div className='h-screen'>
            <div className='border flex h-[80%]'>
                <div className='border '>
                    Side panel    
                </div>
                <div>
                    palettes
                </div>
            </div>
            <Link className='bg-blue-500 rounded-xl h-10 w-80' to='/home'>Generate palette</Link>
        </div>
  )
}

export default UserProfile