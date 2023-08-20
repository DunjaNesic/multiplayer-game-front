import React from 'react'
import './gameplay.css'

function Field(props) {
  
  const handleClick = (e) => {
    e.preventDefault();
    if (props.gameMode === 'placement' && props.content === null) {
      props.onClick();
    }
  };
 
  return (
    <div
    className='gameplay--field'
    onClick={handleClick}
  >
    {props.content}
  </div>
  )
}

export default Field