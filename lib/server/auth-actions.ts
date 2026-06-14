'use server'
import { prisma } from "@/lib/server/prisma"


import { BaseUrl } from "@/config/config";
import { auth } from "./auth";
import { headers } from "next/headers";


export const Signup = async (name: string, email: string, password: string) => {
    try {

        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            throw new Error("user with email already exists")
        }



        const res = await auth.api.signUpEmail({
            body: {
                name: name,
                email: email,
                password: password,
                callbackURL: BaseUrl,
            },
        });

        return { success: true, data: res };
    } catch (err: any) {
        console.error("Signup error:", err);
        throw err
        // return null;
    }

}

export const Signin = async (email: string, password: string) => {
    try {
        const data = await auth.api.signInEmail({
            body: {
                email,
                password,
                callbackURL: BaseUrl,
            },
        });

        return {
            success: true,
            data,
        };
    } catch (error: any) {
        return {
            success: false,
            code: error?.body?.code,
        };
    }
};



export const Signout = async () => {
    try {
        await auth.api.signOut({
            // This endpoint requires session cookies.
            headers: await headers(),
        });
        return { success: true }
    } catch (err) {
        console.error(err);
        throw err;
    }
}



export const resendVerificationEmail = async (email: string) => {
    try {
        return await auth.api.sendVerificationEmail({
            body: { email },
        });

    } catch (err) {
        console.error(err);
        throw err;
    }
};



