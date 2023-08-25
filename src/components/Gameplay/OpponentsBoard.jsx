import React, { useState, useEffect } from "react";
import "./gameplay.css";
import { useRoomCode } from "../RoomCodeContext";
import OpponentsField from "./OpponentsField";

function OpponentsBoard(props) {
  const { roomCode } = useRoomCode();
  const [positionData, setPositionData] = useState({
    code: roomCode,
    player: props.socket.id,
    position: {},
  });

  const handleGuess = (row, col) => {
    const guessedCellPosition = { row, col };
    setPositionData((prevData) => {
      const updatedData = {
        ...prevData,
        position: guessedCellPosition,
      };
      props.socket.emit("guessPosition", updatedData);
      return updatedData;
    });
  };

  useEffect(() => {
    props.socket.on("playerGuess", (response) => {
      if (response.player === props.socket.id) {
        props.setTurn(true);
        if (response.field === "barbie") {
          const updatedOpponentsBoard = [...props.opponentsBoard];
          updatedOpponentsBoard[response.position.row][response.position.col] = "barbie";
          props.setOpponentsBoard(updatedOpponentsBoard);
        } else if (response.field === "bomb") {
          const updatedOpponentsBoard = [...props.opponentsBoard];
          updatedOpponentsBoard[response.position.row][response.position.col] = "bomb";
          props.setOpponentsBoard(updatedOpponentsBoard);
        } else if (response.field === null) {
          const updatedOpponentsBoard = [...props.opponentsBoard];
          updatedOpponentsBoard[response.position.row][response.position.col] = "empty";
          props.setOpponentsBoard(updatedOpponentsBoard);
        }
        props.setMyPoints(response.myPoints);
        props.setOpponentsPoints(response.opponentsPoints);
      } 
    });
    
    props.socket.on("invalidGuess", (response) => {
      alert("Invalid guess");
    });
  
    props.socket.on("positionAlreadyPlayed", (response) => {
      alert("You already played that position");
    });
  }, [props.turn]);
  
  return (
    <div className={`board`}>
      {props.opponentsBoard.map((row, fieldRow) => (
        <div key={fieldRow} className="gameplay--row">
          {row.map((cell, fieldColumn) => (
            <OpponentsField
              key={fieldColumn}
              fieldColumn={fieldColumn}
              fieldRow={fieldRow}
              gameMode={props.gameMode}
              content={cell}
              onClick={() => handleGuess(fieldRow, fieldColumn)}
              whoseBoard={props.whoseBoard}
              turn={props.turn}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default OpponentsBoard;
