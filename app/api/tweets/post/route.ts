import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import { tweetModel } from "@/model/schema";
import { authOptions } from "../../../../lib/authOptions";

export async function GET(req:NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Not Authenticated" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const tweetId = searchParams.get("tweetId");
  
    if(!tweetId){
      return NextResponse.json(
          { error: "Tweet ID are required" },
          { status: 400 }
        );
    }
    await connectDB()
    const tweet=await tweetModel.findById(
      tweetId
    ).populate("authorId")
    return NextResponse.json({
     tweet
          })
  }