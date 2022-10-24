import React, { useState }from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {  currentPalettes } from '../Slices/paletteSlice'
import Paginate from './Paginate'

const Header = () => {
  
    const [search, setSearch] = useState()
    const [errors, setErrors] = useState(null)
    const dispatch = useDispatch()

    let navigate = useNavigate()
    
    function fetchPalette(e){
        e.preventDefault()
  
        fetch(`/api/palettes/${search.toLowerCase()}/1`)
        .then((r) => {
            if(r.ok){
                r.json()
                .then((data) => dispatch(currentPalettes(data)))
                navigate(`/community/${search}/1`)

            } else {
                r.json().then((data) => setErrors(data))

            }
        })
    }

    function handlePopular(){
        navigate('/community/popular/1')
        window.location.reload()

    }


    return (
    <div className='flex justify-between w-[87%] mx-auto p-2 border'>
        <div className='w-[33%]'>
            <Link to='/community/popular/all/1' onClick={(e) => handlePopular()}>Popular</Link>

        </div>
        <div className='w-[33%] text-center'>
            <Paginate />
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