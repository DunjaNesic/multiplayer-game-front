import React from 'react'
import './signup.css'

function SignUp() {
  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: ""
})

function handleChange(event) {
    const {name, value} = event.target
    setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value
    }))
}

function handleSubmit(event) {
    event.preventDefault()
    
    fetch("http://localhost:3000", {
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
            alert("Registration Successful");
          } else {
            alert("Something went wrong");
          }
        });
    }
   

  return (
    <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
            <h1 className="form--title">Let's Create Your <br /> Account!</h1>
              <div className="field">
              <h5>Username</h5>
            <input 
                    type="username" 
                    placeholder="Username"
                    className="form--input"
                    name="username"
                    onChange={handleChange}
                    value={formData.username}
                />
                </div>
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
                <div className="field">
                <h5>Repeat password</h5>
                <input 
                    type="password" 
                    placeholder="Confirm password"
                    className="form--input"
                    name="passwordConfirm"
                    onChange={handleChange}
                    value={formData.passwordConfirm}
                />
                </div>
                <button 
                    className="form--submit"
                >
                    Sign Up
                </button>
            </form>
        </div>
  )
}

export default SignUp