import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth({
  callbacks: {
    async authorized({ req, token }) {
      const { pathname } = req.nextUrl;

      // Allow access to "/" and "/about" for all users
      if (["/", "/about"].includes(pathname)) {
        return true;
      }

      // Check role-based access for specific routes
      console.log(pathname)
      if (pathname.startsWith("/Admin")) {
        if (token?.role !== "admin") {
          return false;
        }
      }

      if (pathname.startsWith("/Students")) {
        if (token?.role !== "student") {
          return false;
        }
      }

      if (pathname.startsWith("/Teacher")) {
        if (token?.role !== "teacher") {
          return false;
        }
      }

      // Default behavior: Check if the user is logged in for other routes
      if (!token) {
        return false;
      }

      return true;
    },
  },

export const config = { matcher: "/(.*)" };

export function handle({ request, resolve }) {
  const authorized = request.authenticated;

  if (!authorized) {
    return NextResponse.redirect('/auth/error');
  }

  return resolve(request);
}
