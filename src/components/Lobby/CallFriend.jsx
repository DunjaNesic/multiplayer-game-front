import React, { useState, useEffect, useRef } from "react";
import "./user.css";
import io from "socket.io-client";

function CallFriend() {
  const [roomCode, setRoomCode] = useState("");
  const socket = useRef();

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
    setRoomCode(result);
  };

  // Konekcija na soket NE SMIJE da bude na nivou jedne komponente nego na nivou cijele stranice ili cijele aplikacije.
  // Kapiram da ces moci da saljes kroz props sam soket i da ga tako koristis u pojedinacnim komponentama. Istrazi to. Svakako, konekcija mora da bude na visem nivou i slusanje dogadjaja mora da bude na visem nivou
  // Mozes metode za obradu dogadjaja isto da saljes kroz props ako hoces, umjesto soketa. to vec smisli sta ti je lakse

  // Ja sam ovde samo sredio konekciju i ostavio je na istom mjestu gdje ti je vec bila. Moraces da je pomjeris sama.

  //BITNOOOOOO: Iz nekog razloga se ova komponenta resetuje sama od sebe cim se pokrene.
  // To vidim po tome sto se dva puta salje ko je ulogovan i dva puta se kaci na soket. I vidim da se periodicno isto ponovo resetuje, opet iz istog razloga

  useEffect(() => {
    console.log("prije konekcije");
    socket.current = io("http://localhost:3000", { transports: ["websocket"] });
    console.log("posle konekcije");

    socket.current.on("gameStart", (response) => {
      console.log("Room code sent to server:", response);
      console.log("dunja");
    });
  }, []);

  const handleSocketConnection = (event) => {
    socket.current.emit("sendRoomCode", event.target.value);
  };

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
      <p className="code">Input this code to start the game: {roomCode}</p>
      <input type="text" onChange={handleSocketConnection} />
      {/* Ovde ne treba on change nego hocete kad se klikne dugme za play fazon*/}
    </div>
  );
}

export default CallFriend;
