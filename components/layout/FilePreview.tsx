'use client'

import { Document, Page } from 'react-pdf'
import { useState } from 'react'
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';



pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString()

export default function FilePreview({ url }: { url: string }) {
    const [numPages, setNumPages] = useState<number>()

    return (
        <div className="shadow-lg rounded-lg overflow-hidden h-70">
            <Document
                file={url}
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            >
                <Page pageNumber={1} width={300} />
            </Document>
        </div>
    )
}