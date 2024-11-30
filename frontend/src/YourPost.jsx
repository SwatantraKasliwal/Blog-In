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
      {yourBlogs.map((blog, i) => (
        <div className="blog-card" key={i}>
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
          <button onClick={() => toggleExpand(i)}>
            {expandedPosts[i] ? "Read Less" : "Read More"}
          </button>
        </div>
      ))}
    </>
  );
}

export default YourPost;
