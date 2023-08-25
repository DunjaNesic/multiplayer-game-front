import React, { useState, useEffect } from "react";
import "./gameplay.css";
import { useRoomCode } from "../RoomCodeContext";
import OpponentsField from "./OpponentsField";

function OpponentsBoard(props) {
    const { roomCode } = useRoomCode();
      const [positionData, setPositionData] = useState({
        code: roomCode,
        player:props.socket.id,
        position:{},
      });

      const [playersGuess, setPlayersGuess] = useState({
        player: "",
        position: "",
        field: null,
        turn: "", 
        myPoints: 0,
        opponentsPoints: 0
      })

     useEffect(()=>{console.log(props.firstTurn);},[props.firstTurn]);

    const handleGuess = (row, col) => {
        const guessedCellPosition = {row, col}
        setPositionData((prevData) => {
          const updatedData = {
            ...prevData,
            position: guessedCellPosition,
          };
          props.socket.emit("guessPosition", updatedData);
          console.log(updatedData);
          return updatedData;
        });      

        //ja bih ovo u Gameplay u neki useEffect 
        //setTurn ne radiii
         props.socket.on("playerGuess", (response)=>{
          console.log("aaaaaaaaaaa");
            setPlayersGuess({
               position: response.position,
               field: response.field,
               turn: response.turn, 
               myPoints: response.myPoints,
               opponentsPoints: response.opponentsPoints
            }
            );
          })
          if (playersGuess.turn === props.socket.id){
            props.setTurn(true);
            if (playersGuess.field === "barbie"){
              const updatedOpponentsBoard = [...props.opponentsBoard];
              updatedOpponentsBoard[playersGuess.position.row][playersGuess.position.col] = "barbie";
              props.setOpponentsBoard(updatedOpponentsBoard);  
            } else if (playersGuess.field==="bomb"){
              const updatedOpponentsBoard = [...props.opponentsBoard];
              updatedOpponentsBoard[playersGuess.position.row][playersGuess.position.col] = "bomb";
              props.setOpponentsBoard(updatedOpponentsBoard);  
            } else if (playersGuess.field==="null"){
              const updatedOpponentsBoard = [...props.opponentsBoard];
              updatedOpponentsBoard[playersGuess.position.row][playersGuess.position.col] = "error";
              props.setOpponentsBoard(updatedOpponentsBoard);  
            }
  
            props.setMyPoints(playersGuess.myPoints);
            props.setOpponentsPoints(playersGuess.opponentsPoints);
          }
          else {
            props.setTurn(false);
            //umesto opponent boarda treba da se menja my board
            if (playersGuess.field === "barbie"){
              const updatedOpponentsBoard = [...props.opponentsBoard];
              updatedOpponentsBoard[playersGuess.position.row][playersGuess.position.col] = "barbie";
              props.setOpponentsBoard(updatedOpponentsBoard);  
            } else if (playersGuess.field==="bomb"){
              const updatedOpponentsBoard = [...props.opponentsBoard];
              updatedOpponentsBoard[playersGuess.position.row][playersGuess.position.col] = "bomb";
              props.setOpponentsBoard(updatedOpponentsBoard);  
            } else if (playersGuess.field==="null"){
              const updatedOpponentsBoard = [...props.opponentsBoard];
              updatedOpponentsBoard[playersGuess.position.row][playersGuess.position.col] = "error";
              props.setOpponentsBoard(updatedOpponentsBoard);  
            }
            props.setMyPoints(playersGuess.myPoints);
            props.setOpponentsPoints(playersGuess.opponentsPoints);
          }
          

           props.socket.on("invalidGuess", (response) => {
             alert("Invalid guess")
           });
  
         props.socket.on("positionAlreadyPlayed", (response)=>{
            alert("You already played that position");
          });
        }


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
  )
}

export default OpponentsBoard