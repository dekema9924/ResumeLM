'use client'

import { useEffect, useState } from "react";
import { authClient } from "@/lib/client/auth-client";

export const useIsLoggedIn = () => {
    const [session, setSession] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadSession = async () => {
            const { data } = await authClient.getSession();
            setSession(data);
            setLoading(false);
        };

        loadSession();
    }, []);

    return {
        isLoggedIn: !!session,
        session,
        loading,
    };
};