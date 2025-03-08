
import { authOptions } from "@/lib/authOptions";
import { connectDB } from "@/lib/db";
import { tweetModel } from "@/model/schema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
      const session = await getServerSession(authOptions);
      if (!session) {
        return NextResponse.json({ error: "Not Authenticated" }, { status: 401 });
      }
  
      const userId = session.user.id;
      const { tweetId } = await req.json();
  
      if (!tweetId) {
        return NextResponse.json({ error: "Tweet ID is required" }, { status: 400 });
      }
  
      await connectDB();
  
      const updatedTweet = await tweetModel.findOneAndUpdate(
        { _id: tweetId },
        { $pull: { likes: userId } }, // Removes userId from likes array
        { new: true }
      );
  
      return NextResponse.json({
        msg: "Unliked",
        tweet: updatedTweet,
      });
    } catch (error) {
      return NextResponse.json({ error: "Something went wrong", details: error }, { status: 500 });
    }
  }
  