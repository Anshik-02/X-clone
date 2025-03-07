"use client";
import { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import axios from "axios";
import { useSession, SessionProvider } from "next-auth/react";

interface Data {
  tweetId: string;
}

function PrettyHeart({ tweetId }: Data) {
  return (
    <SessionProvider>
      <Heart tweetId={tweetId} />
    </SessionProvider>
  );
}

function Heart({ tweetId }: Data) {
  const { data: session } = useSession();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!session?.user?.id) return;

    const fetchLike = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/tweets/likes?tweetId=${tweetId}`
        );
        setIsLiked(response.data.tweet.likes.includes(session.user.id));
      } catch (error) {
        console.error("Error fetching like status:", error);
      }
    };

    fetchLike();
  }, [tweetId, session]); 
const toggleLike = async () => {
    if (!session?.user?.id) return; 
    try {
      let response;
  
      if (!isLiked) {
        response = await axios.post(
          "http://localhost:3000/api/tweets/likes/",
          { tweetId }
        );
        setIsLiked(response.data.liked);
      } else {
        response = await axios.post(
          "http://localhost:3000/api/tweets/likes/unlike",
          { tweetId }
        );
        setIsLiked(response.data.unliked); 
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
    location.reload()
  };

  return (
    <button
      onClick={toggleLike}
      className={`transition-all duration-200 rounded-full p-2 ${
        isLiked ? "text-red-500" : "text-gray-500"
      }`}
    >
      {isLiked ? <FaHeart className="w-4 h-4" /> : <FaRegHeart className="w-4 h-4" />}
    </button>
  );
}

export default PrettyHeart;
