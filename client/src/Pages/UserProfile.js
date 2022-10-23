import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import MultiplePalettes from '../Components/MultiplePalettes'
import SinglePalette from '../Components/SinglePalette'
import { currentPalettes, paletteInfo  } from '../Slices/paletteSlice'
import Paginate from '../Components/Paginate'

const UserProfile = () => {
  
    const palettes = useSelector((state) => state.palette.currentPalettes.palettes)
    console.log(palettes)
    const popUp = useSelector((state) => state.palette.paletteInfo)
    const params = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(paletteInfo(null))
    }, [])

    useEffect(() => {
        fetch(`/users/${params.username}/${params.page}`).then((r) => {
            if (r.ok) {
              r.json().then((data) => dispatch(currentPalettes(data)));
            }
          })
      }, []);
    
    if (palettes) {
        return (
            <div className='h-screen mt-[2%]'>
                <div className='flex h-[80%]'>
                    <div className='border w-[20%]'>
                        Side panel    
                    </div>
                    <div className='flex flex-wrap gap-3 grow p-3'>
                        {palettes.map((palette) => {
                            return <MultiplePalettes palette={palette}/>
                        })}
                    </div>
                </div>
                {popUp? <SinglePalette /> : null}
                <Link className='bg-blue-500 rounded-xl h-10 w-80' to='/home'>Generate palette</Link>
                <Paginate />
            </div>
        )        
    }

}

export default UserProfile