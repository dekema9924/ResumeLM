import { ResumeType } from '@/app/(protected)/page'
import { create } from 'zustand'

interface ResumeStore {
    resumes: ResumeType[]

    setResumes: (resumes: ResumeType[]) => void

    addResume: (resume: ResumeType) => void

    removeResume: (id: string) => void

    updateResume: (resume: ResumeType) => void
}

export const useResumeStore = create<ResumeStore>((set) => ({
    resumes: [],

    setResumes: (resumes) =>
        set({ resumes }),

    addResume: (resume) =>
        set((state) => ({
            resumes: [resume, ...state.resumes],
        })),

    updateResume: (resume) =>
        set((state) => ({
            resumes: state.resumes.map((r) =>
                r.id === resume.id ? { ...r, ...resume } : r
            ),
        })),

    removeResume: (id) =>
        set((state) => ({
            resumes: state.resumes.filter((r) => r.id !== id),
        })),
}))