"use client"
import axios from 'axios'
import { SessionProvider, useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function FollowersList() {




  return (
    <div>
<SessionProvider>
    <Follower/>
</SessionProvider>

    </div>
  )
}

function Follower(){
const[follower,setFollower]=useState([])
const[user,setUser]=useState(null)
const {data:session}=useSession()

useEffect(()=>{
 const fetchUser=async()=>{
    const response=await axios("http://localhost:3000/api/user")

  
    setFollower(Array.isArray(response.data.followers) ? response.data.followers : [])
 }
fetchUser()
},[])



return <div>
{follower.length > 0 ? (
  follower.map((data, key) => (
    <FollowList id={data?._id}  key={key} pic={data.pic} username={data.username} />
  ))
) : (
  <p></p>
)}
</div>
}




function FollowList({pic,username,id}){


return <div>
<Link href={`/dashboard/user/${id}`}><div className='w-full hover:bg-[#080808] cursor-pointer flex justify-between'>
    <div className='flex p-3'><img src={pic} className='w-12 h-12 rounded-full' alt="huihui" />

<div className='flex flex-col ml-4 '><p className='font-bold ml-1 '>{username}</p>
<p className='font-extralight text-[#71767B] '>@{username.toLocaleLowerCase()}</p></div>
</div>
<button className="rounded-3xl border w-24 h-9 text-sm font-bold m-4">
         Follows You
          </button>

</div></Link>

</div>


}