import React from 'react';
import './gameplay.css';

function Field(props) {
  const handleClick = (e) => {
    e.preventDefault();
     if (props.gameMode === 'placement' && props.content === null && props.whoseBoard==="myBoard") {
       props.onClick();
     } else if (!props.disabled && props.gameMode === 'playing') {
      props.onClick();
      //console.log(props.turn);
    }
  };

  let cellClass = 'gameplay--field';
   if (props.content === 'bomb') {
     cellClass = ' bomb-cell'; 
   } else if (props.content === 'barbie') {
     cellClass = ' barbie-cell'; 
   } else if (props.content === null){
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
export default Field;
