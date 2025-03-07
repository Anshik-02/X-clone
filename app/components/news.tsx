"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

interface News {
  title: string;
  url: string;
  urlToImage: string;
}

export default function News() {
  const [news, setNews] = useState<News[]>([]);
  const [post, setPosts] = useState(4);
  const [showLessAvailable, setShowLessAvailable] = useState(false); // Track "Show Less"

  useEffect(() => {
    const fetchNews = async () => {
      const response = await axios.get<{ articles: News[] }>(
        "https://saurav.tech/NewsAPI/top-headlines/category/business/in.json"
      );
      setNews(response.data.articles);
    };
    fetchNews();
  }, []);

  const handleShowMore = () => {
    setPosts((prev) => Math.min(prev + 3, news.length));
    setShowLessAvailable(true);
  };

  const handleShowLess = () => {
    setPosts(4);
    setShowLessAvailable(false);
  };

  return (
    <div className="flex flex-col">
      <div className="rounded-xl p-4 py-6 mt-8 ml-8 align-center border-gray-600 border max-w-xs">
        <h2 className="text-xl font-bold mb-3 font-[system-ui]">Subscribe to Premium</h2>
        <p className="text-base font-[system-ui]">
          Subscribe to unlock new features and <br />
          receive a share of revenue.
        </p>
        <button className="bg-blue-500 rounded-3xl hover:brightness-75 transition-all py-2 px-3 mt-2">
          Subscribe
        </button>
      </div>

      <div className="rounded-xl p-4 py-6 m-8 border-gray-600 gap-10 border space-y-4 max-w-xs text-sm">
        <h3 className="text-xl font-[system-ui] font-bold">What's happening</h3>
        {news.slice(0, post).map((item) => (
          <div key={item.title}>
            <a href={item.url} className="flex">
              <h1 className="font-light text-sm m-1">
                {item.title ? item.title : <Skeleton />}
              </h1>
              {item.urlToImage && item.urlToImage.trim() !== "" ? (
                <img src={item.urlToImage} className="w-20 h-10 rounded-lg" alt="news" />
              ) : null}
            </a>
          </div>
        ))}

        {/* Show More & Show Less Options */}
        {post < news.length && (
          <p className="text-blue-300 cursor-pointer" onClick={handleShowMore}>
            Show more
          </p>
        )}
        {showLessAvailable && post > 4 && (
          <p className="text-blue-300 cursor-pointer" onClick={handleShowLess}>
            Show less
          </p>
        )}
      </div>
    </div>
  );
}
