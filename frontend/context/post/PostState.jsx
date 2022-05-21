import { useState } from "react";
import PostContext from "./postContext";


const PostState = (props) => {

    const host = "http://localhost:5000";

    const postInitial = [];
    const [posts, setPosts] = useState(postInitial);

    // Fetch Notes
    const fetchPost = async ()=>{

        // API Call
        const response = await fetch(`${host}/api/v1/posts/`,{
            method: "GET",
            headers:{
                "Content-Type": "application/json"
            }
        });

        const json = await response.json();
        setPosts(json);
        console.log(posts);
    }

  return (
      <PostContext.Provider value={{posts, fetchPost}}>
      {props.children}
      </PostContext.Provider>
  );
};

export default PostState;