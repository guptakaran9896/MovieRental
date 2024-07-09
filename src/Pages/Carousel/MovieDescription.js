import React from 'react'

const MovieDescription = ({movie}) => {
  return (
    <div>
        <div className='popup_movie'>
        <img src={movie?.imgUrl}/>
        </div>

    </div>
  )
}

export default MovieDescription