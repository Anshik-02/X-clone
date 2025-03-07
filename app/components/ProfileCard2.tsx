"use client";
import axios from "axios";
import { SessionProvider, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Input } from '@mui/base/Input';

export default function ProfileCard2() {
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
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [form,setForm]=useState({
    username:"",
    bio:""
  })
const {username,bio}=form
  useEffect(() => {
    if (!session?.user) return;

    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/user");
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [session]);

  const clickHandler = () => {
    setOpen((prev) => !prev);
  };

const changeHandler=(e)=>{
  const {name,value}=e.target
  setForm((c)=>({...c,[name]:value}))
}
const submitt=async(e)=>{
  e.preventDefault()
const response=await axios.put("http://localhost:3000/api/user",form)
console.log(response.data)
location.reload()
}


  return (
    <div>
      {open && (
        <Modal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          ariaHideApp={false}
          className="max-w-xl w-full  flex items-center flex-col absolute top-24 left-1/2 bg-black translate-x-[-50%] border-gray-700 border-2 rounded-xl shadow-md"
        >
          <h2 className="font-bold text-2xl m-3">EDIT PROFILE</h2>
          <div className="m-3">
            <form>
              <NameInput name={"username"} value={username} changeHandler={changeHandler} label="Username"/>
              <NameInput name={"bio"} value={bio} changeHandler={changeHandler} label="Bio"/>
          <button onClick={submitt} className="rounded-lg bg-white text-black hover:brightness-90 font-semibold py-2 px-5 w-full mt-5 mb-5">
            SUBMIT
          </button>
            </form>
          </div>
        </Modal>
      )}
<div  className="relative">
        <div>
          <img src="/bg.jpg" className="w-full" alt="Background" />
        </div>
        <div className="flex flex-col border-b border-gray-700">
          <div className="absolute left-24 top-[7.9rem] transform -translate-x-1/2 bg-black rounded-full border-1 border-black">
            <img
              src={session?.user.image || "/default-profile.jpg"}
              className="rounded-full w-36 h-36 p-1"
              alt="Profile"
            />
          </div>
          <div className="w-full h-20 flex justify-end">
            <button
              onClick={clickHandler}
              className="rounded-3xl border w-24 h-9 text-sm font-bold m-4"
            >
              Edit profile
            </button>
          </div>
        <div className="ml-5 mt-2">
          <h2 className="font-bold text-xl">{session?.user.name}</h2>
          <p className="font-extralight text-gray-500">
            @{session?.user.name?.toLowerCase()}
          </p>
        </div>

        <p className="ml-6 font-extralight mt-2 text-base">
          {user?.bio || "No bio available"}
        </p>

        <div className="flex font-extralight ml-5 mt-6 text-gray-500 gap-8 mb-3">
          <Link href={"/dashboard/profile/following"}>
            <p className="hover:underline cursor-pointer">
              {user?.following?.length ?? 0} Following
            </p>
          </Link>
          <Link href={"/dashboard/profile/followers"}>
            <p className="hover:underline cursor-pointer">
              {user?.followers?.length ?? 0} Followers
            </p>
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
}
function NameInput({value,name,changeHandler,label}) {




  const [error, setError] = useState("");


  return (
    <div className="flex flex-col !w-96">
      <label className="text-sm mb-1">{label}</label>
      <div
        className={`border ${
          error ? "border-red-500" : "border-gray-700"
        } rounded-md p-2 flex items-center bg-black`}
      >
        <input
          type="text"
          value={value}
          onChange={changeHandler}
   
          className=" bg-black text-white outline-none"
          name={name} 
        />
    
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
