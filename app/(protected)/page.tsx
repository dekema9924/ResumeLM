'use client'
import Resume from "@/components/layout/Resume";
import UserAvatar from "@/components/ui/UserAvatar";
import { Mona_Sans } from "next/font/google";
import { useUploadModal } from "@/context/ModalContext";
import Btn from "@/components/ui/Btn";
import Link from "next/link";
import { deleteResume, getResume } from "@/lib/server/prisma-actions";
import { useEffect, useState, useTransition } from "react";
import { useResumeStore } from "@/store/resume-store";
import Loading from "@/Loadng";
import { Resume as r } from "@/generated/prisma/client";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation'




const mona_sans = Mona_Sans({
  weight: "600",
  subsets: ["latin"],
});

export type ResumeType = r



export default function Home() {
  const { setUploadBtnClicked } = useUploadModal()
  const resumes = useResumeStore((state) => state.resumes)
  const setResumes = useResumeStore((state) => state.setResumes)
  const [isLoading, setIsLoading] = useState(true)
  const removeResume = useResumeStore((state) => state.removeResume)
  const [isPending, startTransition] = useTransition()
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const router = useRouter()



  useEffect(() => {

    const loadResume = async () => {
      const res = await getResume()
      if (res) {
        setResumes(res.data)
        setIsLoading(false)
      }
    }

    loadResume()

  }, [])

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Delete this resume? This can\'t be undone.')
    if (!confirmed) return

    setDeletingId(id)
    startTransition(async () => {
      const result = await deleteResume(id)
      removeResume(id)
      if (!result?.success) {
        toast.error('Failed to delete resume. Please try again.')
      }
      toast.success("Item delete")
      setDeletingId(null)
    })
  }



  return (
    <>
      <UserAvatar />
      <main className="hero  min-h-screen bg-no-repeat">
        <div className="md:w-8/12 w-11/12 m-auto pt-60   h-76.25 flex items-center justify-center flex-col gap-3">
          <div className=" bg-white rounded-full w-full flex items-center justify-between h-16 p-6">
            <p className="gradient-text  font-bold text-lg">RESUMIND</p>

            <Btn
              action={() => setUploadBtnClicked(true)}
              text="Upload Resume"


            />
          </div>

          <h1
            className={`gradient-text text-4xl border md:text-[4.2em] xl:text-[5.4em] font-bold text-center md:leading-17 lg:leading-22 md:mt-10 mt-10 ${mona_sans.className}`}
          >
            Track Your Applications & Resume Ratings
          </h1>
          <span
            className={`mt-5 font  text-lg ${mona_sans.className} text-[#475467] text-center`}
          >
            Review your submissions and check AI-powered feedback
          </span>
        </div>




        <div
          className="mx-auto w-full max-w-425 px-4 sm:px-6 lg:px-8 mt-40 md:mt-20 lg:mt-60 pb-20 grid grid-cols-1 sm:grid-cols-2 gap-10
           lg:grid-cols-3 xl:grid-cols-4 "
        >

          {resumes?.map((resume: ResumeType) => {
            return (
              <div
                key={resume.id}
                onClick={() => router.push(`/resume/${resume.id}`)}
                className="cursor-pointer"
              >
                {resume.atsScore !== null ? (
                  <Resume
                    isDeleting={deletingId === resume.id}
                    company_name={resume.company}
                    job_title={resume.jobTitle}
                    previewUrl={resume.filePath}
                    percentage={resume.atsScore}
                    onDelete={() => handleDelete(resume.id)}
                  />
                ) : (
                  <div>ATS analysis pending...</div>
                )}
              </div>
            );
          })}
        </div>

        {
          isLoading && <Loading />
        }

        {resumes.length <= 0 && (
          <div className="flex flex-col items-center justify-center  text-center">
            <div className="text-6xl mb-4">📄</div>

            <h2 className="text-xl font-semibold text-gray-800">
              No resumes uploaded yet
            </h2>

            <p className="text-gray-500 mt-2 max-w-md">
              Upload your first resume to get AI feedback, job matching insights, and improvements.
            </p>
          </div>
        )}


      </main>
    </>
  );
}
