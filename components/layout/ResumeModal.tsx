"use client";

import { Mona_Sans } from "next/font/google";
import { useUploadModal } from "@/context/ModalContext";
import bg from "@/public/assets/public/images/bg-main.svg";
import UploadResume from "../ui/UploadResume";
import Btn from "../ui/Btn";
import { useEffect } from "react";
import { X } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form"
import { useState } from "react";
import { uploadToSupabase } from "@/lib/client/uploadToSupabase";
import { useIsLoggedIn } from "@/hooks/useIsLoggedIn";
import { saveResumeToDatabase } from "@/lib/server/prisma-actions";
import toast from "react-hot-toast";



type Inputs = {
    company_name: string
    job_title: string
    job_description: string
}


const mona_sans = Mona_Sans({
    weight: "600",
    subsets: ["latin"],
});

export default function ResumeModal() {
    const [file, setFile] = useState<File | null>(null)
    const { session } = useIsLoggedIn()
    const { isUploadBtnClicked, setUploadBtnClicked } = useUploadModal();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (!file || !session?.user?.id) return

        const res = await uploadToSupabase(file, session.user.id)

        if (res?.signedUrl) {
            const saveresume = await saveResumeToDatabase({
                fileName: file.name,
                filePath: res.signedUrl,
                company: data.company_name,
                jobTitle: data.job_title,
                jobDescription: data.job_description
            })
            if (!saveresume) return
            if (saveresume.success) {
                toast.success("Resume loaded...Analyzing")
                setUploadBtnClicked(false)
            }
        }







    }

    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    if (!isUploadBtnClicked) return null;


    return (
        <div
            style={{ backgroundImage: `url("${bg.src}")` }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-center bg-no-repeat md:w-9/12 w-full
             bg-white shadow rounded-2xl z-50 max-h-[90vh] overflow-y-auto"
        >

            <div className="flex flex-col items-center">
                <X onClick={() => setUploadBtnClicked(false)} size={33} className="absolute right-10 top-5 cursor-pointer" />
                <h1
                    className={`gradient-text w-8/12 md:w-10/12 text-3xl border md:text-[3.2em]  font-bold text-center md:leading-17 lg:leading-16 md:mt-10 mt-20 ${mona_sans.className}`}
                >
                    Smart feedback for your dream job
                </h1>
                <span
                    className={` md:text-lg mt-3 w-66 my-10 md:w-fit  ${mona_sans.className} text-[#475467] text-center`}
                >
                    Drop your resume for an ATS score and improvement analysis.
                </span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col pb-10 gap-5 w-10/12 m-auto " action="">
                <div className="flex flex-col gap-3">
                    <label
                        className="text-[#475467]  w-fit relative top-2 ml-2"
                        htmlFor="company_name"
                    >
                        Company Name
                    </label>
                    <input
                        className="w-11/12 bg-white h-10 pl-5 rounded-xl "
                        type="text"
                        // name="company_name"
                        placeholder="Google"
                        {...register("company_name", { required: "company name is required", })}
                    />
                    {errors.company_name && <span className="text-sm text-red-400 ml-2">{errors.company_name.message}</span>}
                </div>

                <div className="flex flex-col gap-3">
                    <label
                        className="text-[#475467] relative top-2 ml-2"
                        htmlFor="job_title"
                    >
                        Job Title
                    </label>
                    <input
                        className="w-11/12 h-10 bg-white pl-5 rounded-xl"
                        type="text"
                        // name="job_title"
                        placeholder="Software Engineer"
                        {...register("job_title", { required: "job title cannot be empty" })}
                    />
                    {errors.job_title && <span className="text-sm text-red-400 ml-2">{errors.job_title.message}</span>}

                </div>

                <div className="flex flex-col gap-3">
                    <label
                        className="text-[#475467] relative top-2 ml-2"
                        htmlFor="job-Description"
                    >
                        Job Description
                    </label>
                    <textarea
                        className="w-11/12 min-h-44 bg-white pl-5 rounded-xl px-4 pt-6"
                        // name="job_description"
                        placeholder="Write a clear & concise job description. If possible paste job description from job posting for better results"
                        {...register("job_description")}
                    />
                </div>

                <UploadResume file={file} setFile={setFile} />

                <div className="w-11/12 ">
                    <Btn
                        text={isSubmitting ? "Analyzing Resume..." : "Save & Analyze Resume"}
                        disabled={isSubmitting}
                        className={`h-13 w-full my-14 text-lg font-semibold transition-all ${isSubmitting
                                ? "opacity-70 cursor-not-allowed"
                                : "hover:shadow-lg"
                            }`}
                    />
                </div>
            </form>
        </div>
    );
}
