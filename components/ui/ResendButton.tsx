"use client";
import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { resendVerificationEmail } from "@/lib/server/auth-actions";



function ResendButton(email: { email: string }) {
    const [seconds, setSeconds] = useState(0);

    const start = () => {
        setSeconds(60);
        const iv = setInterval(() => {
            setSeconds((s) => {
                if (s <= 1) { clearInterval(iv); return 0; }
                return s - 1;
            });
        }, 1000);
    };


    return (
        <div className="mt-6 flex items-center justify-between">

            <button
                onClick={() => (start(), resendVerificationEmail(email.email))}
                disabled={seconds > 0}
                className="flex border border-gray-300 px-6 h-6 rounded-xl cursor-pointer items-center gap-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground disabled:cursor-default disabled:opacity-40"
            >
                <RefreshCw className="h-3.5 w-3.5" />
                Resend email
            </button>
            {seconds > 0 && (
                <span className="text-xs tabular-nums text-muted-foreground/60">
                    Resend in {seconds}s
                </span>
            )}
        </div>
    );
}


export default ResendButton