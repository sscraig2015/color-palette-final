import React from 'react'

const PaginateCollections = ( { collections, setCollectionPage, page } ) => {



    return (

          <div className='flex justify-center'>
            {(page === 0) ? null : <div className='cursor-pointer' onClick={(e) => setCollectionPage(page - 1) }>{"<"}</div> }
              <span>page: {page + 1}</span>
            {(page + 1 === collections.length) ?  null : <div className='cursor-pointer' onClick={(e) => setCollectionPage(page + 1) }>{">"}</div> }
          </div>

      )
}

export default PaginateCollections