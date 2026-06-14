'use client'

import { useRef } from "react";
import { ChangeEvent } from 'react';



type uploadType = {
    file: File | null
    setFile: React.Dispatch<React.SetStateAction<File | null>>
}


function UploadResume({ file, setFile }: uploadType) {
    const inputRef = useRef<HTMLInputElement>(null)


    //activate useref
    const handleInputClick = () => {
        inputRef.current?.click();
    }


    //assign file in usestate
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files && files.length > 0) {
            const selectedFile = files[0];
            const maxSize = 10 * 1024 * 1024; // 10 MB

            if (selectedFile.size > maxSize) {
                alert("File must be smaller than 10MB");
                setFile(null)

                if (inputRef.current) {
                    inputRef.current.value = "";
                }
                return;
            }
            setFile(selectedFile)
        }
    };

    return (
        <div onClick={handleInputClick} className="rounded-2xl bg-white w-11/12 mt-10 shadow-xl p-6">
            {/* Title */}
            <h2 className="text-lg font-medium text-gray-700 mb-4">
                Upload Resume
            </h2>

            {/* Dropzone Card */}
            <div className="relative cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50 py-16">

                {/* main icon */}
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-200 mb-4">
                    📄
                </div>

                {/* text */}
                <p className="text-gray-700 text-sm font-medium">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                </p>

                <p className="text-gray-400 text-xs mt-1">
                    PDF, DOC, DOCX (max. 10MB)
                </p>

                <input accept=".pdf, .doc, .docx, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document
                "typeof="pdf" onChange={handleFileChange} className="hidden" ref={inputRef} type="file" name="resume-file" />
                <span>{file?.name}</span>


                {/* small floating file icon */}
                <div className="absolute right-4 top-4 w-8 h-8 bg-white shadow rounded-md flex items-center justify-center">
                    📄
                </div>
            </div>
        </div>
    );
}


export default UploadResume