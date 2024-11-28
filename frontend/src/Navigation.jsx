import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CreatePost from "./CreatePost";
import Home from "./Home";
import Login from "./Login";
import axios from "axios";
import YourPost from "./YourPost";

function Navigation() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);

  function handleLogout() {
    setIsAuthenticated(false);
    setUserId(null);
    axios
      .post("http://localhost:3000/logout", {}, { withCredentials: true })
      .then(() => {
        // Perform any additional actions after logout
        navigate("/");
      });
  }
  
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link>
          {!isAuthenticated ? (
            <button>
              <Link to="/login">Login</Link>
            </button>
          ) : (
            <div>
              <Link to="/createpost"> Create Post</Link>
              <Link to="/yourpost">Your Post</Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <Login
                setIsAuthenticated={setIsAuthenticated}
                setUserId={setUserId}
              />
            }
          />
          {isAuthenticated && (
            <>
              <Route
                path="/createpost"
                element={<CreatePost authorId={userId} />}
              />
              <Route
                path="/yourpost"
                element={<YourPost/>}
              />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default Navigation;
