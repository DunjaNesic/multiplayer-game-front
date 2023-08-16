import React from 'react'

function LogIn() {
  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
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
    console.log("Log in");
}

  return (
    <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
            <h1 className="form--title">Welcome back!</h1>
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