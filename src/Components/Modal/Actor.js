import React from 'react'
import noImage from '../../Images/noImage.webp'

const Actor = ({name , poster, url}) => {
    let posterUrl;
    if(poster === null) {
        posterUrl = noImage;
    } else {
        posterUrl = `${url}${poster}`;
    }
  return (
    
    <div className='actor'>
        <img src={posterUrl} alt='actorImage' className='actorImage'/>
        <h5 className='actorName'>{name}</h5>
    </div>
  )
}

export default Actor