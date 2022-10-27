import React, { useEffect, useState }from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {  currentPalettes } from '../Slices/paletteSlice'
import Paginate from './Paginate'

const Header = () => {
  
    const [search, setSearch] = useState()
    const [errors, setErrors] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const currentTag = searchParams.get('tag')
    console.log(currentTag)

    const palettes = useSelector((state) => state.palette.currentPalettes)
    const dispatch = useDispatch()

    useEffect(() => {
    
    }, [searchParams])
    
    function fetchPalette(e){
        e.preventDefault()
  
        fetch(`/api/palettes/${search.toLowerCase()}`)
        .then((r) => {
            if(r.ok){
                r.json()
                .then((data) => dispatch(currentPalettes(data)))
                setSearchParams({tag : search, page : 1})

            } else {
                r.json().then((data) => {
                    
                    setErrors(data)

                    setTimeout(() => {
                        setErrors(false)
                    }, 2500)

                }, )

            }
        })
    }

        return (
        <div className='flex justify-between w-[87%] mx-auto p-2 border'>
            <div className='w-[33%] text-center'>
                Viewing search for: "{currentTag? currentTag : 'most recent'}"
                <Paginate palettes={palettes}/>
            </div>
            <div className='w-[33%]'>
                <form onSubmit={fetchPalette} className='tagSearch'>
                    <label>search tags: </label>
                    <input className='border' value={search} onChange={((e) => setSearch(e.target.value))}></input>
                </form>
                {errors? <div>{errors.errors}</div> : null}
            </div>
        </div>
        )        


}

export default Header