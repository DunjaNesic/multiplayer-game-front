import React, { useState, useEffect } from 'react';
import './user.css';
import io from 'socket.io-client';

function CallFriend() {
  const [roomCode, setRoomCode] = useState('');
  const [socket, setSocket] = useState(null);

  const clickedButton = () => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let counter = 0;
    while (counter < characters.length) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
      counter += 1;
    }
    setRoomCode(result);
  };

  const handleSocketConnection = () => {
    if (!socket) {
      console.log('soket');
      const newSocket = io('http://localhost:3000');
      setSocket(newSocket);
      console.log("nultisoket");

      newSocket.on('connect', () => {
        console.log('Socket connected');
        if (roomCode.trim() !== '') {
          console.log('soket2');
          newSocket.emit('sendRoomCode', roomCode);
        } else {
          console.log('Room code is empty. Please generate a code first.');
        }
      });
    } else {
      if (roomCode.trim() !== '') {
        console.log('soket3');
        socket.emit('sendRoomCode', roomCode);
      } else {
        console.log('Room code is empty. Please generate a code first.');
      }
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on('gameStart', (response) => {
        console.log('Room code sent to server:', response);
        console.log('dunja'); 
      });
    }
  }, [socket]);

  return (
    <div className="invitation">
      <div className="call">
        <div className='invite--oponent'>Invite Your Opponent Through Room Code</div>
        <p><i className="arrow right"></i></p>
        <button className='roomBtn' onClick={clickedButton}>Get Room Code</button>
      </div>
      <p className='code'>Input this code to start the game: {roomCode}</p>
      <input type="text" onChange={handleSocketConnection} />
    </div>
  );
}

export default CallFriend;