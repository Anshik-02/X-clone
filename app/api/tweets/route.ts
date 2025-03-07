import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/db";
import { tweetModel } from "@/model/schema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface Data{
    tweetId:string
    image?:string,
    content?:string,
    like?:string[],

}

export async function POST(req:NextRequest) {
    const session=await getServerSession(authOptions)
    if(!session){
        return NextResponse.json({ error: "Not Authenticated" }, { status: 401 });
    }
    const authorId=session.user.id
        const body=await req.json()
    const {content,image}=body
    if(content){
       await connectDB()
       const tweet= await tweetModel.create({
            content,
            authorId,
            image

        })

        return NextResponse.json({msg:"course created successfully"  });
    }
    return NextResponse.json({msg:"done"});
    }
    

export async function PUT(req:NextRequest) {
    const session=await getServerSession(authOptions)

    if(!session){
        return NextResponse.json({ error: "Not Authenticated" }, { status: 401 });
    }
    await connectDB()
    const body= await req.json()
    const {image, content,tweetId}:Data=body
   
    if (!tweetId) {
        return NextResponse.json({ error: "Tweet ID is required" }, { status: 400 });
    }
    const tweet = await tweetModel.findOne({ _id: tweetId, authorId: session.user.id });
    if (!tweet) {
        return NextResponse.json({ error: "Tweet not found or unauthorized" }, { status: 404 });
    }
    const updateFields: Record<string, any> = {};
    if (image) updateFields.image = image;
    if (content) updateFields.content = content;
    await tweetModel.updateOne({ _id: tweetId }, { $set: updateFields });

    return NextResponse.json({ msg: "Tweet updated successfully" });
}

export async function GET() {
    await connectDB()
    const tweets=await tweetModel.find().populate("authorId")
return NextResponse.json({
    tweets
})
}




