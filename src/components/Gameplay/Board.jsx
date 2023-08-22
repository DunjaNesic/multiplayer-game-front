import React, { useState, useEffect } from "react";
import Field from "./Field";
import "./gameplay.css";
import { useRoomCode } from "../RoomCodeContext";


//ja se stvarno izvinjavam za ovaj kod
const Board = (props) => {
  const defaultBoard = [
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
  ];
  const { roomCode } = useRoomCode();
  const [board, setBoard] = useState(defaultBoard);
  const [currentlyPlacing, setCurrentlyPlacing] = useState("barbie");
  const [data, setData] = useState({
    code: roomCode,
    dashboard: { board },
    player: "",
  });

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      code: props.roomCode,
    }));
  }, [roomCode]);

  const handlePlacement = (row, column, choice) => {
    if (
      props.socket &&
      props.gameMode === "placement" &&
      board[row][column] === null
    ) {
      const barbiesCount = board
        .flat()
        .filter((cell) => cell === "barbie").length;
      const bombsCount = board.flat().filter((cell) => cell === "bomb").length;

      if (choice === "barbie" && barbiesCount < 6) {
        const updatedBoard = [...board];
        updatedBoard[row][column] = choice;
        setBoard(updatedBoard);
        setData({
          code: roomCode,
          dashboard: board,
          player: props.socket.id,
        });
      } else if (bombsCount < 6) {
        setCurrentlyPlacing("bomb");
        const updatedBoard = [...board];
        updatedBoard[row][column] = choice;
        setBoard(updatedBoard);
        setData({
          code: roomCode,
          dashboard: board,
          player: props.socket.id,
        });
        
      }
    }
  };

  const handleBoard = () =>{
    console.log(props.socket);
    console.log(data);
    props.socket.emit("updateDashboard", data);
  }


  const handleGuess = (row, column) => {
    
  };

  return (
    <div
      className={`board ${
        (props.gameMode === "placement" &&
          props.whoseBoard === "opponentsBoard") ||
        (props.gameMode === "playing" && props.whoseBoard === "myBoard")
          ? "disabled"
          : ""
      }`}
    >
      {board.map((row, fieldRow) => (
        <div key={fieldRow} className="gameplay--row">
          {row.map((cell, fieldColumn) => (
            <Field
              key={fieldColumn}
              fieldColumn={fieldColumn}
              fieldRow={fieldRow}
              gameMode={props.gameMode}
              content={cell}
              onClick={
                props.gameMode === "placement"
                  ? () =>
                      handlePlacement(fieldRow, fieldColumn, currentlyPlacing)
                  : () => handleGuess(fieldRow, fieldColumn)
              }
            />
          ))}
        </div>
      ))}
      {props.gameMode === 'placement' && (
  <button className='gameplayBtn' onClick={() => { handleBoard(); props.setGameMode("playing");}}>Start Playing</button>
)}
    </div>
  );
};

export default Board;
