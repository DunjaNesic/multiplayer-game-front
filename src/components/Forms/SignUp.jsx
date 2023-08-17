import React from 'react';
import './signup.css';

function SignUp() {
  const [formData, setFormData] = React.useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = React.useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  function validateField(name, value) {
    let errorMessage = '';

    if (name === 'fname' || name === 'lname') {
      if (!/^[A-Za-z0-9]{2,16}$/.test(value)) {
        errorMessage =
          'Name should be 2-16 characters and should not include any special characters!';
      }
    } else if (name === 'email') {
      if (!/\S+@\S+\.\S+/.test(value)) {
        errorMessage = 'Email address must be valid!';
      }
    } else if (name === 'password') {
      if (!/(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{4,20}$/.test(value)) {
        errorMessage =
          'Password should be 4-20 characters and include at least 1 letter, 1 number and 1 special character!';
      }
    }
    return errorMessage;
  }

  function handleBlur(event) {
    const { name, value } = event.target;
    const errorMessage = validateField(name, value);

    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      [name]: errorMessage,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    
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
            type="text" 
            placeholder="First name"
            className="form--input"
            name="fname"
            onChange={handleChange}
            onBlur={handleBlur} 
            value={formData.fname}
            required={true}
          />
          {formErrors.fname && <div className="error-message">{formErrors.fname}</div>}
        </div>
        <div className="field">
          <h5>Last Name</h5>
          <input 
            type="text" 
            placeholder="Last name"
            className="form--input"
            name="lname"
            onChange={handleChange}
            onBlur={handleBlur} 
            value={formData.lname}
            required={true}
          />
          {formErrors.lname && <div className="error-message">{formErrors.lname}</div>}
        </div>
        <div className="field">
          <h5>Email</h5>
          <input 
            type="email" 
            placeholder="Email"
            className="form--input"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur} 
            value={formData.email}
            required={true}
          />
          {formErrors.email && <div className="error-message">{formErrors.email}</div>}
        </div>
        <div className="field">
          <h5>Password</h5>
          <input 
            type="password" 
            placeholder="Password"
            className="form--input"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur} 
            value={formData.password}
            required={true}
          />
          {formErrors.password && <div className="error-message">{formErrors.password}</div>}
        </div>
        <button className="form--submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;