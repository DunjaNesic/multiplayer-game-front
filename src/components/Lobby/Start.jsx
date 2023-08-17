import React from 'react'
import './user.css'

function Start() {
  const handleClick = () => {
    console.log("Dunja");
    window.location.href="./Gameplay"
  }
  return (
    <div className='start'><button className='btnStart' onClick={handleClick}>PLAY</button></div>
  )
}

export default Start