import React from 'react'

const Card = (props) => {
  return (
    <div className="movie-card" onClick={props?.onClick}>
    <img src={ props.imgUrl } 
      alt={ props.alt || 'Image' } />
  </div>
  )
}

export default Card