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
  const [profileName, setProfileName]= useState("");

  function handleLogout() {
    setIsAuthenticated(false);
    setUserId(null);
    axios
      .post("http://localhost:3000/logout", {}, { withCredentials: true })
      .then(() => {
        navigate("/");
      });
  }

  return (
    <Router>
      <div>
        <nav className="navbar">
          <h1>BlogIn</h1>
          <ul>
            <li>
              
              <Link to="/">Home</Link>
            </li>
            {!isAuthenticated ? (
              <div>
                <li>
                  <button>
                    <Link to="/login">Login</Link>
                  </button>
                </li>
                <li>
                  <button>
                    <Link to="/register">Register</Link>
                  </button>
                </li>
              </div>
            ) : (
              <div>
                <li>
                  
                  <Link to="/createpost"> Create Post</Link>
                </li>
                <li>
                  
                  <Link to="/yourpost">Your Post</Link>
                </li>
                <li>
                  
                  <button onClick={handleLogout}>Logout</button>
                </li>
                <li>
                  <Profile userName={profileName}/>
                </li>
              </div>
            )}
          </ul>
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
