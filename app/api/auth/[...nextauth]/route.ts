import { connectDB } from "@/lib/db";
import { userModel } from "@/model/schema";
import NextAuth, { JWT } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

 export const authOptions= {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
//@ts-ignore
    async session({ session, token }) {
      if (token.id) {
        session.user.id = token.id as string; // Attach MongoDB user ID to session
      }
      session.user.username = session.user.name.split(" ").join("").toLowerCase();
  
      return session;
    },
//@ts-ignore

    async jwt({ user, token }) {
      if (user) {
        await connectDB();
        const existingUser = await userModel.findOne({ email: user.email });
  
        if (existingUser) {
          token.id = existingUser._id.toString(); // Store MongoDB _id in token
        } else {
          const newUser = await userModel.create({
            username: user.name,
            email: user.email,
            pic: user.image,
            provider: "google",
          });
          token.id = newUser._id.toString();
        }
      }
      return token;
    },
  },
  
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

