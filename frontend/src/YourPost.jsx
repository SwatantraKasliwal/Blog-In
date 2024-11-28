import React, { useEffect, useState } from "react";
import axios from "axios";

function YourPost() {
  const [yourBlogs, setYourBlogs] = useState([]);
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

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Content</th>
            <th>Date</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {yourBlogs.map((blog, i) => (
            <tr key={i}>
              <td> {blog.post_title} </td>
              <td> {blog.post_content} </td>
              <td> {blog.post_date} </td>
              <td> {blog.username} </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default YourPost;
