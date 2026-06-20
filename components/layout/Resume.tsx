import CircularProgressBar from '../ui/CircularProgressBar'
import FilePreview from './FilePreview'


type ResumeType = {
    company_name: string
    job_title: string
    previewUrl: string
    percentage: number
}

export default function Resume({ company_name, job_title, previewUrl, percentage }: ResumeType) {
    return (
        <div className="w-10/12 md:w-72 p-5 bg-white border border-blue-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 m-auto">

            {/* Header */}
            <div className="flex items-start justify-between gap-3">

                <div className="flex-1">
                    <h1 className="font-semibold text-lg text-gray-900 truncate">
                        {company_name}
                    </h1>

                    <span className="text-sm text-gray-500">
                        {job_title}
                    </span>
                </div>

                <div className="shrink-0">
                    <CircularProgressBar percentage={percentage} />
                </div>
            </div>

            {/* Divider */}
            {/* <div className="my-4 h-px bg-gray-100" /> */}

            {/* PDF Preview */}
            <div className="rounded-xl h-50 overflow-hidden border border-gray-100 shadow-sm bg-gray-50">
                <FilePreview url={previewUrl} width={360} />
            </div>


        </div>
    )
}
