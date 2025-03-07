import { ObjectId } from "mongoose";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Add user ID
      name?: string | null;
      email?: string | null;
      image?: string | null;
      bio?:string|null;
      
    };
  }

  interface JWT {
    sub?: string; // User ID is stored in token.sub
  }
}