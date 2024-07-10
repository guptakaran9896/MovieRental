import React from 'react'

const MovieDescription = ({movie}) => {
  return (
    
        <div className='popup_movie'>
        <div>
        <img src={movie?.imgUrl} alt={movie?.imgUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div>
          <h2 style={{color:'white'}}>{movie?.content}</h2 >
          
        </div>
        <div>
        <button style={{
            border: '1px solid red',
            margin: '10px',
            padding: '8px 24px',
            fontSize: '13px',
            backgroundColor: 'red',
            color: 'white',
            textDecoration: 'none'
         }} >Rent</button>
         
        </div>
      </div>
        </div>

  )
}

export default MovieDescription