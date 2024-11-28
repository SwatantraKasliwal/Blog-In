import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Login({ setIsAuthenticated, setUserId}) {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:3000/login", { username, password } ,{ withCredentials: true })
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          setIsAuthenticated(true);
          setUserId(res.data.userId);
          navigate('/'); // Redirect to home
        } else {
          alert(res.data.message); // Show error message
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Enter your email:</label>
        <input type="email" name="username" placeholder="Enter your email" value={username} onChange={handleEmailChange}/>
        <label htmlFor="password">Password:</label>
        <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange}/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
