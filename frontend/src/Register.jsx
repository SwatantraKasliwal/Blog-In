import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register({ setIsAuthenticated, setUserId, setProfileName}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  function handleUserName(event) {
    setUserName(event.target.value);
  }
  function handleEmailChange(event) {
    setEmail(event.target.value);
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }
  function handleConfirmPass(event) {
    setConfirmPass(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (password === confirmPass) {
      axios
        .post("http://localhost:3000/register", { userName, email, password },{withCredentials:true})
        .then((res) => {
          console.log("this is registerede data: ",res.data);
          alert(res.data.message);
          if(res.data.success){
              navigate("/");
              setIsAuthenticated(true);
              setUserId(res.data.userId);
              setProfileName(res.data.userName);
          }else{
            alert(res.data.message);
            navigate("/login");
          }
        }).catch(err=>{
            console.log("this is the error in register component: ",err);
        })
    }else{
     alert("Please Check your password");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">User Name:</label>
          <input
            type="text"
            placeholder="Enter user name"
            name="username"
            value={userName}
            onChange={handleUserName}
          />
        </div>
        <div>
          <label htmlFor="email">Enter your email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <label htmlFor="confirmPass">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm password"
            name="confirmPass"
            value={confirmPass}
            onChange={handleConfirmPass}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
