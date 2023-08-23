import React, { useState, useEffect } from 'react'
import Board from './Board'
import './gameplay.css'
import { useRoomCode } from "../RoomCodeContext";
//znaci boze gospode

const Gameplay = props => {

  const [gameMode, setGameMode] = useState("placement");
  const defaultBoard = [
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
  ];
  const [readyToPlay, setReadyToPlay]=useState(false);
  const { roomCode } = useRoomCode();
  const [board, setBoard] = useState(defaultBoard);
  const [data, setData] = useState({
    code: roomCode,
    dashboard: { board },
    player: "",
  });
  const [positionData, setPositionData] = useState({
    code: roomCode,
    player:"",
    position:"",
  });
  const [firstTurn, setFirstTurn]=useState(false);

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      code: props.roomCode,
    }));
  }, [roomCode]);

  const handleBoard = () =>{
    const barbiesCount = board.flat().filter((cell) => cell === 'barbie').length;
    const bombsCount = board.flat().filter((cell) => cell === 'bomb').length;
  
    if (barbiesCount === 7 && bombsCount === 6) {

      // console.log(data);
    props.socket.emit("updateDashboard", data);

    props.socket.on("readyGame", (response) => {
      console.log("response je: " + response.turn + "data player je:" + data.player);
      if (response.turn===data.player) {
        setFirstTurn(true)
      }
         else {
        setFirstTurn(false);
      }
      setReadyToPlay(true); 
      setGameMode("playing");
      // console.log("first turn is " + firstTurn);
    });
  } else {
    alert("You have to place 7 barbies and 6 bombs");
  }
  }

  return (
    <div className='game'>
      <p className='barbieheimer'>Game instruction: Welcome to BarbieHeimer. There are 36 fields. If you want to survive, place your barbies and your bombs very carefully. Since you have found yourself in this unlucky situation, you will also have an unlucky number of placing your stuff - 13. You will first input 7 barbies and then 6 bombs. Good luck - you need it </p>
        <div className="boards">
        <Board whoseBoard='myBoard'
            socket={props.socket} 
            gameMode={gameMode}
            setGameMode={setGameMode}
            data={data}
            setData={setData}
            positionData={positionData}
            setPositionData={setPositionData}
            board={board}
            setBoard={setBoard}
            readyToPlay={readyToPlay}
            setReadyToPlay={setReadyToPlay}
            firstTurn={firstTurn}
            setFirstTurn={setFirstTurn}
            />
        <Board whoseBoard='opponentsBoard' 
        socket={props.socket} 
        gameMode={gameMode}
        setGameMode={setGameMode}
        data={data}
        setData={setData}
        positionData={positionData}
        setPositionData={setPositionData}
        board={board}
        setBoard={setBoard}
        readyToPlay={readyToPlay}
        setReadyToPlay={setReadyToPlay}
        firstTurn={firstTurn}
        setFirstTurn={setFirstTurn}
        disabled={gameMode === 'placement'}/>
        </div>
        {gameMode === 'placement' && (
        <button className='gameplayBtn' onClick={() => { handleBoard(); }}>Start Playing</button>
      )}
    </div>
  )
}

export default Gameplay