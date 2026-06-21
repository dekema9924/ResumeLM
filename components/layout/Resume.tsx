'use client'

import { useState, useRef, useEffect } from 'react'
import { EllipsisVertical, Trash2 } from 'lucide-react'
import FilePreview from './FilePreview'

type ResumeType = {
    company_name: string
    job_title: string
    previewUrl: string
    percentage: number
    onDelete?: () => void
    isDeleting?: boolean
}

export default function Resume({ company_name, job_title, previewUrl, onDelete, isDeleting }: ResumeType) {
    const [menuOpen, setMenuOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className="relative w-10/12 md:w-72 p-5 bg-white border border-blue-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 m-auto">

            {/* Header */}
            <div className="flex items-center justify-between gap-1">

                <div className="flex-1 pointer-events-none">
                    <h1 className="font-semibold text-lg text-gray-900 truncate">
                        {company_name}
                    </h1>

                    <span className="text-sm text-gray-500">
                        {job_title}
                    </span>
                </div>

                <div className="shrink-0 relative z-10" ref={menuRef}>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            setMenuOpen((o) => !o)
                        }}
                        className="p-1 rounded-md hover:bg-gray-100"
                        aria-label="Resume actions"
                        aria-haspopup="menu"
                        aria-expanded={menuOpen}
                    >
                        <EllipsisVertical className="h-5 w-5 text-gray-500" />
                    </button>

                    {menuOpen && (
                        <div
                            role="menu"
                            className="absolute right-0 mt-1 w-36 bg-white border border-gray-100 rounded-lg shadow-lg py-1 z-20"
                        >
                            <button
                                disabled={isDeleting}
                                type="button"
                                role="menuitem"
                                onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    setMenuOpen(false)
                                    onDelete?.()
                                }}
                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                                <Trash2 className="h-4 w-4" />
                                {isDeleting ? 'Deleting...' : 'Delete'}

                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* PDF Preview */}
            <div className="rounded-xl h-50 overflow-hidden border border-gray-100 shadow-sm bg-gray-50 pointer-events-none">
                <FilePreview url={previewUrl} width={360} />
            </div>

        </div>
    )
}