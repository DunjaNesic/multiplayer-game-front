import React, { useState, useEffect } from 'react'
import MyBoard from './MyBoard';
import OpponentsBoard from './OpponentsBoard';
import './gameplay.css'
import { useRoomCode } from "../RoomCodeContext";
//znaci boze gospode

const Gameplay = props => {

  const defaultMyBoard = [
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
  ];
  const defaultOppBoard = [
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
  ];
  const { roomCode } = useRoomCode();
  const [gameMode, setGameMode] = useState("placement");

  const [myBoard, setMyBoard] = useState(defaultMyBoard);
  const [myData, setMyData] = useState({
    code: roomCode,
    dashboard: { myBoard },
    player: props.socket.id,
  });
  const [opponentsBoard, setOpponentsBoard] = useState(defaultOppBoard);
  const [opponentsData, setOpponentsData] = useState({
    code: roomCode,
    dashboard: { opponentsBoard },
    player: props.socket.id,
  });

  useEffect(() => {
    setMyData((prevData) => ({
      ...prevData,
      code: props.roomCode,
    }));
  }, [roomCode]);


  return (
    <div className='game'>
      <p className='barbieheimer'>Game instruction: Welcome to BarbieHeimer. There are 36 fields. If you want to survive, place your barbies and your bombs very carefully. Since you have found yourself in this unlucky situation, you will also have an unlucky number of placing your stuff - 13. You will first input 7 barbies and then 6 bombs. Good luck - you need it </p>
        <div className="boards">
        <MyBoard whoseBoard='myBoard'
        socket={props.socket} 
        gameMode={gameMode}
        setGameMode={setGameMode}
        myData={myData}
        setMyData={setMyData}
        myBoard={myBoard}
        setMyBoard={setMyBoard}
        disabled={gameMode === 'playing'}
        />
        <OpponentsBoard whoseBoard='opponentsBoard' 
        socket={props.socket} 
        gameMode={gameMode}
        setGameMode={setGameMode}
        opponentsData={opponentsData}
        setOpponentsData={setOpponentsData}
        opponentsBoard={opponentsBoard}
        setOpponentsBoard={setOpponentsBoard}
        disabled={gameMode === 'placement'}
        />
        </div>
    </div>
  )
}

export default Gameplay