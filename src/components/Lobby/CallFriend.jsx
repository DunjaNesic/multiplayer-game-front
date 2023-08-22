import React, { useState, useEffect } from "react";
import "./user.css";
import { useRoomCode } from "../RoomCodeContext";

function CallFriend(props) {
  const [inputRoomCode, setInputRoomCode] = useState("");
  const [codeForCopy, setCodeForCopy] = useState("");
  const { roomCode, setRoomCode } = useRoomCode();
  const [matchStarted, setMatchStarted] = useState(false);
  const [playButtonDisabled, setPlayButtonDisabled] = useState(false);
  const [matchObj, setMatchObj] = useState({
    room: "",
    player1: "",
    player2: "",
  });

  const clickedButton = () => {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let counter = 0;
    while (counter < characters.length) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
      counter += 1;
    }
    setCodeForCopy(result);
  };

  //Radi okej i bez ovog tkda ga trenutno ostavljam zakomentasiranog
  //  useEffect(() => {
  //    if (props.socket.current){
  //    props.socket.current.on("gameStart", (response) => {
  //       setMatchObj(
  //        {
  //          room: response.room,
  //          player1: response.player1,
  //          player2: response.player2
  //        }
  //       )
  //       if (response.player1 !== response.player2) {setMatchStarted(true)
  //        }
  //    });
  //  }
  //  }, [props.socket]);

  const handleSocketConnection = () => {
    setPlayButtonDisabled(true);
    const code = inputRoomCode;
    if (code==="") {alert("Pls input the code first");
    setPlayButtonDisabled(false);
    return;
  }
    props.socket.current.off("gameStart");
    props.socket.current.emit("sendRoomCode", code);

    props.socket.current.on("gameStart", (response) => {
      setMatchObj({
        ...matchObj,
        room: response.room,
        player1: response.player1,
        player2: response.player2,
      });
      //vise se ne ispisuje dunja dvapuuuuuuuut vuuuuu
      setRoomCode(response.room);
      if (response.room !== "" && response.player1.id !== response.player2.id) {
        setMatchStarted(true);  
      }
    });

    props.socket.current.on("gameFull", (response) => {
      alert("Room is full"); 
      setPlayButtonDisabled(false);
    })

     console.log("Room code is " + roomCode);
  };

  if (matchStarted === true) {
     window.location.href = "./Gameplay";
  }

  useEffect(() => {
    setRoomCode("kod2")
  console.log(roomCode);
  },[roomCode]);
  
  

  return (
    <div className="invitation">
      <div className="call">
        <div className="invite--oponent">
          Invite Your Opponent Through Room Code
        </div>
        <p>
          <i className="arrow right"></i>
        </p>
        <button className="roomBtn" onClick={clickedButton}>
          Get Room Code
        </button>
      </div>
      <p className="code">
        Input this code to start the game: {codeForCopy}
      </p>
      <input
        type="text"
        value={inputRoomCode}
        onChange={(e) => setInputRoomCode(e.target.value)}
      />
      <div className="start">
        <button className="btnStart" onClick={handleSocketConnection} disabled={playButtonDisabled}>
          PLAY
        </button>
      </div>
    </div>
  );
}

export default CallFriend;
