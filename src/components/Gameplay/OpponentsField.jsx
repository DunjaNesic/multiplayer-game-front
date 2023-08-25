import React from 'react'
import './gameplay.css';

function OpponentsField(props) {
    const handleClick = (e) => {
        e.preventDefault();
         if (props.gameMode === 'playing' && props.whoseBoard==="opponentsBoard") {
           props.onClick();
         } 
      };   
      
      let cellClass = 'gameplay--field';
       if (props.content === 'bomb') {
         cellClass = 'bomb-cell'; 
       } else if (props.content === 'barbie') {
         cellClass = 'barbie-cell'; 
       } else if (props.content === 'error'){
         cellClass ='empty-cell';
       }
    
      return (
        <div
          className={`gameplay--field ${props.gameMode==='playing' && props.whoseBoard === 'opponentsBoard' && cellClass} ${
            props.whoseBoard === 'opponentsBoard' && !props.turn ? 'disabled' : ''
          }`}
          onClick={handleClick}
        >
          {props.content} 
        </div>
      );
}

export default OpponentsField