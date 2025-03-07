"use client";
import { CiImageOn } from "react-icons/ci";
import React, { useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { useImage } from "./imageContext";


function ImageUploader() {
  const [imageId, setImageId] = useState("");

  return (
    <div>
      <ImageComponent setImageId={setImageId} />
      <Image imageId={imageId} />
    </div>
  );
}

export function ImageComponent({ setImageId }: { setImageId: (id: string) => void }) {
  return (
    <div>
    <CldUploadWidget
      uploadPreset="x-clone"
      options={{ sources: ["local"] }}
      onSuccess={(result) => {
        if (result.event === "success") {
          //@ts-ignore
          setImageId(result.info.public_id);
        }
      }}
    >
      {({ open }) => (
        <button onClick={() => open()}>
          <CiImageOn className="text-2xl text-blue-400 cursor-pointer" />
        </button>
      )}
    </CldUploadWidget></div>
  );
}

export function Image({ imageId }: { imageId: string }) {
  const {setImageUrl} =useImage()??{}
  useEffect(() => {
    if (imageId) {
      setImageUrl(`https://res.cloudinary.com/dp25f4ybo/image/upload/${imageId}`);
    }
  }, [imageId, setImageUrl]);
  return (
    <div>
      {imageId && (
        <img
          src={`https://res.cloudinary.com/dp25f4ybo/image/upload/${imageId}`}
          width="600"
          height="500"
          alt="Uploaded"
          className="rounded-lg"
        />
      )}
    </div>
  );
}
