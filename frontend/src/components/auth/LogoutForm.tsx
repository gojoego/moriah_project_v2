"use client";

import { useRouter } from "next/navigation";

import { removeToken } from "@/lib/auth"
import { Button } from "../ui/button";

export function LogoutButton() {
    const router = useRouter();

    const handleLogout = () => {
        removeToken();
        router.push("/auth/login");
    }

    return (
        <Button
            type="button"
            variant="outline"
            onClick={handleLogout}
        >
            Log Out
        </Button>
    )
}