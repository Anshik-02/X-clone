"use client";

import React, { useState } from "react";
import { ImageComponent, Image } from "./imageComponent";
import { MdOutlineGifBox } from "react-icons/md";
import PostButton2 from "./buttons/PostBtn";
import axios from "axios";
import { SessionProvider, useSession } from "next-auth/react";
import { useImage } from "./imageContext";



export default function InputComponent() {


  return (
    <SessionProvider>
    <div>
      <Input/>
    </div>
    </SessionProvider>
  );
}


function Input(){
  const {imageUrl}=useImage() ??{} 
 
  const {data:session}=useSession()
  const [imageId, setImageId] = useState("");
  const [data, setData] = useState({
    content: "",

  });
  const { content } = data;
  const payload={
    content:content,
    authorId:session?.user.id,
    image:imageUrl
  }
  
  const clickHandler = async () => {
    const response =await axios.post("http://localhost:3000/api/tweets/", payload);
    console.log(response.data.msg)
    setData({
      content:""
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
      <div>
        <Image imageId={imageId} />
      </div>

      <textarea
        name="content"
        rows={3}
        placeholder="What is happening?"
        className="w-full border-b bg-transparent outline-none border-gray-600 resize-none p-2 "
        aria-label="What's happening?"
        value={content}
        onChange={changeHandler}
      ></textarea>
    </div>

    <div className="flex justify-between ">
      <div className="flex space-x-2">
        <ImageComponent setImageId={setImageId} />
        <MdOutlineGifBox className="text-2xl text-blue-400 cursor-pointer" />
      </div>
      <PostButton2 onclick={clickHandler} content={content} />
    </div>
  </div>
</div>
}