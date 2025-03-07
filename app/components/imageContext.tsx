
"use client";
import { createContext, useContext, useState } from "react";
import { RecoilRoot } from "recoil";

const ImageContext = createContext<any>(null);

export function ImageProvider({ children }: { children: React.ReactNode }) {
  const [imageUrl, setImageUrl] = useState("");

  return (

    <ImageContext.Provider value={{ imageUrl, setImageUrl }}>
      {children}
    </ImageContext.Provider>

  );
}

export function useImage() {
  return useContext(ImageContext);
}
