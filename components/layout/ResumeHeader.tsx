

import Link from 'next/link'
import { ChevronRight, SkipBack } from 'lucide-react'
import UserAvatar from '../ui/UserAvatar'

function ResumeHeader({ job_title }: { job_title: string }) {
    return (
        <>
            <header className=' flex justify-between items-center shadow-2xl h-17 pl-10'>
                <div className='flex items-center gap-3'>
                    <Link className='w-fit h-9 flex items-center px-4 shadow-lg text-sm font-semibold' href={'/'}><SkipBack size={15} /> Back to homepage</Link>
                    <span className='text-gray-400 font-bold md:flex items-center gap-1 hidden capitalize'>{job_title} <ChevronRight /></span>
                    <p className='font-bold text-lg md:flex hidden'>Resume Review</p>
                </div>

                <UserAvatar />
            </header>
        </>
    )
}

export default ResumeHeader