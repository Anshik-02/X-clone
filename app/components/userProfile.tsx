"use client";
import axios from "axios";
import { SessionProvider, useSession } from "next-auth/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User{
pic?:string;
username?:string;
followers?:string[];
following?:string[];
bio?:string

}



export default function UserProfile() {
  return (
    <div>
      <SessionProvider>
        <Card />
      </SessionProvider>
    </div>
  );
}

function Card() {
  const { data: session } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<User|null>(null);
  const [follow, setFollow] = useState(false);
  const params = useParams();
  const userId = params.user?.slice();

  if (session?.user.id == userId) {
    router.push("/dashboard/profile");
  }
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/user/follow?otherUserId=${userId}`
      );

      setFollow(response.data.isFollowers);
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/user/profile?userId=${userId}`
      );

      setUser(response.data.user);
    };
    fetchUser();
  }, []);

  const clickHandler = async () => {
    try {
      let response;

      if (!follow) {
        response = await axios.post(
          `http://localhost:3000/api/user?otherUserId=${userId}`
        );
        setFollow(response.data.follow);

      } else {
        response = await axios.post(
          `http://localhost:3000/api/user/unfollow?otherUserId=${userId}`
        );
        setFollow(response.data.unfollow);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
    location.reload();
  };

  return (
    <div className="relative">
      <div>
        <img src="/bg.jpg" className="w-full" alt="" />
      </div>
      <div className="flex flex-col border-b border-[#77787A] ">  
        <div className="absolute left-24 top-[7.9rem] transform -translate-x-1/2 bg-black rounded-full border-1 border-black">
            <img
              src={user?.pic || "/default-profile.jpg"}
              className="rounded-full w-36 h-36 p-1"
              alt="Profile"
            />
          </div>
      <div className="w-full  flex justify-end">
          <button
            onClick={clickHandler}
            className="rounded-3xl hover:bg-gray-800 border w-24 h-9 text-sm font-bold m-4"
          >
            {!follow && <p className="cursor-pointer">Follow</p>}
            {follow && <p>Following</p>}
          </button>
        </div>
        <div className="ml-5 mt-2">
          <h2 className="font-bold text-xl ">{user?.username}</h2>
          <p className="font-extralight text-[#71767B]">
            @{user?.username?.toLocaleLowerCase()}
          </p>
        </div>

        <p className="ml-6 font-extralight mt-2 text-base !mr-2 te ">
          {user?.bio}
        </p>
        <div className="flex font-extralight ml-5  mt-6 text-[#71767B] gap-8 mb-3">
          <p className="hover:underline cursor-pointer">
            {user?.following?.length ?? 0} Following
          </p>

          <p className="hover:underline cursor-pointer">
            {user?.followers?.length ?? 0} Followers
          </p>
        </div>
      </div>
    </div>
  );
}
