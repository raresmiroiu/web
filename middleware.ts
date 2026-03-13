import NextAuth from "next-auth"
import { authConfig } from "./auth.config"

// const middleware = auth((req)=>{
//     const {pathname} = req.nextUrl
//     const isLoggedIn = !!req.auth

//     const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/register")
//     const isDashboardRoute = pathname.startsWith("/dashboard")

//     if(isDashboardRoute&&!isLoggedIn){
//         return NextResponse.redirect(new URL("/login", req.url))
//     }
//     if(isAuthRoute&&isLoggedIn){
//         return NextResponse.redirect(new URL("/dashboard/me",req.url))
//     }
//     return NextResponse.next()
// })

export default NextAuth(authConfig).auth;

export const config={
    matcher:["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}