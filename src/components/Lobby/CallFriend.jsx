import React, { useState } from "react";
import "./user.css";

function CallFriend(props) {
  const [inputRoomCode, setInputRoomCode] = useState("");
  const [matchStarted, setMatchStarted] = useState(false);
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
    props.setRoomCode(result);
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
    const code = inputRoomCode;

    props.socket.current.off("gameStart");
    props.socket.current.emit("sendRoomCode", code);

    props.socket.current.on("gameStart", (response) => {
      setMatchObj({
        ...matchObj,
        room: response.room,
        player1: response.player1,
        player2: response.player2,
      });
      //Ovde se dunja ispisuje 2 puta
      console.log("Dunja");
      props.setPlayer1id(response.player1.id);
      props.setPlayer2id(response.player2.id);
      if (response.room !== "" && response.player1.id !== response.player2.id) {
        setMatchStarted(true);
      }
    });
  };

  if (matchStarted === true) {
    window.location.href = "./Gameplay";
  }

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
        Input this code to start the game: {props.roomCode}
      </p>
      <input
        type="text"
        value={inputRoomCode}
        onChange={(e) => setInputRoomCode(e.target.value)}
      />
      <div className="start">
        <button className="btnStart" onClick={handleSocketConnection}>
          PLAY
        </button>
      </div>
    </div>
  );
}

export default CallFriend;
