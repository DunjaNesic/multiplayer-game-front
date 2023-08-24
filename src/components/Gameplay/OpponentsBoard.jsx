import React, { useState, useEffect } from "react";
import "./gameplay.css";
import { useRoomCode } from "../RoomCodeContext";
import OpponentsField from "./OpponentsField";

function OpponentsBoard(props) {
    const { roomCode } = useRoomCode();
    const defaultBoard = [
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
      ];
      const [positionData, setPositionData] = useState({
        code: roomCode,
        player:"",
        position:"",
      });
      const [firstTurn, setFirstTurn]=useState(false);
      const [readyToPlay, setReadyToPlay]=useState(false);

      const handleGuess = (row, column) => {}

      const handleOpponentsBoard = () =>{
        //   console.log(props.socket);
        //   console.log(props.opponentsData);
        console.log(props.opponentsData.code);
        props.socket.emit("soonStart", props.opponentsData.code);

        props.socket.on("finallyGame", (response) => {
          console.log("response je: " + response.turn + "data player je:" + props.opponentsData.player);
          if (response.turn===props.opponentsData.player) {
            setFirstTurn(true)
          }
             else {
            setFirstTurn(false);
          }
          setReadyToPlay(true);         
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
            turn={props.firstTurn}  
          />
          ))}
        </div>
      ))}
      <button className="gameplayBtn" onClick={handleOpponentsBoard}>Ready To Beat The Opponent</button>
    </div>
  )
}

export default OpponentsBoard