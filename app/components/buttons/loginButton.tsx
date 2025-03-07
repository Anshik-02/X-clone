"use client"
import { signIn } from "next-auth/react";

const clickHandler = () => {
    signIn("google", { callbackUrl: "/dashboard/home" });
  };


export function Button1(){
    return  <button onClick={clickHandler} className="flex items-center mb-5 justify-center gap-2 px-6 py-3 text-gray-700 bg-white border
     border-gray-300 rounded-full shadow-md hover:bg-gray-100 transition-all w-full">
    <img src="/google.svg" alt="Google" className="w-6 h-6" />
    <span className="text-base font-medium">Sign up with Google</span>
  </button>
}




export function Button2(){
    return  <button className="flex items-center mb-5 justify-center gap-2 px-6 py-3 text-gray-700 bg-white border
     border-gray-300 rounded-full shadow-md hover:bg-gray-100 transition-all w-full">
    <img src="/apple.svg" alt="Apple" className="w-6 h-6" />
    <span className="text-base font-medium">Sign up with Apple</span>
    </button>
}
