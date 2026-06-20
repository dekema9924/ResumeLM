'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { AtSign } from "lucide-react";
import { Folder } from "lucide-react";
import { MailOpen } from "lucide-react";
import ResendButton from "@/components/ui/ResendButton";
import { useEffect } from "react";
import { authClient } from "@/lib/client/auth-client";

export default function CheckEmailClient() {
    const params = useSearchParams();
    const email = params.get("email");
    const router = useRouter();


    if (!email) return null;

    useEffect(() => {
        let interval: NodeJS.Timeout;

        const check = async () => {
            const session = await authClient.getSession();

            if (session.data?.user.emailVerified) {
                clearInterval(interval);
                router.push("/");
            }
        };

        interval = setInterval(check, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="hero  flex min-h-screen items-center justify-center bg-background p-4">
            <div className="relative w-full max-w-115 overflow-hidden rounded-2xl border border-gray-300 shadow-2xl bg-card px-11 py-10 bg-white">
                {/* Decorative circles */}
                <div className="pointer-events-none absolute -right-15 -top-15 h-44 w-44 rounded-full border border-border bg-muted" />
                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full border border-border/60 bg-muted" />

                {/* Icon */}
                <div className="mb-7 flex h-13 w-13 items-center justify-center rounded-xl border border-border bg-muted">
                    <MailOpen className="h-6 w-6 text-foreground" />
                </div>

                {/* Step indicator */}
                <p className="mb-2 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                    Step 2 of 3
                </p>
                <div className="mb-7 flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className={`h-1.5 w-1.5 rounded-full ${i < 2 ? "bg-foreground" : "bg-border"}`}
                        />
                    ))}
                </div>

                <h1 className="mb-4 font-serif text-[28px] font-normal leading-tight">
                    Check your <em>inbox</em>
                </h1>

                <p className="mb-7 text-sm font-light leading-relaxed text-muted-foreground">
                    We've sent a verification link to confirm your email address and
                    activate your account.
                </p>

                {email && (
                    <div className="mb-7 inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3.5 py-1.5 text-[13px] font-medium">
                        <AtSign className="h-3.5 w-3.5 text-muted-foreground" />
                        {email}
                    </div>
                )}

                <hr className="mb-6 border-border" />

                <p className="flex items-start gap-2 text-[12.5px] leading-relaxed text-muted-foreground/70">
                    <Folder className="mt-0.5 h-4 w-4 shrink-0" />
                    Can't find it? Check your spam or promotions folder — it sometimes
                    ends up there.
                </p>

                <ResendButton email={email} />
            </div>
        </div>
    );
}