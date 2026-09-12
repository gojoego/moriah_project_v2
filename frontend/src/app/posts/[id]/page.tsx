"use client";

import {
    useEffect,
    useState,
} from "react";

import Link from "next/link";
import {
    useParams,
    useRouter,
} from "next/navigation";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { fetchPostById } from "@/lib/api/posts";
import { getCurrentUser } from "@/lib/api/users";

import { Post } from "@/types/post";
import { User } from "@/types/user";

import { ROUTES } from "@/constants/routes";


export default function PostDetailPage() {
    const params = useParams();
    const router = useRouter();

    const postId = params.id as string;

    const [post, setPost] = useState<Post | null>(null);
    const [user, setUser] = useState<User | null>(null);

    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);


    useEffect(() => {
        let isCurrent = true;

        async function loadPost() {
            try {

                const postData = await fetchPostById(postId);

                if (!isCurrent) {
                    return;
                }

                setPost(postData);

                try {
                    const currentUser = await getCurrentUser();

                    if (isCurrent) {
                        setUser(currentUser);
                    }
                } catch {

                }

            } catch {
                if (isCurrent) {
                    setLoadError("Failed to load remembrance.");
                }
            } finally {
                if (isCurrent) {
                    setIsLoading(false);
                }
            }
        }

        if (postId) {
            loadPost();
        } else {
            setLoadError("Invalid remembrance id.");
            setIsLoading(false);
        }

        return () => {
            isCurrent = false;
        };
    }, [postId]);

    if (isLoading) {
        return (
            <main className="mx-auto max-w-3xl px-4 py-8">
                <p className="text-sm text-muted-foreground">
                    Loading remembrance...
                </p>
            </main>
        );
    }

    if (loadError || !post) {
        return (
            <main className="mx-auto max-w-3xl space-y-4 px-4 py-8">
                <p className="text-center text-sm text-destructive">
                    {loadError ?? "Remembrance not found."}
                </p>

                <div className="flex justify-center">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.push(ROUTES.POSTS)}
                    >
                        Back to stories
                    </Button>
                </div>
            </main>
        );
    }


    const dateLabel = new Date(post.created_at).toLocaleDateString(
        undefined,
        {
            year: "numeric",
            month: "long",
            day: "numeric",
        }
    );

    const isOwner = user?.id === post.author_id;

    return (
        <main className="mx-auto max-w-3xl space-y-8 px-4 py-8">

            <Link
                href={ROUTES.POSTS}
                className="moriah-link text-sm"
            >
                ← Back to stories
            </Link>

            <header className="space-y-3">
                <div className="flex items-start justify-between gap-4">

                    <div>
                        <h1 className="text-4xl tracking-tight md:text-5xl">
                            {post.deceased_name}
                        </h1>

                        <p className="moriah-muted mt-2 text-sm">
                            {dateLabel}
                        </p>
                    </div>

                    {isOwner && (
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() =>
                                router.push(`/posts/${post.id}/edit`)
                            }
                        >
                            Edit post
                        </Button>
                    )}

                </div>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">
                        Background
                    </CardTitle>
                </CardHeader>

                <CardContent className="whitespace-pre-line">
                    <p className="leading-relaxed">
                        {post.background}
                    </p>
                </CardContent>
            </Card>


            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">
                        What I wish I could say to {post.deceased_name}
                    </CardTitle>
                </CardHeader>

                <CardContent className="whitespace-pre-line">
                    <p className="leading-relaxed">
                        {post.content}
                    </p>
                </CardContent>
            </Card>

        </main>
    );
}