import React from 'react'
import Board from './Board'
import './gameplay.css'

function Gameplay() {
  return (
    <div className='game'>
        <Board className='myBoard'/>
        <Board className='opponentsBoard'/>
    </div>
  )
}

export default Gameplay