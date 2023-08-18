import React from 'react'
import './user.css'

function Logout() {
  const logout = () =>{
    window.localStorage.clear();
    window.localStorage.removeItem("token")
    window.location.href="/"
  }
  return (
    <div className='logout'><button className='logoutBtn' onClick={logout}>Logout</button></div>
  )
}
export default Logout