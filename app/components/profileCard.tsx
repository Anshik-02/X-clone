


import { getServerSession } from "next-auth"

import MoreOptions from "./popover";
import { authOptions } from "../../lib/authOptions";

export default async function ProfileCard() {
    const session = await getServerSession(authOptions);
  
    return (
      <div className="flex items-center mb-5 justify-between px-6 py-3 text-sm font-semibold rounded-full cursor-pointer shadow-md  
      hover:bg-[#181919] transition-all w-full">
        
        {/* Profile Info */}
        <div className="flex items-center gap-3">
          <img className="rounded-full w-12 h-12" src={session?.user.image} alt="user" />
          <div className="flex flex-col leading-tight">
            <span>{session?.user.name}</span>
            <p className="text-sm font-light text-gray-400">@{session?.user.username}</p>
          </div>
        </div>
  
        <MoreOptions/>
        
      </div>
    );
}