import React from "react"
import './App.css'
import SignUp from "./components/Forms/SignUp"
import LogIn from './components/Forms/LogIn'
import haikei from './haikei.png'
import haikei2 from './haikei2.png'
import DataLoggedUser from "./components/Lobby/DataLoggedUser"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Start from "./components/Lobby/Start"
import Logout from "./components/Lobby/Logout"

export default function App() {
   
  
    return (
      <Router>
        <div className="App">
        <Routes>
          <Route exact path="/" element={
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
          <Route path="/Lobby" element={ <div>
            <DataLoggedUser/>
            <Start/>
            <Logout/>
            <img className="haikei-img2" src={haikei2} alt="d" />
          </div> } />
          <Route path="/Gameplay" element={
            <div>dunja</div>
          }></Route>
        </Routes>
        </div>
        </Router>
    )   
}
