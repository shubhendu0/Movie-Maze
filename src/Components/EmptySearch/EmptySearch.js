import React from 'react'
import emptySearch from '../../Images/emptySearch.png'

const EmptySearch = () => {
  return (
    <div className='centreDiv'>
        <img src={emptySearch} alt={'Empty Search Logo'} />
        <h4>Please order,<br />I mean type something in the search box above.</h4>
    </div>
  )
}

export default EmptySearch