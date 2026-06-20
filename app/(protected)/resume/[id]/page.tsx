'use client'
import FilePreview from '@/components/layout/FilePreview'
import ResumeHeader from '@/components/layout/ResumeHeader'
import AtsScore from '@/components/ui/AtsScore'
import ScoreCard from '@/components/ui/ScoreCard'
import bg from '@/public/assets/public/images/bg-main.svg'
import { useResumeStore } from '@/store/resume-store'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { getResume } from '@/lib/server/prisma-actions'
import ScoreAccordian from '@/components/ui/ScoreAccordian'

function Resumepage() {
    const resumes = useResumeStore((state) => state.resumes)
    const setResumes = useResumeStore((state) => state.setResumes)
    const { id } = useParams()
    const findResume = resumes.find(element => element.id === id)


    // persist data 
    useEffect(() => {
        if (resumes.length === 0) {
            getResume().then((data) => {
                setResumes(data?.data ?? [])
            })

        }
    }, [])

    return (
        <div className="h-screen flex flex-col overflow-hiddenN">
            <ResumeHeader job_title={findResume?.jobTitle ?? ""} />

            <main
                className="flex-1 min-h-0 flex flex-col md:flex-row overflow-hidden"
                style={{ backgroundImage: `url("${bg}")` }}
            >
                {/* LEFT SIDE - PDF PREVIEW */}
                <div className="
                    md:w-[48%] w-full
                    bg-slate-50 border-r border-slate-200
                    p-4 md:p-6
                    flex flex-col
                    h-[50vh] md:h-auto
                ">
                    <div className="flex-1 min-h-0 rounded-3xl bg-white shadow-sm border border-slate-200 overflow-hidden flex flex-col">

                        {/* Preview Header */}
                        <div className="px-6 py-4 border-b border-slate-100 shrink-0">
                            <h2 className=" text-lg font-semibold text-slate-800">
                                Resume Preview
                            </h2>
                            <p className="text-sm text-slate-500">
                                Uploaded document
                            </p>
                        </div>

                        {/* PDF Viewer */}
                        <div className="flex-1 min-h-0 overflow-y-auto bg-linear-to-b from-indigo-50 to-pink-50 p-4 md:p-8">
                            <div className="flex justify-center items-start min-h-full">
                                <div className="bg-white rounded-4xl p-4 shadow-xl">
                                    {findResume && (
                                        <FilePreview
                                            url={findResume.filePath}
                                            width={380}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex-1 min-h-0 overflow-y-auto p-4 md:p-6 ">
                    <h1 className=' gradient-text font-bold text-3xl py-6'>Resume Review</h1>
                    <ScoreCard />
                    <AtsScore />
                    <ScoreAccordian />
                </div>
            </main>
        </div>
    )
}

export default Resumepage