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

      const [turn, setTurn] = useState(props.firstTurn);
    //   useEffect(()=>{console.log(props.firstTurn);},[props.firstTurn]);

    const handleGuess = (row, column) => {
        const guessedCellPosition = {row, column}
        setPositionData(()=>{
          return {
            code: roomCode,
            player: props.socket.id,
            position: guessedCellPosition
          }
        }
        );
         props.socket.emit("guessPosition", positionData);

         props.socket.on("playerGuess", (response)=>{
            setPlayersGuess({
              //nez ni sta ce mi ovaj player...
               player: response.player,
               position: response.position,
               field: response.field,
               turn: response.turn, 
               myPoints: response.myPoints,
               opponentsPoints: response.opponentsPoints
            }
            );
          })
          if (playersGuess.turn === props.socket.id){
            //ne znam sta treba da radim sa firstTurn-om od trenutka kad krenem da dobijam turn
            setTurn(true);
          }
          else {
            setTurn(false);
          }
          if (playersGuess.field === "barbie"){
            const updatedOpponentsBoard = [...props.opponentsBoard];
            updatedOpponentsBoard[playersGuess.position.row][playersGuess.position.column] = "barbie";
            props.setOpponentsBoard(updatedOpponentsBoard);  
          } else if (playersGuess.field==="bomb"){
            const updatedOpponentsBoard = [...props.opponentsBoard];
            updatedOpponentsBoard[playersGuess.position.row][playersGuess.position.column] = "bomb";
            props.setOpponentsBoard(updatedOpponentsBoard);  
          } else if (playersGuess.field==="null"){
            const updatedOpponentsBoard = [...props.opponentsBoard];
            updatedOpponentsBoard[playersGuess.position.row][playersGuess.position.column] = "error";
            props.setOpponentsBoard(updatedOpponentsBoard);  
          }

          props.setMyPoints(playersGuess.myPoints);
          props.setOpponentsPoints(playersGuess.opponentsPoints);

        //   props.socket.on("invalidGuess", (response) => {
        //     // nzm dal treba da uradim jos nes s ovim msm kontam da do ovog nikad nece doci
        //     // IPAK DOLAZI DO OVOG NZM STO
        //     alert("Invalid guess")
        //   });
  
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
            firstTurn={props.firstTurn}  
            turn={turn}
          />
          ))}
        </div>
      ))}
    </div>
  )
}

export default OpponentsBoard