import { NextRequest, NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { connectDB } from "@/lib/db";
import { userModel } from "@/model/schema";
import { authOptions } from "../../../../lib/authOptions";

export async function GET(req:NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Not Authenticated" }, { status: 401 });
    }
 
    const { searchParams } = new URL(req.url);
    
    const userId = searchParams.get("userId");
  
    if(!userId){
      return NextResponse.json(
          { error: "Tweet ID are required" },
          { status: 400 }
        );
    }
    await connectDB()
    const user=await userModel.findById(
      userId
    )
    return NextResponse.json({
     user
          })
  }