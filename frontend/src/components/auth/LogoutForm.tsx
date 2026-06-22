"use client";

import { useRouter } from "next/navigation";

import { removeToken } from "@/lib/auth"

export function LogoutButton() {
    const router = useRouter();

    const handleLogout = () => {
        removeToken();
        router.push("/auth/login");
    }

    return (
        <button
            type="button"
            onClick={handleLogout}
            className="px-4 py-2 rounded border"
        >
            Log Out
        </button>
    )
}