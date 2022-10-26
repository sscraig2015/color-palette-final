import React from 'react'
import { useParams, Link, useSearchParams } from 'react-router-dom'

const Paginate = ({palettes}) => {
    
    const [searchParams, setSearchParams] = useSearchParams()
    const page = searchParams.get('page')

    return (
        <div >
          <div className='flex border'>
            {(page === `1`) ? null : <div onClick={(e) => setSearchParams({page : parseInt(page) - 1})}>{"<"}</div> }
              <span>Page: {page}</span>
            {(parseInt(page) === palettes.length) ?  null : <div onClick={(e) => setSearchParams({page : parseInt(page) + 1})}>{">"}</div> }
          </div>
        </div>
      )
}

export default Paginate