"use client";
import axios from "axios";
import { SessionProvider, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type FollowingType = {
  _id: string;
  pic: string;
  username: string;
}; 


export default function FollowingList() {
  return (
    <div>
      <SessionProvider>
        <Following />
      </SessionProvider>
    </div>
  );
}

function Following() {
  const [following, setFollowing] = useState<FollowingType[]>([]);


  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios(`${process.env.NEXTAUTH_URL}/api/user`);

      setFollowing(
        Array.isArray(response.data.following) ? response.data.following : []
      );
    };
    fetchUser();
  }, []);

  return (
    <div>
      {following.length > 0 ? (
        following.map((data, key) => (
          <FollowList
            key={data._id}
            _id={data._id}
            pic={data.pic}
            username={data.username}
          />
        ))
      ) : (
        <p></p>
      )}
    </div>
  );
}

function FollowList({ pic, username, _id }:FollowingType) {
  return (
    <div>
      <Link href={`/dashboard/user/${_id}`}>
        <div className="w-full hover:bg-[#080808] cursor-pointer flex justify-between">
          <div className="flex p-3">
            <img src={pic} className="w-12 h-12 rounded-full" alt="huihui" />

            <div className="flex flex-col ml-4 ">
              <p className="font-bold ml-1 ">{username}</p>
              <p className="font-extralight text-[#71767B] ">
                @{username.toLocaleLowerCase()}
              </p>
            </div>
          </div>
          <button className="rounded-3xl border w-24 h-9 text-sm font-bold m-4">
            Following
          </button>
        </div>
      </Link>
    </div>
  );
}
