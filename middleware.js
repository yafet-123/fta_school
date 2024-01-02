import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      // `/admin` requires admin role
      if (req.nextUrl.pathname === "/Admin") {
        return token?.role === "admin"
      }
      // `/me` only requires the user to be logged in
      return !!token
    },
  },
})


export const config = { matcher: ["/Admin","/Admin/User","/Admin/JobAdd","/Admin/JobDisplay","/Admin/Category","/Admin/Location","/Admin/NewsCategory","/Admin/News","/Admin/EntertainmentCategory","/Admin/Entertainment","/Admin/HTmlCourse","/Admin/CSSCourse","/Admin/JavascriptCourses","/Admin/PythonCourses","/Admin/BlogsCategory","/Admin/Blogs","/Admin/AiSearchCategory","/Admin/AiSearch"] };