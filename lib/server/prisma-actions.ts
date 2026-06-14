
"use server"

import { prisma } from "@/lib/server/prisma"
import { auth } from "@/lib/server/auth"
import { headers } from "next/headers"


type ResumeType = {
    fileName: string
    filePath: string
    company: string
    jobTitle: string
    jobDescription: string
}


export async function saveResumeToDatabase({ fileName, filePath, company, jobTitle, jobDescription }: ResumeType) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session?.user) {
        throw new Error("You must be logged in to save data.")
    }

    try {
        // Save the record linked to the authenticated user ID
        const newResume = await prisma.resume.create({
            data: {
                name: fileName,
                filePath,
                userId: session.user.id,
                company,
                jobDescription,
                jobTitle
            }
        })

        return { success: true, resume: newResume }
    } catch (err) {
        console.error(err)
    }
}



export async function getResume() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session?.user) {
        throw new Error("You must be logged in to save data.")
    }

    try {
        const getUserResume = await prisma.resume.findMany({
            where: { userId: session.user.id }
        })

        return { data: getUserResume }
    } catch (err) {
        console.error(err)
    }

}
