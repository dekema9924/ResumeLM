'use client'
import { useContext, useState, createContext, SetStateAction } from "react";



type ContextType = {
    isUploadBtnClicked: boolean
    setUploadBtnClicked: React.Dispatch<React.SetStateAction<boolean>>
}

const UploadModalContext = createContext<ContextType>({
    isUploadBtnClicked: false,
    setUploadBtnClicked: () => { }
})



export const UploadMoadalProvider = ({ children }: { children: React.ReactNode }) => {
    const [isUploadBtnClicked, setUploadBtnClicked] = useState(false)
    return (
        <>
            <UploadModalContext.Provider value={{ isUploadBtnClicked, setUploadBtnClicked }}>
                {children}

            </UploadModalContext.Provider>
        </>
    )
}


export const useUploadModal = () => {
    const context = useContext(UploadModalContext);

    if (!context) {
        throw new Error("useUploadModal must be used within UploadModalProvider");
    }

    return context;
};

