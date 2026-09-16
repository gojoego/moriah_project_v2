import Link from "next/link";
import { notFound } from "next/navigation";
import { ApiError } from "@/lib/api/client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { EditPostButton } from "@/components/posts/EditPostButton";

import { fetchPostById } from "@/lib/api/posts";

import { ROUTES } from "@/constants/routes";


export default async function PostDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    let post;

    try {
        post = await fetchPostById(id);
    } catch (error) {
        if (error instanceof ApiError && error.status === 404) {
            notFound();
        }

        throw error;
    }

    const dateLabel = new Date(post.created_at).toLocaleDateString(
        undefined,
        {
            year: "numeric",
            month: "long",
            day: "numeric",
        }
    );

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

                    <EditPostButton
                        postId={post.id}
                        authorId={post.author_id}
                    />

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