import { getServerSession } from "next-auth";

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { userModel } from "@/model/schema";
import { authOptions } from "../../../../lib/authOptions";

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Not Authenticated" }, { status: 401 });
    }
    const userId = session.user.id;
    const { searchParams } = new URL(req.url);
    const otherUserId = searchParams.get("otherUserId");

    if(!otherUserId){
      return NextResponse.json(
          { error: "ID are required" },
          { status: 400 }
        );
    }
    connectDB();
  
    const user = await userModel.findById(
  otherUserId
    );
    // const isFollowing = user.following.includes(userId);
    const isFollowers = user.followers.includes(userId);
    return NextResponse.json({
        isFollowers
    });

  }