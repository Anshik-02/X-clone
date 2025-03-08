import NextAuth from "next-auth";
import { authOptions } from "../../../../lib/authOptions";
export const config = {
    runtime: 'edge',
  };
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
