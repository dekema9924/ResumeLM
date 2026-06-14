

import React from 'react'

type ButtonType = {
    text: string
    className?: string
    action?: () => void
    disabled?: boolean
}

function Btn({ text, className, action, disabled }: ButtonType) {
    return (
        <button disabled={disabled} onClick={action} className={`${className} flex bg-linear-to-b from-[#9AA2FC] to-[#6F7AF2] rounded-full px-4 text-white text-xs font-meduim shadow-sm w-fit h-8 items-center  justify-center gap-1 cursor-pointer`}>
            {text}
        </button>
    )
}

export default Btn
