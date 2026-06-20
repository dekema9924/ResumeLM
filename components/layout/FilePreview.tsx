'use client'

import { Document, Page, pdfjs } from 'react-pdf'
import { useState } from 'react'
import 'react-pdf/dist/Page/TextLayer.css'
import 'react-pdf/dist/Page/AnnotationLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc =
    `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

export default function FilePreview({ url, width }: { url: string, width: number }) {
    const [numPages, setNumPages] = useState<number>()

    return (
        <Document
            file={url}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            onLoadError={(error) => console.error(error)}
        >
            <Page pageNumber={1} width={width} />
        </Document>
    )
}