import ProfileCard2 from '@/app/components/ProfileCard2'
import Link from 'next/link'
import React from 'react'
import { FaLongArrowAltLeft } from 'react-icons/fa'

export default function Profile() {
  return (
    <div>
        <div className='flex gap-1 sticky top-0'>
    <Link href={"/dashboard/home"}>
  <FaLongArrowAltLeft className=' mt-3 m-3 text-2xl p-1 hover:bg-[#181919] rounded-full'/></Link>
    <h1 className='m-2 font-bold text-2xl'>
    Profile
    </h1>
</div>
    <ProfileCard2/>
    </div>
  )
}
