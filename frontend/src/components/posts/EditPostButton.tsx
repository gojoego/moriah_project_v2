"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { getCurrentUser } from "@/lib/api/users";

import { CurrentUser } from "@/types/auth";

interface EditPostButtonProps {
    postId: string;
    authorId: string;
}

export function EditPostButton({
    postId,
    authorId,
}: EditPostButtonProps) {
    const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isCurrent = true;

        async function loadCurrentUser() {
            try {
                const user = await getCurrentUser();

                if (isCurrent) {
                    setCurrentUser(user);
                }
            } catch {
                if (isCurrent) {
                    setCurrentUser(null);
                }
            } finally {
                if (isCurrent) {
                    setIsLoading(false);
                }
            }
        }

        loadCurrentUser();

        return () => {
            isCurrent = false;
        };
    }, []);

    if (isLoading) {
        return null;
    }

    const isOwner = currentUser?.id === authorId;

    if (!isOwner) {
        return null;
    }

    return (
        <Button
            asChild
            variant="outline"
            size="sm"
        >
            <Link href={`/posts/${postId}/edit`}>
                Edit remembrance
            </Link>
        </Button>
    );
}