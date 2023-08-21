import React, { useState } from "react";
import Field from "./Field";
import "./gameplay.css";

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
  const [board, setBoard] = useState(defaultBoard);
  const [currentlyPlacing, setCurrentlyPlacing] = useState("barbie");
  const [score, setScore] = useState(0);
  const [data, setData] = useState({
    code: props.roomCode,
    dashboard: { board },
    player: "",
  });

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
          ...data,
          dashboard: board,
          player: props.socket.id,
        });
        props.socket.emit("updateDashboard", data);
      } else if (bombsCount < 6) {
        setCurrentlyPlacing("bomb");
        const updatedBoard = [...board];
        updatedBoard[row][column] = choice;
        setBoard(updatedBoard);
        setData({
          ...data,
          dashboard: board,
          player: props.socket.id,
        });
        props.socket.emit("updateDashboard", data);
      }
    }
  };

  const handleGuess = (row, column) => {
    if (props.gameMode === "playing" && board[row][column] === null) {
      const selectedCell = board[row][column];
      if (selectedCell === "barbie") {
        setScore((prevScore) => prevScore + 10);
        const updatedBoard = [...board];
        updatedBoard[row][column] = "correct";
        setBoard(updatedBoard);
        props.socket.emit("updateDashboard", {
          board: updatedBoard,
          score: score,
        });
      } else if (selectedCell === "bomb") {
        setScore((prevScore) => prevScore - 5);
        const updatedBoard = [...board];
        updatedBoard[row][column] = "wrong";
        setBoard(updatedBoard);
        props.socket.emit("updateDashboard", {
          board: updatedBoard,
          score: score,
        });
      }
    }
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
              // EMIT NE MOZE DA BUDE KAD SE POSTAVLJA POLJE. EMIT ZA UPDATEDASHBOARD IDE KAD SE KLIKNE DUGME DA JE SPREMAN ZA IGRU.
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
