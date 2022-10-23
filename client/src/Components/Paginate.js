import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const Paginate = () => {
    
    const paginate = useSelector((state) => state.palette.currentPalettes)
    const params = useParams()
    
    return (
        <div className='paginateContainer'>
          <div className='paginateInfo'>
          {(params.page === `1`) ? null : <a href={`./${paginate.currentPage - 1}`}><span>{"<"}</span></a> }
            <span>Page: {params.page}</span>
          {(parseInt(params.page) === paginate.totalPages) ?  null : <a href={`./${paginate.currentPage + 1}`}><span>{">"}</span></a> }
          </div>
        </div>
      )
}

export default Paginate