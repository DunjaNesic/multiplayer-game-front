import React from 'react'
import './gameplay.css';

function MyField(props) {
    const handleClick = (e) => {
      e.preventDefault();
       if (props.gameMode === 'placement' && props.content === null && props.whoseBoard==="myBoard") {
         props.onClick();
       }
    };
  
    return (
      <div
        className={`gameplay--field ${props.content==="guessed" ? "guessed" : ""} `}
        onClick={handleClick}
      >
        {props.content} 
      </div>
    );
  }

export default MyField