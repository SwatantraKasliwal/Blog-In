import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [expandedPosts, setExpandedPosts] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3000/")
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const toggleExpand = (index) => {
    setExpandedPosts((prevExpandedPosts) => ({
      ...prevExpandedPosts,
      [index]: !prevExpandedPosts[index],
    }));
  };

  return (
    <div className="home-container">
      {blogs.map((blog, i) => (
        <div>
          <div key={i}>
            <h2>{blog.post_title}</h2>
            <p>
              <strong>By:</strong> {blog.username}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(blog.post_date).toISOString().split("T")[0]}
            </p>
            <p>
              {expandedPosts[i]
                ? blog.post_content
                : blog.post_content.slice(0, 100) + "..."}
            </p>
            <button onClick={() => toggleExpand(i)} className="btn-group btn-xs btn-info">
              {expandedPosts[i] ? "Read Less" : "Read More"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
