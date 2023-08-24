import React, { useState, useEffect } from "react";
import "./gameplay.css";
import { useRoomCode } from "../RoomCodeContext";
import MyField from "./MyField";

function MyBoard(props) {
    const { roomCode } = useRoomCode();
    const [currentlyPlacing, setCurrentlyPlacing] = useState("barbie");
    
      const handlePlacement = (row, column, choice) => {
        if (
          props.whoseBoard==="myBoard" &&
          props.socket &&
          props.gameMode === "placement" &&
          props.myBoard &&
          props.myBoard[row] &&
          props.myBoard[row][column] === null
        ) {
          const barbiesCount = props.myBoard
            .flat()
            .filter((cell) => cell === "barbie").length;
          const bombsCount = props.myBoard.flat().filter((cell) => cell === "bomb").length;
    
          if (choice === "barbie" && barbiesCount < 6) {
            const updatedBoard = [...props.myBoard];
            updatedBoard[row][column] = choice;
            props.setMyBoard(updatedBoard);
            props.setMyData({
              code: roomCode,
              dashboard: props.myBoard,
              player: props.socket.id,
            });
          } else if (bombsCount < 6) {
            setCurrentlyPlacing("bomb");
            const updatedBoard = [...props.myBoard];
            updatedBoard[row][column] = choice;
            props.setMyBoard(updatedBoard);
            props.setMyData({
              code: roomCode,
              dashboard: props.myBoard,
              player: props.socket.id,
            });       
          }
        }
      };

  return (
    <div className={`board ${props.gameMode==="playing" ? "disabled" : ""} ` }>
      {props.myBoard.map((row, fieldRow) => (
        <div key={fieldRow} className="gameplay--row">
          {row.map((cell, fieldColumn) => (
            <MyField
            key={fieldColumn}
            fieldColumn={fieldColumn}
            fieldRow={fieldRow}
            gameMode={props.gameMode}
            content={cell} 
            onClick={()=> handlePlacement(fieldRow, fieldColumn, currentlyPlacing)}
            whoseBoard={props.whoseBoard}  
          />
          ))}
        </div>
      ))}
    </div>
  )
}
export default MyBoard