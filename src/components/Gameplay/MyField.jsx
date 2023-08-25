import React from 'react'
import './gameplay.css';
// import bombette from './bombette.png'
import barbie from './barbie.png'
import kilijan from './kilijan.png'

function MyField(props) {
    const handleClick = (e) => {
      e.preventDefault();
       if (props.gameMode === 'placement' && props.content === null && props.whoseBoard==="myBoard") {
         props.onClick();
       }
    };

    let contentElement = null; 
  if (props.content === "barbie") {
    contentElement = <img src={barbie} alt="Barbie" />;
  } else if (props.content === "bomb") {
    contentElement = <img src={kilijan} alt="Bomb" />;
  } else {
    contentElement = props.content; 
  }
  
    return (
      <div
        className={`gameplay--field ${props.content==="X" ? "guessed" : ""} `}
        onClick={handleClick}
      >
        {contentElement} 
      </div>
    );
  }

export default MyField