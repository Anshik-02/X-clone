import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/db";
import { userModel } from "@/model/schema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
      const session = await getServerSession(authOptions);
      if (!session) {
        return NextResponse.json({ error: "Not Authenticated" }, { status: 401 });
      }
  
      const userId = session.user.id;
      const { searchParams } = new URL(req.url);
      const otherUserId = searchParams.get("otherUserId");
      if (!otherUserId) {
        return NextResponse.json({ error: "User ID is required" }, { status: 400 });
      }
  
      await connectDB();
  
      // Remove OtherUserId from the current user's "following" list
      await userModel.updateOne(
        { _id: userId },
        { $pull: { following: otherUserId } }
      );
  
      // Remove userId from OtherUserId's "followers" list
      await userModel.updateOne(
        { _id: otherUserId },
        { $pull: { followers: userId } }
      );
  
      return NextResponse.json({ msg: "Unfollowed",unfollowed:true });
    } catch (error) {
      return NextResponse.json({ error: "Something went wrong", details: error }, { status: 500 });
    }
  }
  