"use client";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import InputComponent from "@/app/components/InputComponent";
import Tweets from "@/app/components/Tweets";
import { getServerSession } from "next-auth";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [session, setSession] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Get session on client side
    const fetchSession = async () => {
      const userSession = await getServerSession(authOptions);
      setSession(userSession);
    };

    fetchSession();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Check on initial load
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // If mobile, show "Coming Soon"
  if (isMobile) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <p>🚀 Coming Soon</p>
      </div>
    );
  }

  // If session is not loaded yet
  if (!session) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="flex justify-evenly border-b bg-[#0A0A0A] border-gray-600 sticky top-0">
        <p className="hover:bg-[#181919] flex-1 py-3 text-center cursor-pointer transition-all">
          For you
        </p>
        <p className="hover:bg-[#181919] flex-1 py-3 text-center cursor-pointer transition-all">
          Following
        </p>
      </div>
      <ProfilePic session={session} />
      <InputComponent />
      <div className="border border-b border-gray-600 mb-2"></div>
      <Tweets />
    </div>
  );
}

type ProfilePicProps = {
  session: any;
};

function ProfilePic({ session }: ProfilePicProps) {
  return (
    <div className="flex flex-col m-4 space-y-4">
      <div className="flex">
        <img
          src={session?.user?.image || "/default-avatar.png"}
          className="rounded-full w-12 h-12"
          alt="User Avatar"
        />
        <div className="border rounded-xl px-3 py-1 text-center w-25 h-8 m-1 ml-2 text-blue-400 text-sm">
          Everyone
        </div>
      </div>
    </div>
  );
}
