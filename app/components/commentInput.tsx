"use client";

import React, { useState } from "react";
import { ImageComponent, Image } from "./imageComponent";
import { MdOutlineGifBox } from "react-icons/md";
import PostButton2 from "./buttons/PostBtn";
import axios from "axios";
import { SessionProvider, useSession } from "next-auth/react";

interface data{
    tweetId:string
}


export default function CommentInput({tweetId}:data) {


  return (
    <SessionProvider>
    <div>
      <Input tweetId={tweetId}/>
    </div>
    </SessionProvider>
  );
}


function Input({tweetId}:data){
  const {data:session}=useSession()
  const [data, setData] = useState({
    comment: "",

  });
  const { comment } = data;
  const payload={
    comment:comment,
    userId:session?.user.id,
tweetId:tweetId
  }
  
  const clickHandler = async () => {
    const response =await axios.post(`${process.env.NEXTAUTH_URL}/api/tweets/comment/`, payload);

    setData({
      comment:""
    })
    location.reload()
  };

  const changeHandler = (e: any) => {
    const { name, value } = e.target;

   setData((c)=>({...c,[name]:value}))

  };
  return <div>
  <div className="flex flex-col ml-4 mr-4 space-y-4">
    <div>
      <textarea
        name="comment"
        rows={2}
        placeholder="Post your reply"
        className="w-full  border-b bg-transparent outline-none border-gray-600 resize-none p-3  "
        aria-label="What's happening?"
        value={comment}
        onChange={changeHandler}
      ></textarea>
    </div>

    <div className="flex justify-between ">
      <div className="flex space-x-2">
        <MdOutlineGifBox className="text-2xl text-blue-400 cursor-pointer" />
      </div>
      <PostButton2 onclick={clickHandler} content={comment} />
    </div>
  </div>
</div>
}