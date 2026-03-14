import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authConfig = {
    providers: [
        Credentials({}),
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isDashboard = nextUrl.pathname.startsWith("/admin") ||
                nextUrl.pathname.startsWith("/me") ||
                nextUrl.pathname.startsWith("/org");
            const isAuthRoute = nextUrl.pathname.startsWith("/login") ||
                nextUrl.pathname.startsWith("/register");

            if (isAuthRoute) {
                if (isLoggedIn) {
                    return Response.redirect(new URL("/me", nextUrl));
                }
                return true;
            }

            if (isDashboard) {
                if (!isLoggedIn) {
                    return false;
                }
                return true;
            }

            return true;
        },
    },
} satisfies NextAuthConfig;