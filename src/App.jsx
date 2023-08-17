import React from "react"
import './App.css'
import SignUp from "./components/Forms/SignUp"
import LogIn from './components/Forms/LogIn'
import haikei from './haikei.png'
import Lobby from "./components/Lobby/Lobby"

export default function App() {
   
    return (
        <div className="App">
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
          <Lobby/>
        </div>
    )
}
