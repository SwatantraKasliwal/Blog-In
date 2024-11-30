import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Login({ setIsAuthenticated, setUserId,setProfileName}) {
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
          setProfileName(res.data.userName);
          navigate('/');
        } else {
          alert(res.data.message);
          navigate("/login"); 
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
        <label htmlFor="email">Enter your email:</label>
        <input type="email" name="username" placeholder="Enter your email" value={username} onChange={handleEmailChange}/>
        </div>
        <div>
        <label htmlFor="password">Password:</label>
        <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange}/>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
