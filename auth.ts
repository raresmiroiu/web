import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { compare } from "bcryptjs"
import { pool } from "@/libs/db"
import { authConfig } from "./auth.config"

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const email = credentials.email as string;
                const password = credentials.password as string;
                // user = { id: "1", email: "test@example.com", password: "$2b$10$nzoV17di3tJeLLcYBnaRP.UXvJzW3KkgB1Wq8.4OwlEVdSlAvmqWu" }; // Mock user
                try {   
                    const result = await pool.query(
                        "SELECT * FROM users WHERE email = $1",
                        [email]
                    );
                    const user = result.rows[0];
                    if (!user) {
                        return null;
                    }
                    const isPasswordCorrect = await compare(password, user.password);
                    if (!isPasswordCorrect) {
                        return null;
                    }

                    return {
                        id: user.id,
                        email: user.email,
                        role: user.role,
                        name: user.name,
                    };
                }
                catch (error) {
                    console.log("Database error during authorize: ", error);
                    return null;
                }
            },
        })
    ],
    session: {
        strategy: "jwt"
    }
})