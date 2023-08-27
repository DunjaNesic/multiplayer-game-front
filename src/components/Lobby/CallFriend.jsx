import React, { useState, useEffect } from "react";
import "./user.css";
import { useRoomCode } from "../RoomCodeContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CallFriend(props) {
  const [inputRoomCode, setInputRoomCode] = useState("");
  const [codeForCopy, setCodeForCopy] = useState("");
  const { setRoomCode } = useRoomCode();
  const [playButtonDisabled, setPlayButtonDisabled] = useState(false);
  const [waitingButton, setWaitingButton] = useState(true);
  const [matchObj, setMatchObj] = useState({
    room: "",
    player1: "",
    player2: "",
  });

  const navigate = useNavigate();

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

  const handleSocketConnection = () => {
    const email = props.loggedUserInfo.email;
    setPlayButtonDisabled(true);
    const code = inputRoomCode;
    const data = {email: email, code: code}
    if (code==="") {
      toast("Room code first", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        })
    setWaitingButton(true);
    setPlayButtonDisabled(false);
    return;
  }
  else {
    setWaitingButton(false);
  }
    props.socket.current.emit("sendRoomCode", data);
    console.log(data);

    props.socket.current.on("gameStart", (response) => {
      console.log("gamestart");
      setMatchObj({
        ...matchObj,
        room: response.code,
        player1: response.player1,
        player2: response.player2,
      });
      setRoomCode(response.code);
      if (response.room !== "" && response.player1.id !== response.player2.id) {
        props.setMatchStarted(true); 
        navigate("/Gameplay");
      }
    });
  };

  useEffect(() => {
    if (props.socket.current && typeof props.socket.current.on === "function"){
  
    props.socket.current.on("gameFull", (response) => {
      setWaitingButton(true);
      toast("Room is full", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        }) 
      setPlayButtonDisabled(false);
    });

    props.socket.current.on("alreadyPlaying", (response)=>{
      setWaitingButton(true);
      setPlayButtonDisabled(false);
     alert("You can't play from the same acc")
      
    })
  }
  }, [props.socket.current]);

  return (
    <div className="invitation">
       <div><ToastContainer position="top-right"
autoClose={3000}
limit={1}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/></div>
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
      <input className="callinput"
        type="text"
        value={inputRoomCode}
        onChange={(e) => setInputRoomCode(e.target.value)}
      />
      <div className="start">
        <button className="btnStart" onClick={handleSocketConnection} disabled={playButtonDisabled}>
          {waitingButton ? "PLAY" : "WAITING"}
        </button>
      </div>
    </div>
  );
}

export default CallFriend;
