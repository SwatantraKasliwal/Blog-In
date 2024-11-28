import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function CreatePost({authorId}){
    console.log("Author ID in CreatePost:", authorId);
    const [currentDate, setCurrentDate] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    function handelTitle(event){
        setTitle(event.target.value);
    }

    function handelContent(event){
        setContent(event.target.value);
    }

    function handelSubmit(event){
        event.preventDefault();
        axios.post("http://localhost:3000/createpost", {title, content,authorId}, { withCredentials: true })
        .then(res=>{
            console.log("Submitted Data:", { title, content, authorId });
            console.log(res.data);
            alert("Post Created Successfully");
            navigate("/");
            setTitle("");
            setContent("");
        })
        .catch(err=>{
            console.log(err)
            alert(`Error in posting your blog please try again ${err}, there might me some data you not filled`);
            navigate("/createpost");
            setTitle("");
            setContent("");
        })
    }

    useEffect(() => {
        const today = new Date();
        setCurrentDate(today.toISOString().split('T')[0]); 
    }, []);

    return(
        <div>
            <form action="" onSubmit={handelSubmit}>
            <label htmlFor="title">Title</label>
            <input 
            type="text" 
            name="title" 
            placeholder="Enter the title here" 
            value={title} 
            onChange={handelTitle}/>
            <label htmlFor="content">Write Blog:</label>
            <textarea 
            name="content" 
            id="content" 
            placeholder="Write your blog here" 
            value={content} 
            onChange={handelContent}/>
            {/* <input type="date" value={currentDate} readOnly /> */}
            <p>Created on: {currentDate.split('-').reverse().join('/')} </p>
            <button type="submit">Create Blog</button>
            </form>
        </div>
    )
}

export default CreatePost;
