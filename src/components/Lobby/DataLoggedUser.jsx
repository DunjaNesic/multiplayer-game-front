import React, { useState, useEffect } from 'react';
import './user.css'
import CallFriend from './CallFriend';

function DataLoggedUser() {
  const [loggedUserInfo, setLoggedUserInfo] = useState({
    email: "",
    fname: "", 
    lname: ""
  });

  useEffect(() => {
    fetch("http://localhost:3000/Lobby", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          setLoggedUserInfo(() => ({
            email: data.data.email,
            fname: data.data.fname,
            lname: data.data.lname
          }));
        } else {
          alert("Something went wrong");
        }
      });
  }, []);

  return (
    <div className='user--data'>
      <CallFriend/>
      <table className='user--table' >
        <tbody>
  <tr>
    <td><h3>Currently logged user</h3></td>
  </tr>
  <tr>
    <td><p>Email adress: {loggedUserInfo.email} </p></td>
  </tr>
  <tr>
    <td><p>Name: {loggedUserInfo.fname}</p></td>
  </tr>
  <tr><td><p>Last name: {loggedUserInfo.lname}</p></td></tr>
  </tbody>
</table>

    </div>
  );
}

export default DataLoggedUser;