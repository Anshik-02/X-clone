"use client"
import React, { useState } from 'react'

export default function PostButton() {
 const [open,setOpen]=useState(false)
 const clickHandler=()=>{
  setOpen((e)=>!e)
 }
 
 
 
 
 
 
 
  return (
<div>
   <button className='flex items-center mb-5 justify-center gap-2 px-6 py-3
    font-semibold text-black   bg-white border border-gray-300
   rounded-full shadow-md hover:brightness-75 transition-all w-full' onClick={clickHandler}>
    Post
   </button>

   </div>
  )
}
