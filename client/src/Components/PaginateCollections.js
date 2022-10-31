import React from 'react'

const PaginateCollections = ( { collections, setCollectionPage, page } ) => {



    return (

          <div className='flex justify-center border rounded-full gap-6'>
            {(page === 0) ? <div /> : <div className='cursor-pointer' onClick={(e) => setCollectionPage(page - 1) }>{"<"}</div> }
              <span>page: {page + 1}</span>
            {(page + 1 === collections.length) ?  <div />  : <div className='cursor-pointer' onClick={(e) => setCollectionPage(page + 1) }>{">"}</div> }
          </div>

      )
}

export default PaginateCollections