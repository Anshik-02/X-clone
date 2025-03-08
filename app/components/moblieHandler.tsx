"use client";

import { useEffect, useState } from "react";

export default function MobileHandler({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Check on initial load
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <p>🚀 Coming Soon</p>
      </div>
    );
  }

  return <>{children}</>;
}
