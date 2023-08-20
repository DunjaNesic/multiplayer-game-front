import React, { useState } from 'react'
import Board from './Board'
import './gameplay.css'
import  io  from 'socket.io-client';

function Gameplay(props) {

  const [gameMode, setGameMode] = useState("placement");

  return (
    <div className='game'>
      <p className='barbieheimer'>Game instruction: Welcome to BarbieHeimer. There are 36 fields. If you want to survive, place your barbies and your bombs very carefully. Since you have found yourself in this unlucky situation, you will also have an unlucky number of placing your stuff - 13. You will first input 7 barbies and then 6 bombs. Good luck - you need it </p>
        <div className="boards">
        <Board whoseBoard='myBoard' gameMode={gameMode} socket={props.socket}/>
        <Board whoseBoard='opponentsBoard' gameMode={gameMode} disabled={gameMode === 'placement'}/>
        </div>
        {gameMode === 'placement' && (
  <button className='gameplayBtn' onClick={() => setGameMode("playing")}>Start Playing</button>
)}
    </div>
  )
}

export default Gameplay