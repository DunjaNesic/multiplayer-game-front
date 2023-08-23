import React from 'react'
import { useNavigate } from "react-router-dom";

function LogIn() {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
})

function handleChange(event) {
    const {name, value} = event.target
    setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value
    }))
}

const navigate = useNavigate();

function handleSubmit(event) {
    event.preventDefault()
    fetch("http://localhost:3000/login-user", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "userRegister");
          if (data.status === "ok") {
            window.localStorage.setItem("token", data.data)
            window.localStorage.setItem("loggedIn", true)
            //iz nekog razloga ne radiii
            // navigate("/Lobby")
            window.location.href="./Lobby"
          } else {
            alert("Something went wrong");
          }
        });
}

  return (
    <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
            <h1 className="form--title">Welcome back!</h1>
              <div className="field">
              <h5>Email</h5>
            <input 
                    type="email" 
                    placeholder="Email"
                    className="form--input"
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                />
                </div>
                
                <div className="field">
                <h5>Input password</h5>
                <input 
                    type="password" 
                    placeholder="Password"
                    className="form--input"
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                />
                </div>
                
                <button 
                    className="form--submit"
                >
                    Log In
                </button>
            </form>
        </div>
  )
}

export default LogIn