import axios from "axios";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { FaRegCommentDots } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import PrettyHeart from "./heart";
import CommentIcon from "./commentIcon";
import Link from "next/link";

interface Author {
  _id: string; 
  username: string;
  pic: string;

}

  interface Tweets {
    content: string;
    image?: string;
  authorId:Author;
  _id:string;
  comment:string[];
  likes:string[];

  }

  interface PostData{
    content:string;
    image:string;
    uname:string;
    pic:string;
    username:string;
  id:string;
  comment:number;
  likes:number;
  userId:string
  }



  export default async function Tweets() {
    const response = await axios.get("http://localhost:3000/api/tweets");


    return (
      <div>
        {response.data.tweets.slice().reverse().map((data:Tweets) => (
    <div key={data._id}>
          <Posts userId={data.authorId._id} comment={data.comment.length} id={data._id} likes={data.likes.length}  content={data.content} image={data.image||""} uname={data.authorId.username} pic={data.authorId.pic} username={data.authorId.username} />
          </div>
        ))}
      </div>
    );
  }

export async function Posts({ content,image,uname,pic,username,id,comment,likes,userId }:PostData) {
  const session = await getServerSession(authOptions);

  return (<div className=" border-b border-[#4B5563] cursor-pointer">
         
    <div className="m-3 ">
      {/* Profile Section */}
      <div className="flex items-center space-x-4">
      <Link href={`/dashboard/user/${userId}`}> <img
          src={pic || "/default-avatar.png"}
          className="rounded-full w-12 h-12"
          alt="User Avatar"
        /></Link>
        <Link href={`/dashboard/tweet/${id}`}><div>
          <h2 className="font-bold">{uname}</h2>
          <h2 className="font-extralight text-gray-400">@{username.toLowerCase()}</h2>
        </div></Link>
      </div>

      {/* Content Section */}
       <div className="mt-2 ml-16 ">
       <Link href={`/dashboard/tweet/${id}`}>  <p className="mb-5">{content}</p>
        {image ? <img src={image} className="rounded-lg border border-[#4B5563]" /> : null}</Link>
       <div className="mt-2 flex gap-20"><div className="flex gap-2">  <CommentIcon id={id} content={content} image={image} pic={pic} username={username} uname={uname}/><p className="mt-1">{comment}</p></div>
       <div className="flex"><PrettyHeart tweetId={id}/><p className="mt-1">{likes}</p></div></div>
      </div>
    </div></div>
  );
}

