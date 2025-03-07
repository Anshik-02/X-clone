import FollowingList from '@/app/components/following'
import Link from 'next/link'
import React from 'react'
import { FaLongArrowAltLeft } from 'react-icons/fa'

export default function Following() {
  return (
    <div> 
    <div className='flex '>
    <Link href={"/dashboard/profile"}>
  <FaLongArrowAltLeft className=' mt-3 m-3 text-2xl p-1 hover:bg-[#181919] rounded-full'/>   </Link>
    <h1 className='m-2 font-bold text-2xl'>
    Profile
    </h1>
    
    </div>
 
    <div className='flex w-full h-11 justify-evenly border-b bg-[#0A0A0A] border-gray-600 sticky  top-0'>
      <Link className='hover:bg-[#181919] flex-1 py-3 text-center cursor-pointer transition-all  text-[#4B5563]' href={"/dashboard/profile/followers"}>
<p >Followers</p></Link>
<Link className='hover:bg-[#181919] flex-1 py-3 text-center cursor-pointer transition-all  border-blue-100 border-b ' href={"/dashboard/profile/following"}>
<p >Following</p></Link>
    </div>
    <FollowingList/>
    </div>
  )
}
