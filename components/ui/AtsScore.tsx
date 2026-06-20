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
            <section className='flex flex-col bg-linear-to-b from-green-100/60 to-green-100/10 mt-10 p-4 shadow-2xl rounded-2xl gap-4'>
                <p className='text-sm text-gray-400'>Analyzing resume...</p>
            </section>
        );
    }

    const atsIssues = (findResume.atsIssues as AtsIssue[] | null) ?? [];

    return (
        <section className='flex flex-col bg-linear-to-b from-green-100/60 to-green-100/10 mt-10 p-4 shadow-2xl rounded-2xl gap-4'>
            <div className='mt-22 flex items-center gap-2'>
                <div className='w-10 bg-linear-to-b from-teal-400 to-teal-800 h-10 rounded-md flex items-center justify-center'>
                    <LaptopMinimalCheck color='white' />
                </div>
                <p className='text-xl font-bold'>
                    ATS Score <span>-</span> {findResume.atsScore ?? '--'}/100
                </p>
            </div>

            <p>How well does your resume pass through Applicant Tracking Systems?</p>

            <span className='text-[#475467] text-sm'>
                Your resume was scanned like an employer would. Here's how it performed
            </span>

            <ul className='flex flex-col gap-2'>
                {atsIssues.length === 0 ? (
                    <li className='flex gap-1 items-center'>
                        <CircleCheck color='green' />
                        No major ATS issues detected
                    </li>
                ) : (
                    atsIssues.map((issue, i) => (
                        <li key={`${issue.section}-${i}`} className='flex gap-1 items-center'>
                            <TriangleAlert color={severityColor[issue.severity]} />
                            <span>
                                <strong>{issue.section}:</strong> {issue.problem}
                            </span>
                        </li>
                    ))
                )}
            </ul>

            <span className='text-[#475467] text-sm'>
                Want a better score? Improve your resume by applying the suggestions listed below.
            </span>
        </section>
    );
}