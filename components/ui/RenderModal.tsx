'use client'

import { useUploadModal } from "@/context/ModalContext";
import BgOverlay from './BgOverlay';
import ResumeModal from '../layout/ResumeModal';
import { useEffect } from "react";


export default function RenderModal() {

    const { isUploadBtnClicked } = useUploadModal()

    useEffect(() => {
        if (isUploadBtnClicked) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isUploadBtnClicked]);


    return isUploadBtnClicked ? (
        <>
            <BgOverlay />
            <ResumeModal />
        </>
    ) : null;
}
