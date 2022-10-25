import React from 'react'
import { useParams, Link } from 'react-router-dom'

const Paginate = ({palettes}) => {
    
    const params = useParams()

    return (
        <div className='paginateContainer'>
          <div className='paginateInfo'>
          {(params.page === `1`) ? null : <Link to={`../${parseInt(params.page) - 1}`} relative='path'><span>{"<"}</span></Link> }
            <span>Page: {params.page}</span>
          {(parseInt(params.page) === palettes.length) ?  null : <Link to={`../${parseInt(params.page) + 1}`} relative='path'><span>{">"}</span></Link> }
          </div>
        </div>
      )
}

export default Paginate