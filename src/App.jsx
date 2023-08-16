import React from "react"
import './App.css'
import SignUp from "./components/Forms/SignUp"
import LogIn from './components/Forms/LogIn'

export default function App() {
   
    return (
        <div className="App">
          <LogIn/>
          <SignUp/>
        </div>
    )
}
