import { FaHome } from "react-icons/fa";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoPersonSharp } from "react-icons/io5";
import PostButton from "./buttons/postButton";
import ProfileCard from "./profileCard";


export default function Sidebar() {
  return (
  <div className="flex flex-col justify-between h-screen ">
    <div className="p-3 pr-9 flex flex-col gap-3">
      <Link href={"/dashboard/home"}>
        <FaXTwitter className="w-16 h-16 hover:bg-[#181919] p-3 rounded-full cursor-pointer" />
       </Link>
      <Link href={"/dashboard/home"} className="hover:bg-[#181919] p-3 rounded-full  font-[system-ui] text-2xl cursor-pointer flex items-center w-fit gap-3">
        <FaHome className="w-8 h-8  " />
        <span >Home</span>
      </Link>
      <Link href={"/"} className="hover:bg-[#181919] p-3 rounded-full font-[system-ui] text-2xl  cursor-pointer flex items-center w-fit gap-3">
        <IoSearchSharp className="w-8 h-8  " />
        <span >Search</span>
      </Link>
      <Link href={"/"} className="hover:bg-[#181919] p-3 rounded-full font-[system-ui] text-2xl flex cursor-pointer items-center w-fit gap-3">
        <IoMdNotificationsOutline className="w-8 h-8  " />
        <span >Notification</span>
      </Link>
      <Link href={"/dashboard/profile"} className="hover:bg-[#181919] p-3 rounded-full font-[system-ui] text-2xl flex cursor-pointer items-center w-fit gap-3">
        <IoPersonSharp className="w-8 h-8  " />
        <span >Profile</span>
      </Link>
      <PostButton/>
    
    </div>
    <ProfileCard />
    </div>
  );
}
