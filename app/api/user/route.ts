import { connectDB } from "@/lib/db";
import {  userModel } from "@/model/schema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/authOptions";


export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Not Authenticated" }, { status: 401 });
  }
  const userId = session.user.id;
  const body = await req.json();
  const bio = body.bio;
  connectDB();

  const updatedUser = await userModel.updateOne(
    { _id: userId }, // Find user by ID
    { $set: { bio: bio } } // Update bio field
  );

  return NextResponse.json({
    msg: "done",
    updatedUser
  });
}

export async function POST(req:NextRequest){
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Not Authenticated" }, { status: 401 });
    }
    const userId=session.user.id
    const { searchParams } = new URL(req.url);
    const otherUserId = searchParams.get("otherUserId");



    if (!userId ||!otherUserId) {
      return NextResponse.json(
        { error: "Both User ID are required" },
        { status: 400 }
      );
    }
await connectDB()
await userModel.updateOne(
    {_id:otherUserId},
    { $addToSet: { followers:userId } }
)
await userModel.updateOne(
    {_id:userId},
    { $addToSet: { following:otherUserId } }
)

return NextResponse.json({
    msg:"bangi baat",
    follow:true
})
}


export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Not Authenticated" }, { status: 401 });
  }
  const userId = session.user.id;

  connectDB();

  const user = await userModel.findById(
userId
  );
const followers=await userModel.find({ _id: { $in: user.followers } })
const following=await userModel.find({ _id: { $in: user.following } })
  return NextResponse.json({
    user,
    followers,
    following
  });
}