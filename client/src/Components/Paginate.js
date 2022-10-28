import React from 'react'
import { useSearchParams } from 'react-router-dom'

const Paginate = ({palettes}) => {
    
    const [searchParams, setSearchParams] = useSearchParams()
    const page = parseInt(searchParams.get('page'))

    return (

          <div className='flex justify-center'>
            {(page === 1) ? null : <div className='cursor-pointer' onClick={(e) => setSearchParams({page : page - 1})}>{"<"}</div> }
              <span>Page: {page}</span>
            {(page === palettes.length) ?  null : <div className='cursor-pointer' onClick={(e) => setSearchParams({page : page + 1})}>{">"}</div> }
          </div>

      )
}

export default Paginate