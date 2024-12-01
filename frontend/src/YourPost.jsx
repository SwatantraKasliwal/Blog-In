import React, { useEffect, useState } from "react";
import axios from "axios";

function YourPost() {
  const [yourBlogs, setYourBlogs] = useState([]);
  const [expandedPosts, setExpandedPosts] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3000/yourpost", { withCredentials: true })
      .then((res) => {
        setYourBlogs(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const toggleExpand = (index) => {
    setExpandedPosts((prevExpandedPosts) => ({
      ...prevExpandedPosts,
      [index]: !prevExpandedPosts[index],
    }));
  };

  return (
    <>
      <div className="home-container">
        {yourBlogs.map((blog, i) => (
          <div className="home-element">
            <div key={i}>
              <div className="home-title">
                <h2>{blog.post_title}</h2>
              </div>
              <div className="home-content">
                <p>
                  <strong>By:</strong> {blog.username}
                </p>
              </div>
              <div className="home-content">
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(blog.post_date).toISOString().split("T")[0]}
                </p>
              </div>
              <div className="home-content">
                <p>
                  {expandedPosts[i]
                    ? blog.post_content
                    : blog.post_content.slice(0, 100) + "..."}
                </p>
              </div>
              <button onClick={() => toggleExpand(i)} className="btn-element">
                {expandedPosts[i] ? "Read Less" : "Read More"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default YourPost;
