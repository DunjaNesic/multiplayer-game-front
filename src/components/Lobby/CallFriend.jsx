import React from 'react'
import './user.css'
import io from 'socket.io-client';

function CallFriend() {

  const [roomCode, setRoomCode]=React.useState("");
  const [socket, setSocket] = React.useState(null);

    const clickedButton = () => {  
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; 
      let counter = 0;
      while (counter < characters.length) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
        counter += 1;
      }
      setRoomCode(result);
    }

    if (!socket) {
      const newSocket = io('http://localhost:3000');
      setSocket(newSocket);

      newSocket.on('connect', () => {
        console.log('Socket connected');
        newSocket.emit('sendRoomCode', roomCode); 
      });
    } else {
      socket.emit('sendRoomCode', roomCode);
    }

    React.useEffect(() => {
      if (socket) {
        // Ovde dobijam odgovor od Ive
        socket.on('roomCodeSent', (response) => {
          console.log('Room code sent to server:', response);
          // Ovde definisem sta ce da se desi na mojoj strani kad mi Iva odgovori
          console.log("dunja");
        });
      }
    }, [socket]);

  return (
    <div className="invitation">
      <div className="call">
    <div className='invite--oponent'>Invite Your Oponent Through Room Code</div>
    <p><i className="arrow right"></i></p>
    <button className='roomBtn' onClick={clickedButton}>Get Room Code</button>
    </div>
    <p className='code'>Send This Code To Your Friend</p>
    <input type="text" value={roomCode} />
  </div>
  )
}

export default CallFriend