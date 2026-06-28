"use client";

import { useRouter } from "next/navigation";

import { removeToken } from "@/lib/auth"
import { Button } from "@/components/ui/Button";

export function LogoutButton() {
    const router = useRouter();

    const handleLogout = () => {
        removeToken();
        router.push(ROUTES.LOGIN);
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