"use client";
import React, { useState } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import Modal from "react-modal";
import { HiX } from "react-icons/hi";
import { SessionProvider, useSession } from "next-auth/react";
import CommentInput from "./commentInput";

interface PostData {
  content: string;
  image: string;
  uname: string;
  pic: string;
  username: string;
  id: string;
}

export default function CommentIcon({
  content,
  image,
  uname,
  pic,
  username,
  id,
}: PostData) {
  return (
    <div>
      <SessionProvider>
        <Comment
          id={id}
          content={content}
          image={image}
          pic={pic}
          username={username}
          uname={uname}
        />
      </SessionProvider>
    </div>
  );
}

function Comment({ content, image, uname, pic, username, id }: PostData) {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  const clickHandler = () => {
    setOpen((prev) => !prev);
  };


  return (
    <div>
      <FaRegCommentDots onClick={clickHandler} className="mt-2 text-gray-500 hover:bg-[#0A171F]    hover:text-[#197ABC] " />
            {open && (
        <Modal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          ariaHideApp={false}
          className="max-w-xl w-[100%]  absolute top-16 left-[50%] bg-[#000000] translate-x-[-50%] border-[#4B5563] border-2 rounded-xl shadow-md"
        >
          <div className=""> 
            <div className="border-b border-gray-200 py-2 px-1.5">
              <HiX
                onClick={() => {
                  setOpen(false);
                }}
                className="text-3xl text-white p-1 hover:bg-[#181919] rounded-full cursor-pointer"
              />
              <div className="m-1">
                <div className="flex items-center space-x-4">
                  <img
                    src={pic || "/default-avatar.png"}
                    className="rounded-full w-12 h-12"
                    alt="User Avatar"
                  />
                  <div>
                    <h2 className="font-bold">{uname}</h2>
                    <h2 className="font-extralight text-gray-400">
                      @{username.toLowerCase()}
                    </h2>
                  </div>
                </div>
                <span className="absolute left-[30px] top-[45px] bottom-[200px] w-[2px] bg-gray-600 -z-10"></span>


                <div className="mt-2 ml-16 ">
                  <p className="mb-5">{content}</p>
                  {image ? (
                    <img
                      src={image}
                      className="rounded-lg border border-[#4B5563] !mr-5"
                    />
                  ) : null}
                </div>
              </div>
              <div className="mt-2">
              <div className="flex items-center gap-3 m-1">
          <img className="rounded-full w-12 h-12" src={session?.user.image||""} alt="user" />
          <div className="flex flex-col leading-tight">
          </div>
          </div>
        </div>
<div>
    <CommentInput tweetId={id}/>
</div>

            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
