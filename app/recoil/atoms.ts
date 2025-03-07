"use client"
import { atom } from "recoil";



export const commentState = atom<{ [key: string]: boolean }>({
  key: "commentState",
  default: {}, // 👈 Default is an empty object to track multiple IDs
});