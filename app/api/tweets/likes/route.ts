import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/db";
import { tweetModel } from "@/model/schema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
     const session = await getServerSession(authOptions);
      if (!session) {
        return NextResponse.json({ error: "Not Authenticated" }, { status: 401 });
      }
      const userId = session.user.id;
      const body=await req.json()
      const {tweetId}=body
      if(!tweetId){
        return NextResponse.json(
            { error: "Tweet ID are required" },
            { status: 400 }
          );
      }
      await connectDB()
     const  updatedTweet = await tweetModel.findByIdAndUpdate(
        tweetId,
        { $addToSet: { likes: userId } },
        { new: true } // Return updated tweet
      );
    return NextResponse.json({
msg:"liked",
updatedTweet
    })
}


export async function GET(req:NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Not Authenticated" }, { status: 401 });
  }
  const userId = session.user.id;
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
  )
  return NextResponse.json({
   tweet
        })
}