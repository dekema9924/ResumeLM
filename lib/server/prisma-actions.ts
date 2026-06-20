
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


// update resume
type AiAnalysisResult = {
    overall: { score: number; issues: number };
    items: { label: string; badge: string; score: number }[];
    ats_issues: { section: string; severity: string; problem: string; fix: string }[];
    job_fit: {
        score: number;
        summary: string;
        missing_keywords: string[];
        matching_strengths: string[];
    };
    feedback: string[];
};
export async function updateResumeAnalysis(resumeId: string, aiResult: AiAnalysisResult) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session?.user) {
        throw new Error("You must be logged in to save data.")
    }

    try {
        const updatedResume = await prisma.resume.update({
            where: { id: resumeId },
            data: {
                atsScore: aiResult.overall.score,
                atsIssueCount: aiResult.overall.issues,
                items: aiResult.items,
                atsIssues: aiResult.ats_issues,
                jobFitScore: aiResult.job_fit.score,
                jobFitSummary: aiResult.job_fit.summary,
                missingKeywords: aiResult.job_fit.missing_keywords,
                matchingStrengths: aiResult.job_fit.matching_strengths,
                feedback: aiResult.feedback,
                status: "ANALYZED"
            }
        })

        return { data: updatedResume }
    } catch (err) {
        console.error(err)
        return { error: "Failed to update resume." }
    }
}