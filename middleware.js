import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      // Check role-based access for specific routes
      if (req.nextUrl.pathname === "/Admin") {
        return token?.role === "admin";
      }
      if (req.nextUrl.pathname === "/Students") {
        return token?.role === "student";
      }

      // Default behavior: Check if the user is logged in for other routes
      return !!token;
    },
  },
});
 

export const config = { matcher: ["/Admin", "/Students"] };
