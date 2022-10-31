import React from 'react'
import { useSearchParams } from 'react-router-dom'

const Paginate = ({palettes}) => {
    
    const [searchParams, setSearchParams] = useSearchParams()
    const page = parseInt(searchParams.get('page'))

    return (

          <div className='flex justify-center border rounded-full gap-6 w-36 mx-auto'>
            {(page === 1) ? <div/> : <div className='cursor-pointer' onClick={(e) => setSearchParams({page : page - 1})}>{"<"}</div> }
              <span>Page: {page}</span>
            {(page === palettes.length) ?  <div/> : <div className='cursor-pointer' onClick={(e) => setSearchParams({page : page + 1})}>{">"}</div> }
          </div>

      )
}

export default Paginate