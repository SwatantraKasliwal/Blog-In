import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CreatePost from "./CreatePost";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import axios from "axios";
import YourPost from "./YourPost";

function Navigation() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [profileName, setProfileName] = useState("");

  function handleLogout() {
    setIsAuthenticated(false);
    setUserId(null);
    axios
      .post("http://localhost:3000/logout", {}, { withCredentials: true })
      .then((res) => {
        alert(res.data.message)
        navigate("/");
      });
  }

  return (
    <Router>
      <div>
        <nav className="navbar">
          <div className="brand-name">
            <h1>BlogIn...</h1>
          </div>
          <div className="nav-elements">
            {!isAuthenticated ? (
              <div className="nav-childelements">
                <Link to="/">Home</Link>
                <Link to="/login" className="nav-btn">Login</Link>/
                <Link to="/register" className="nav-btn">Register</Link>
              </div>
            ) : (
              <div className="nav-childelements">
                <Profile userName={profileName}/>
                <Link to="/">Home</Link>
                <Link to="/createpost"> Create Post</Link>
                <Link to="/yourpost">Your Post</Link>
                <button onClick={handleLogout} className="nav-btn">Logout</button>
              </div>
            )}
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <Login
                setIsAuthenticated={setIsAuthenticated}
                setUserId={setUserId}
                setProfileName={setProfileName}
              />
            }
          />
          <Route
            path="/register"
            element={
              <Register
                setIsAuthenticated={setIsAuthenticated}
                setUserId={setUserId}
                setProfileName={setProfileName}
              />
            }
          />
          {isAuthenticated && (
            <>
              <Route
                path="/createpost"
                element={<CreatePost authorId={userId} />}
              />
              <Route path="/yourpost" element={<YourPost />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default Navigation;
