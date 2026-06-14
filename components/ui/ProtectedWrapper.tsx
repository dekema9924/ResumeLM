'use client'

import { useIsLoggedIn } from "@/hooks/useIsLoggedIn"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import Loading from "@/Loadng"

export default function ProtectedWrapper({ children }: { children: React.ReactNode }) {
    const { isLoggedIn, loading } = useIsLoggedIn()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !isLoggedIn) {
            router.replace('/auth/sign-in')
        }
    }, [isLoggedIn, loading, router])

    if (loading) return <Loading />

    if (!isLoggedIn) return null


    return (
        <div>
            {children}
        </div>
    )
}
