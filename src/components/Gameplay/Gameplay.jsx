import React, { useState } from 'react'
import Board from './Board'
import './gameplay.css'
import { useRoomCode } from "../RoomCodeContext";

const Gameplay = props => {

  const { roomCode } = useRoomCode();
  const [gameMode, setGameMode] = useState("placement");
  console.log("Received room code in Gameplay:", roomCode);

  return (
    <div className='game'>
      <p className='barbieheimer'>Game instruction: Welcome to BarbieHeimer. There are 36 fields. If you want to survive, place your barbies and your bombs very carefully. Since you have found yourself in this unlucky situation, you will also have an unlucky number of placing your stuff - 13. You will first input 7 barbies and then 6 bombs. Good luck - you need it </p>
        <div className="boards">
        <Board whoseBoard='myBoard'
            socket={props.socket} 
            roomCode={ props.roomCode }
            setRoomCode={ props.setRoomCode }
            player1id={props.player1id}
            setPlayer1id={props.setPlayer1id}
            player2id={props.player2id}
            setPlayer2id={props.setPlayer2id}
            gameMode={gameMode}
            setGameMode={setGameMode}/>
        <Board whoseBoard='opponentsBoard' gameMode={gameMode} disabled={gameMode === 'placement'}/>
        </div>
    </div>
  )
}

export default Gameplay