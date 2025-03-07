"use client"; // This ensures RecoilRoot only applies to client components

import { RecoilRoot } from "recoil";

export default function RecoilProvider({ children }: { children: React.ReactNode }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}