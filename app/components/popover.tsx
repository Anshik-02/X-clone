"use client";
import { useState } from "react";
import { Menu } from "@headlessui/react";
import { BsThreeDots } from "react-icons/bs";
import { SessionProvider, signOut, useSession } from "next-auth/react";

export default function MoreOptions(){
    return <div>
    <SessionProvider>
        <Pop/>
    </SessionProvider>
    </div>
}




 function Pop() {
    const {data:session}=useSession()
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="p-2 rounded-full hover:bg-gray-800">
      <BsThreeDots  className="text-gray-400 cursor-pointer" />
      </Menu.Button>

      <Menu.Items className="absolute right-2 bottom-full !mb-8 w-56 rounded-lg bg-black text-white shadow-lg ring-1 ring-gray-700 focus:outline-none">
  <div className="p-2">
    <Menu.Item>
      {({ active }) => (
        <button
          className={`${
            active ? "bg-gray-800" : ""
          } w-full text-left px-4 py-2 rounded-lg`}
        >
          Add an existing account
        </button>
      )}
    </Menu.Item>
    <Menu.Item>
      {({ active }) => (
        <button
          className={`${
            active ? "bg-gray-800" : ""
          } w-full text-left px-4 py-2 rounded-lg mt-1`}
          onClick={()=>signOut({ callbackUrl: "/" }) }
        >
          Log out @{session?.user.name?.toLocaleLowerCase()}
        </button>
      )}
    </Menu.Item>
  </div>
</Menu.Items>
        </Menu>
  );
}
