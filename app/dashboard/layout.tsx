
import { ImageProvider } from '@/app/components/imageContext';
import News from '@/app/components/news'
import Sidebar from '@/app/components/sidebar'

import React from 'react'



export default function Layout({ children }: any) {
  return (

    <div className="flex justify-between max-w-7xl mx-auto h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="border-r border-gray-600 w-72 sticky top-0 h-screen overflow-y-auto hide-scrollbar">
        <Sidebar />
      </div>

      {/* Main Content (Shorter) */}
      <div className="flex-1 overflow-y-auto hide-scrollbar max-w-[600px]"> 
      <ImageProvider>
   
          {children}
      
        </ImageProvider>
   
      </div>

      {/* News Section (Bigger) */}
      <div className="border-l border-gray-600 w-[400px] sticky top-0 h-screen overflow-y-auto hide-scrollbar"> 
        <News />
      </div>
    </div>

  );
}