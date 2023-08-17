import React from 'react'
import './signup.css'

function SignUp() {
  const [formData, setFormData] = React.useState({
    fname: "",
    lname: "",
    email: "",
    password: ""
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
    
    fetch("http://localhost:3000/register", {
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
              <h5>First Name</h5>
            <input 
                    type="fname" 
                    placeholder="First name"
                    className="form--input"
                    name="fname"
                    onChange={handleChange}
                    value={formData.fname}
                />
                </div>
                <div className="field">
                <h5>Last Name</h5>
                <input 
                    type="lname" 
                    placeholder="Last name"
                    className="form--input"
                    name="lname"
                    onChange={handleChange}
                    value={formData.lname}
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
                <h5>Password</h5>
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
                    Sign Up
                </button>
            </form>
        </div>
  )
}

export default SignUp