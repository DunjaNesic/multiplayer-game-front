import React from 'react'
import './gameplay.css';
import barbie from './barbie.png'
import kilijan from './kilijan.png'

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
       } else if (props.content === 'empty'){
         cellClass ='empty-cell';
       }

       let contentElement = null; 
       if (props.content === "barbie") {
         contentElement = <img src={barbie} alt="Barbie" />;
       } else if (props.content === "bomb") {
         contentElement = <img src={kilijan} alt="Bomb" />;
       } else {
         contentElement = ""; 
       }
     
    
      return (
        <div
          className={`gameplay--field ${props.gameMode==='playing' && props.whoseBoard === 'opponentsBoard' && cellClass} ${
            (props.whoseBoard === 'opponentsBoard' && !props.turn) || ((cellClass==='bomb-cell' || cellClass==='barbie-cell' || cellClass==='empty-cell')) ? 'disabled' : ''
          }`}
          onClick={handleClick}
        >
          {contentElement} 
        </div>
      );
}

export default OpponentsField