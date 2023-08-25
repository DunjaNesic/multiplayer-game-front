import React, { useState, useEffect } from 'react'
import MyBoard from './MyBoard';
import OpponentsBoard from './OpponentsBoard';
import './gameplay.css'
import { useRoomCode } from "../RoomCodeContext";
import Confetti from 'react-confetti';
import { useNavigate } from "react-router-dom";
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
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { roomCode } = useRoomCode();
  const [gameMode, setGameMode] = useState("placement");
  const [turn, setTurn]=useState(false);
  const [myPoints, setMyPoints] = useState(0);
  const [opponentsPoints, setOpponentsPoints]=useState(0);
  const [confetti, setConfetti]=useState(false);
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

  const [waitingBtn, setWaitingBtn] = useState(false);
  const [hasLost, setHasLost] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    setMyData((prevData) => ({
      ...prevData,
      code: props.roomCode,
    }));
  }, [roomCode]);

  const navigate = useNavigate();

  const handleGoBackToLobby = () => {
    navigate("/");
  };
  

  const handlePlayButton = () =>{
   const barbiesCount = myBoard.flat().filter((cell) => cell === 'barbie').length;
   const bombsCount = myBoard.flat().filter((cell) => cell === 'bomb').length;
 
   if (barbiesCount === 7 && bombsCount === 6) {
    setWaitingBtn(true)
   props.socket.emit("updateDashboard", myData);
   props.socket.on("readyGame", (response) => {
    setIsButtonDisabled(true);
    setGameMode("playing");
    if (response.turn===opponentsData.player) {
      setTurn(true)
    }
       else {
      setTurn(false);
    }    
  });
 } else {
   alert("You have to place 7 barbies and 6 bombs");
 }
}

useEffect(() => {
  props.socket.on("gameOver", (response) => {
    console.log(response);
    const winner = response.winner;
    if (props.socket.id === winner) {
      setConfetti(true);

      setTimeout(() => {
        setConfetti(false);
        setGameEnded(true);
        setWon(true);
      }, 10000);
      
    } else {
      setHasLost(true);
      setGameEnded(true)
    }
  });
}, [turn]);

  return (
    <div className={`game ${hasLost ? 'lost' : ''}`}>
      {confetti && <Confetti/>}
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
        setMyPoints={setMyPoints}
        setOpponentsPoints={setOpponentsPoints}
        turn={turn}
        setTurn={setTurn}
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
        turn={turn}
        setTurn={setTurn}
        setMyPoints={setMyPoints}
        setOpponentsPoints={setOpponentsPoints}
        />
        </div>
        <div className='btnAndPoints'>
      <button className={`gameplayBtn ${isButtonDisabled ? "disabled" : ""}`} onClick={handlePlayButton}>
        {gameMode === "playing" ? "In The Game" : waitingBtn ? "Waiting for opponent" : "Start the game"}
      </button>
      <div className='points'>
        <p>Your Points: {myPoints}</p>
        <p>Opponents points: {opponentsPoints}</p>
      </div>
    </div>
    {gameEnded && (
      <div className="modal">
        <div className='modal-content'>
        {won ? (
          <div>
            <p>Congratulations, you won!</p>
          </div>
        ) : (
          <div>
            <p>You lost, better luck next time.</p>
          </div>
        )}
        <button className='modalBtn' onClick={handleGoBackToLobby}>Go back to Lobby</button>
      </div>
      </div>
    )}
  </div>
);
}

export default Gameplay