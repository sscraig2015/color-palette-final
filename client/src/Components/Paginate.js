import React from 'react'
import { useSelector } from 'react-redux'

const Paginate = () => {
    
    
    
    
    return (
        <div className='paginateContainer'>
          <div className='paginateInfo'>
          {(params.page === `1`) ? null : <a href={`./${currentPage - 1}`}><span>{"<"}</span></a> }
            <span>Page: {params.page}</span>
          {(parseInt(params.page) === totalPages) ?  null : <a href={`./${currentPage + 1}`}><span>{">"}</span></a> }
          </div>
        </div>
      )
}

export default Paginate