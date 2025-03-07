"use client"
import React from 'react'
interface data{
  onclick:()=>void,
  content:string
}


export default function PostButton2({onclick,content}:data) {
  return (
  
   <button onClick={onclick} disabled={content.trim()===""} className='flex items-center mb-5 justify-center gap-2 px-1 py-1
    font-semibold text-black   bg-blue-400 border border-gray-300
   rounded-full  shadow-md hover:brightness-75 transition-all w-24'>
    Post
   </button>
  )
}
