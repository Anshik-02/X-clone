"use client";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

import CommentIcon from "./commentIcon";
import PrettyHeart from "./heart";
import XSpinner from "./spinner";

interface Author {
  _id: string;
  username: string;
  pic: string;
}
interface User {
  _id: string;
  username: string;
  pic: string;
}

interface Tweet {
  content: string;
  image?: string;
  authorId: Author;
  _id: string;
  comment: string[];
  likes: string[];
  userId?:User
}

export default function Post() {
  const params = useParams();
  const tweetId = params.tweet?.slice(1);
  const [tweetData, setTweetData] = useState<Tweet | null>(null);
  const fetched = useRef(false); 
const [comments,setComments]=useState<Tweet[]>([])

  useEffect(() => {
    const fetchPost = async () => {
      if (!tweetId || fetched.current) return;
      fetched.current = true; 

      try {
        const response = await axios.get(
          `http://localhost:3000/api/tweets/post?tweetId=${tweetId}`
        );
const res=await axios.get( `http://localhost:3000/api/tweets/comment?tweetId=${tweetId}`)

setComments(res.data.comments)
  
        setTweetData(response.data.tweet);
      } catch (error) {
        console.error("Error fetching tweet:", error);
      }
    };

    fetchPost();
  }, [tweetId]); 

  if (!tweetData) return <XSpinner />;

  return (
<div>     <div className=" border-b border-[#4B5563] ">
    <div className="m-3 ">
      {/* Profile Section */}
      <div className="flex items-center space-x-4">
        <img
          src={tweetData.authorId.pic || "/default-avatar.png"}
          className="rounded-full w-12 h-12"
          alt="User Avatar"
        />
        <div>
          <h2 className="font-bold">{tweetData.authorId.username}</h2>
          <h2 className="font-extralight text-gray-400">@{tweetData.authorId.username.toLowerCase()}</h2>
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-2 ml-16 ">
        <p className="mb-5">{tweetData.content}</p>
        {tweetData.image ? <img src={tweetData.image} className="rounded-lg border border-[#4B5563]" /> : null}
       <div className="mt-2 flex gap-20"><div className="flex gap-2"><CommentIcon id={tweetData._id} content={tweetData.content} image={tweetData.image||""} pic={tweetData.authorId.pic} username={tweetData.authorId.username} uname={tweetData.authorId.username}/>
       <p className="mt-1">{tweetData.comment?.length ?? 0}</p></div>
       <div className="flex"><PrettyHeart tweetId={tweetData._id}/><p className="mt-1">{tweetData.likes?.length ?? 0}</p></div></div>
       </div>
      </div>

    </div>
    <div>
    {comments.map((data:Tweet) => (

<div key={data._id} className=" border-b border-[#4B5563] ">
<div className="m-3 ">
  {/* Profile Section */}
  <div className="flex items-center space-x-4">
    <img
      src={data.userId?.pic || "/default-avatar.png"}
      className="rounded-full w-12 h-12"
      alt="User Avatar"
    />
    <div>
      <h2 className="font-bold">{data.userId?.username}</h2>
      <h2 className="font-extralight text-gray-400">@{data.userId?.username.toLowerCase()}</h2>
    </div>
  </div>

  {/* Content Section */}
  <div className="mt-2 ml-16 ">
    <p className="mb-5">{data.comment}</p>
    {data.image ? <img src={data.image} className="rounded-lg border border-[#4B5563]" /> : null}
   <div className="mt-2 flex gap-20"><div className="flex gap-2">
  </div>
</div>
   </div>
  </div>

</div>
        
        ))}
    </div>
    </div>



  );
}


