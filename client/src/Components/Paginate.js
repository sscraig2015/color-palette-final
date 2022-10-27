import React from 'react'
import { useParams, Link, useSearchParams } from 'react-router-dom'

const Paginate = ({palettes}) => {
    
    const [searchParams, setSearchParams] = useSearchParams()
    const page = searchParams.get('page')

    return (
        <div >
          <div className='flex justify-center border'>
            {(page === `1`) ? null : <div className='cursor-pointer' onClick={(e) => setSearchParams({page : parseInt(page) - 1})}>{"<"}</div> }
              <span>Page: {page}</span>
            {(parseInt(page) === palettes.length) ?  null : <div className='cursor-pointer' onClick={(e) => setSearchParams({page : parseInt(page) + 1})}>{">"}</div> }
          </div>
        </div>
      )
}

export default Paginate