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
        jwt({ token, user, trigger, session }) {
            //console.log("JWT callback triggered. token:", token, "user:", user);
            if (user) {
                token.role = user.role;
                token.id = user.id;
            }
            //console.log("JWT returning token:", token);
            return token;
        },
        session({ session, token }) {
            //console.log("Session callback triggered. session before:", session, "token:", token);
            if (session.user && token.role) {
                session.user.role = token.role as string;
                session.user.id = token.id as string;
            }
            //console.log("Session callback returning:", session);
            return session;
        },
        authorized({ auth, request: { nextUrl } }) {

            //console.log("auth object:", JSON.stringify(auth));
            //console.log("role:", auth?.user?.role);

            const isLoggedIn = !!auth?.user;
            const role = (auth?.user)?.role;
            const isAdminRoute = nextUrl.pathname === "/admin" || nextUrl.pathname.startsWith("/admin/");
            const isMeRoute = nextUrl.pathname === "/me" || nextUrl.pathname.startsWith("/me/");
            const isOrgRoute = nextUrl.pathname === "/org" || nextUrl.pathname.startsWith("/org/");
            const isAuthRoute = nextUrl.pathname === "/login" || nextUrl.pathname === "/register";

            if (isAuthRoute) {
                if (isLoggedIn) {
                    if (role == "PARTICIPANT") {
                        return Response.redirect(new URL("/me", nextUrl));
                    }
                    else if (role == "ORG_OWNER") {
                        return Response.redirect(new URL("/org", nextUrl));
                    }
                    else if (role == "ADMIN") {
                        return Response.redirect(new URL("/admin", nextUrl));
                    }
                }
                return true;
            }

            if (isAdminRoute) {
                if (!isLoggedIn) {
                    return false;
                }
                if (role != "ADMIN") {
                    if (role == "PARTICIPANT") {
                        return Response.redirect(new URL("/me", nextUrl));
                    }
                    else if (role == "ORG_OWNER") {
                        return Response.redirect(new URL("/org", nextUrl));
                    }
                    return false;
                }
                return true;
            }

            if (isOrgRoute) {
                if (!isLoggedIn) {
                    return false;
                }
                if (role != "ORG_OWNER") {
                    if (role == "PARTICIPANT") {
                        return Response.redirect(new URL("/me", nextUrl));
                    }
                    else if (role == "ADMIN") {
                        return Response.redirect(new URL("/admin", nextUrl));
                    }
                    return false;
                }
                return true;
            }

            if (isMeRoute) {
                if (!isLoggedIn) {
                    return false;
                }
                if (role != "PARTICIPANT") {
                    if (role == "ADMIN") {
                        return Response.redirect(new URL("/admin", nextUrl));
                    }
                    else if (role == "ORG_OWNER") {
                        return Response.redirect(new URL("/org", nextUrl));
                    }
                    return false;
                }
                return true;
            }

            return true;
        },
    },
} satisfies NextAuthConfig;