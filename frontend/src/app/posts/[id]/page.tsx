import Link from "next/link";
import { notFound } from "next/navigation";

import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";

import { mockPosts } from "@/lib/mockPosts";

/** const post = await fetch(`${API_URL}/posts/${params.id}`) */


/**
 dynamic route page Folder name: [id]
 * URL pattern: /posts/:id
 *
 * Next.js automatically passes route params as props:
 * params.id is the value from the URL (string)
 */

export default async function PostDetailPage(promise: {
    params: Promise<{id: string}>;
}) {

    const {id} = await promise.params;

    const post = mockPosts.find((p) => p.id === id);

    if (!post){
        notFound();
    }

    const dateLabel = new Date(post.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <main className="space-y-6">
            <Link href="/posts" className="moriah-link text-sm">
                ← Back to stories
            </Link>

            <header className="space-y-2">
                <h1 className="text-3xl font-semibold tracking-tight">
                    {post.deceasedName}
                </h1>
                <p className="moriah-muted text-sm">
                    {dateLabel}
                </p>
            </header>

            <Card className="moriah-card">
                <CardHeader>
                    <CardTitle className="text-lg">
                        Background
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="leading-relaxed text-foreground/90">
                        {post.background}
                    </p>
                </CardContent>
            </Card>

            <Card>
            <CardHeader>
                <CardTitle className="text-lg">
                What I wish I could say to {post.deceasedName}
                </CardTitle>
            </CardHeader>
            <CardContent className="leading-relaxed text-foreground/90 whitespace-pre-line">
                {post.content}
            </CardContent>
            </Card>

        </main>
    )
}