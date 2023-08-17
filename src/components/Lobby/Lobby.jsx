import React, { useState, useEffect } from 'react'

function Lobby() {

    const [loggedUserInfo, setLoggedUserInfo] = useState("");

useEffect(()=>{
    fetch("http://localhost:3000/userDetails", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
            token: window.localStorage.getItem("token")
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "userData");
          setLoggedUserInfo(data.data);
          if (data.status === "ok") {
            alert("Successfully Loged In");
          } else {
            alert("Something went wrong");
          }
        });
},[])

  return (
    <div>{loggedUserInfo}</div>
  )
}

export default Lobby