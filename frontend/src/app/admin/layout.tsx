"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getCurrentUser } from "@/lib/api";

import { ROUTES } from "@/constants/routes";

export default function AdminLayout({
    children,
}: {
    children: ReactNode;
}) {
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        async function checkAdminAccess() {
            try {
                const user = await getCurrentUser();

                if (user.role !== "admin") {
                    router.replace("/");
                    return;
                }

                setAuthorized(true);
            } catch {
                router.replace(ROUTES.LOGIN);
            } finally {
                setLoading(false);
            }
        }

        checkAdminAccess();
    }, [router]);

    if (loading) {
        return null;
    }

    if (!authorized) {
        return null;
    }

    return children;
}