import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { transporter } from "./nodemailer";
import { nextCookies } from "better-auth/next-js";

const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
})

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    session: {
        expiresIn: 60 * 60 * 24, // 1 days

    },
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        autoSignIn: false
    },
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, url, token }, request) => {
            try {
                await transporter.sendMail({
                    from: `"ResumeLM" <${process.env.EMAIL_FROM}>`,
                    to: user.email,
                    subject: "Verify your email address",
                    text: `Click the link to verify your email: ${url}`,
                });

                console.log("email sent");
            } catch (err) {
                console.error("EMAIL ERROR:", err);
            }
        }
    },



    plugins: [nextCookies()]
},);