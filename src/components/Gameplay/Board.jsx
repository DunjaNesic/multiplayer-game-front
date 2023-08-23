import React, { useState, useEffect } from "react";
import Field from "./Field";
import "./gameplay.css";
import { useRoomCode } from "../RoomCodeContext";

//ja se stvarno izvinjavam za ovaj kod
const Board = (props) => {

  const { roomCode } = useRoomCode();
  const [currentlyPlacing, setCurrentlyPlacing] = useState("barbie");

  const handlePlacement = (row, column, choice) => {
    if (
      props.whoseBoard==="myBoard" &&
      props.socket &&
      props.gameMode === "placement" &&
      props.board &&
      props.board[row] &&
      props.board[row][column] === null
    ) {
      const barbiesCount = props.board
        .flat()
        .filter((cell) => cell === "barbie").length;
      const bombsCount = props.board.flat().filter((cell) => cell === "bomb").length;

      if (choice === "barbie" && barbiesCount < 6) {
        const updatedBoard = [...props.board];
        updatedBoard[row][column] = choice;
        props.setBoard(updatedBoard);
        props.setData({
          code: roomCode,
          dashboard: props.board,
          player: props.socket.id,
        });
      } else if (bombsCount < 6) {
        setCurrentlyPlacing("bomb");
        const updatedBoard = [...props.board];
        updatedBoard[row][column] = choice;
        props.setBoard(updatedBoard);
        props.setData({
          code: roomCode,
          dashboard: props.board,
          player: props.socket.id,
        });
        
      }
    }
  };

  useEffect(() => {
    console.log("first turn isss " + props.firstTurn);
  }, [props.firstTurn]);
 
  const handleGuess = (row, column) => {
    const guessedCellPosition = props.board[row][column];
    
    props.setPositionData(()=>{
      return {
        code: roomCode,
        player: props.socket.id,
        position: guessedCellPosition
      }
    }
    );
    console.log(props.positionData + "blaa");
     props.socket.emit("guessPosition", props.positionData);

    //  props.socket.on("invalidGuess", (response) => {
    //    // nzm dal treba da uradim jos nes s ovim msm kontam da do ovog nikad nece doci
    //    // IPAK DOLAZI DO OVOG NZM STO
    //    alert("Invalid guess")
    //  });

     props.socket.on("positionAlreadyPlayed", (response)=>{
      //ovo ne dobijam nikad 
       alert("You already played that position");
     });

     props.socket.on("gameOver", (response)=>{
       const winner = response.winner;
       if (props.data.player===winner){
         console.log("You won");
       } else {
         console.log("You lost, better luck next time");
       }
     });

    // props.socket.on("playerGuess", (response)=>{
    //   //...sila nekih info
    // })

  };

  return (
    <div className={`board ${
      (props.gameMode === "placement" &&
      props.whoseBoard === "opponentsBoard") ||
      (props.gameMode === "playing" &&
      props.whoseBoard === "myBoard" && props.readyToPlay)
        ? "disabled"
        : ""
    }`}>
      {props.board.map((row, fieldRow) => (
        <div key={fieldRow} className="gameplay--row">
          {row.map((cell, fieldColumn) => (
            <Field
            key={fieldColumn}
            fieldColumn={fieldColumn}
            fieldRow={fieldRow}
            gameMode={props.gameMode}
            content={props.whoseBoard==='myBoard' ? cell : ''} //nes ovde kvari drugi board rekla bih
            onClick={
              props.gameMode === "placement"
                ? () =>
                    handlePlacement(fieldRow, fieldColumn, currentlyPlacing)
                : () => handleGuess(fieldRow, fieldColumn)
            }
            whoseBoard={props.whoseBoard} 
            turn={props.firstTurn}
            //mislim da ipak necu ovo ovako al neka ga tu 
            // disabled={
            //   props.gameMode === "playing" && firstTurn && props.whoseBoard === 'opponentsBoard'
            // }
          />
          ))}
        </div>
      ))}
      
    </div>
  );
  
};

export default Board;
