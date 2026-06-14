import CircularProgressBar from '../ui/CircularProgressBar'
import FilePreview from './FilePreview'


type ResumeType = {
    company_name: string
    job_title: string
    // percentage: number
}

export default function Resume({ company_name, job_title }: ResumeType) {
    return (
        <div className='w-90 h-100  p-5 bg-white border border-blue-100 md:border-0 rounded-2xl m-auto'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl'>{company_name}</h1>
                    <span className='text-md text-gray-600'>{job_title}</span>
                </div>

                <CircularProgressBar percentage={30} />

            </div>




            <FilePreview url='https://itdwcxtstaygnnvtgrwc.supabase.co/storage/v1/object/sign/resume-files/Sid6gCJ5BGc3eS5bqpOayuHX4V8liDcf/1781415460027_AI_Resume_Guide.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84MjQ1MzE1MS1iMWVjLTQyZGQtOGM0ZS0xY2ZjMmNhNzg3YzUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyZXN1bWUtZmlsZXMvU2lkNmdDSjVCR2MzZVM1YnFwT2F5dUhYNFY4bGlEY2YvMTc4MTQxNTQ2MDAyN19BSV9SZXN1bWVfR3VpZGUucGRmIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4MTQxNTQ2MCwiZXhwIjoxNzgxNDE5MDYwfQ.8ndVE30Jzt5O7I97JszO5lc4AHYwGOR9rABgmItT0NE' />
        </div>
    )
}
