import React from 'react'
import './user.css'

function CallFriend() {
    const clickedButton = () => {
        alert('Here is your code: _____')
    }
  return (
    <div className="invitation">
      <div className="call">
    <div className='invite--oponent'>Invite Your Oponent Through Room Code</div>
    <p><i className="arrow right"></i></p>
    <button className='roomBtn' onClick={clickedButton}>Get Room Code</button>
    </div>
    <p className='code'>Enter Your Code Here</p>
    <input type="text" />
  </div>
  )
}

export default CallFriend