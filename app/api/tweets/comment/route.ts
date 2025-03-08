
import { connectDB } from "@/lib/db";
import { commentModel, tweetModel } from "@/model/schema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../../lib/authOptions";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Not Authenticated" }, { status: 401 });
  }
  const userId = session.user.id;
  const body = await req.json();
  const { comment, tweetId } = body;

  if (!comment || !tweetId) {
    return NextResponse.json(
      { error: "Comment and Tweet ID are required" },
      { status: 400 }
    );
  }
  connectDB();

  const newComment = await commentModel.create({
    userId,
    comment,
  });
  await tweetModel.updateOne(
    { _id: tweetId },
    { $push: { comment: newComment._id } }
  );
  return NextResponse.json({ msg: "Comment added", commentId: newComment._id });
}



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
  )

  const comments = await commentModel.find({ _id: { $in: tweet.comment } }).populate("userId");
  return NextResponse.json({
 comments
        })
}
