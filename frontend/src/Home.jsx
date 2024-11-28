import React,{useState, useEffect} from "react";
import axios from 'axios';

function Home(){
    const [blogs, setBlogs] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost:3000/")
        .then(res => {
            setBlogs(res.data)
            // console.log(res.data);
        })
        .catch(err=>console.log(err));
    },[])
        return(
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
            {
            blogs.map((blog,i)=>(
                <tr key={i}>
                    <td> {blog.post_title} </td>
                    <td> {blog.post_content} </td>
                    <td> {blog.post_date} </td>
                    <td> {blog.username} </td>
                </tr>
            ))
            
            }
        </tbody>
    </table>
        )    
}

export default Home;
