# Client Side README
# BarbieHeimer Multiplayer Online Game, using React.js for front-end, Node.js for Back-end and Socket.io for real-time communication

### Overview
This client is designed to facilitate a two-player online guessing game.

### Socket.io
Socket.io is used to establish real-time communication between clients and the server.

### Game Logic
The game allows two players to join a match using a room code.
Each player has a dashboard with hidden objects (barbies and bombs) that they need to guess.
Players take turns guessing positions on the dashboard, and points are awarded based on their guesses.
The game continues until a set number of moves are exhausted, and a winner is determined.

### Prerequisites
Install the project dependencies:
npm install

Start the development server:
npm start

Open your web browser and navigate to http://localhost:3000 to access the BarbieHeimer application.
Sign up or log in to your account to start playing.
Create or join a game room by inviting a friend using the room code.

### Socket events
- *updateDashboard* event is emitted to the server when the player clicks the play button, indicating they are ready to start the game
- *readyGame* event is received from the server, signaling that both players are ready to begin the game
- *gameOver* event is received from the server to determine the game's outcome - whether the player won, lost, or it's a tie
- *invalidGuess* event is received if the player makes an invalid move during the game
- *positionAlreadyPlayed* event is received if the player tries to guess a position they have already guessed before
- *playerGuess* event is received when a player makes a valid guess during the game, updating the game state accordingly
- *sendRoomCode* event is emitted when the player inputs a room code to connect to a game
- *gameStart* event is received from the server when a game room is ready to start. If the room is full, a "gameFull" event is received instead
- *gameFull* event is received when a game room is already occupied by two players, preventing additional players from joining

### Features

- **Player Authentication:** Users can register and log in to access the game features.
- **Real-time Multiplayer Gameplay:** Engage in real-time battles with other players.
- **Strategic Grid Placement:** Place your barbies and bombs wisely to outwit your opponent.
- **Winning Conditions:** The game declares a winner based on specific conditions.
- **User-friendly Interface:** Enjoy a visually appealing UI
- **Confetti Effects:** Celebrate your victories with confetti animations.

Enjoy the gameplay!

## Screenshots

## Contributors
- DunjaNesic
- pozitiva