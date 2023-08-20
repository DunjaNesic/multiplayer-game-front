import React, {useRef, useEffect } from "react"
import './App.css'
import SignUp from "./components/Forms/SignUp"
import LogIn from './components/Forms/LogIn'
import haikei from './haikei.png'
import haikei2 from './haikei2.png'
import DataLoggedUser from "./components/Lobby/DataLoggedUser"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Logout from "./components/Lobby/Logout"
import Gameplay from "./components/Gameplay/Gameplay"
import  io  from "socket.io-client"
import CallFriend from './components/Lobby/CallFriend';

export default function App() {

  const isLoggedIn = window.localStorage.getItem("loggedIn");
  
  const socket = useRef();

  useEffect(() => { 
    socket.current = io("http://localhost:3000", { transports: ["websocket"] });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);
  
    return (
      <Router>
        <div className="App">
        <Routes>
          <Route exact path="/" element={ isLoggedIn === "true" ? 
        <div>
          <CallFriend
            socket={ socket }
            />
            <DataLoggedUser/>          
            <Logout/>
            <img className="haikei-img2" src={haikei2} alt="d" />
          </div> :
            <div className="form--img">
            <div className="forms">
            <div className="par--wrapper">
            <p className="login--par">LOGIN <br /> PAGE</p>
            <p>Log In To Your Page</p>
            </div>
          <LogIn/>
          <SignUp/>
          <div className="par--wrapper">
          <p className="signup--par">SIGN <br /> UP <br /> PAGE</p>
          <p className="pink--par">Sign Up And Join Us</p>
          </div>
          </div>
          <img className="haikei-img" src={haikei} alt="d" />
          </div> 
          }>
          </Route>
          <Route path="/Lobby" element={ isLoggedIn === "true" ? 
<div>
  <CallFriend
    socket={ socket }
    />
    <DataLoggedUser/>          
    <Logout/>
    <img className="haikei-img2" src={haikei2} alt="d" />
  </div> :
    <div className="form--img">
    <div className="forms">
    <div className="par--wrapper">
    <p className="login--par">LOGIN <br /> PAGE</p>
    <p>Log In To Your Page</p>
    </div>
  <LogIn/>
  <SignUp/>
  <div className="par--wrapper">
  <p className="signup--par">SIGN <br /> UP <br /> PAGE</p>
  <p className="pink--par">Sign Up And Join Us</p>
  </div>
  </div>
  <img className="haikei-img" src={haikei} alt="d" />
  </div> 
  } />
          <Route path="/Gameplay" element={<Gameplay socket={socket.current}/>}></Route>
        
        </Routes>
        </div>
        </Router>
    )   
}
