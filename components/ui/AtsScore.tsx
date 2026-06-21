import { LaptopMinimalCheck, CircleCheck, TriangleAlert } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useResumeStore } from '@/store/resume-store';

interface AtsIssue {
    section: string;
    severity: 'high' | 'medium' | 'low';
    problem: string;
    fix: string;
}

const severityColor: Record<AtsIssue['severity'], string> = {
    high: '#dc2626',
    medium: '#f97316',
    low: '#ca8a04',
};

export default function AtsScore() {
    const { id } = useParams();
    const resumes = useResumeStore((state) => state.resumes);
    const findResume = resumes.find((r) => r.id === id);

    if (!findResume) {
        return (
            <section className={`flex flex-col bg-linear-to-b from-green-100/60 to-green-100/10 mt-10 p-4 shadow-2xl rounded-2xl gap-4`}>
                <p className='text-sm text-gray-400'>Analyzing resume...</p>
            </section>
        );
    }

    const atsIssues = (findResume.atsIssues as AtsIssue[] | null) ?? [];

    return (
        <section
            className={`flex mt-4 flex-col gap-5 rounded-3xl border p-6 bg-linear-to-b ${findResume.atsScore && findResume.atsScore < 50
                ? "border-rose-100 from-rose-50/80 to-white"
                : "border-emerald-100 from-emerald-50/80 to-white"
                }`}
        >
            <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-b from-teal-400 to-teal-700 shadow-sm">
                    <LaptopMinimalCheck color="white" size={20} />
                </div>
                <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        ATS Score
                    </p>
                    <p className="text-2xl font-bold text-slate-800">
                        {findResume.atsScore ?? "--"}
                        <span className="text-base font-medium text-slate-400">/100</span>
                    </p>
                </div>
            </div>

            <div className="space-y-1">
                <p className="text-sm font-medium text-slate-700">
                    How well does your resume pass through Applicant Tracking Systems?
                </p>
                <p className="text-xs text-slate-400">
                    Your resume was scanned like an employer would. Here&apos;s how it performed.
                </p>
            </div>

            <ul className="flex flex-col gap-2">
                {atsIssues.length === 0 ? (
                    <li className="flex items-center gap-2 rounded-xl bg-white/70 px-3 py-2 text-sm text-slate-700">
                        <CircleCheck color="green" size={18} className="flex-shrink-0" />
                        No major ATS issues detected
                    </li>
                ) : (
                    atsIssues.map((issue, i) => (
                        <li
                            key={`${issue.section}-${i}`}
                            className="flex items-start gap-2 rounded-xl bg-white/70 px-3 py-2 text-sm text-slate-700"
                        >
                            <TriangleAlert
                                color={severityColor[issue.severity]}
                                size={18}
                                className="mt-0.5 flex-shrink-0"
                            />
                            <span>
                                <strong className="font-semibold text-slate-800">{issue.section}:</strong>{" "}
                                {issue.problem}
                            </span>
                        </li>
                    ))
                )}
            </ul>

            <p className="border-t border-slate-200/70 pt-3 text-xs text-slate-400">
                Want a better score? Improve your resume by applying the suggestions listed below.
            </p>
        </section>
    );
}