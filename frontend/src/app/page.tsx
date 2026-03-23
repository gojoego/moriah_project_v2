"use client";

import Link from "next/link";
import { PostList } from "@/components/posts/PostList";
import { useEffect, useState } from "react";
import { Post } from "@/types/post";
import { fetchPosts } from "@/lib/api";

export default function HomePage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadTopPosts() {
        try {
            const posts = await fetchPosts(5);
            setPosts(posts);
        } catch (err: unknown) {
            if (err instanceof Error) {
            setError(err.message);
            } else {
            setError("something went wrong");
            }
        } finally {
            setLoading(false);
        }
        }
        loadTopPosts();
    }, []);

    if (loading) return <div className="text-center py-12">Loading recent posts...</div>;
    
    if (error) {
        return (
            <div className="text-center py-12 space-y-4">
                <p className="text-red-500 text-lg font-medium">
                    We could not load sotries right now... Sorry! 
                </p>
                <p className="text-sm text-muted-foreground">
                    Please try again in a moment. 
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 border rounded-lg hover:bg-slate-100 transition"
                >
                    Retry
                </button>
            </div>
        )
    }

    return (
        <main className="mx-auto max-w-3xl space-y-8 px-4">
        <header className="space-y-4 text-center">
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
            Welcome to the Moriah Project 
            </h1>
            <p className="text-muted-foreground text-2xl">
            write a message to someone you have lost to suicide 
            </p>
            <div className="flex flex-col items-center gap-3">
            <Link
                href={`/posts/${posts[0]?.id}`}
                className="px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800"
            >
                Read an Example
            </Link>

            <p className="text-sm text-muted-foreground">
                Writing your own message coming soon
            </p>
            </div>
        </header>

        <section className="space-y-4">
            <h2 className="text-2xl font-medium text-center">How This Works…</h2>

            <ol className="space-y-2 text-muted-foreground text-xl list-decimal list-inside">
            <li>
                provide some details about the individual — give as much context as you want
            </li>
            <li>
                tell us what you wish you could say to this individual
            </li>
            </ol>

            <div className="flex flex-col gap-2 text-center">
            <Link href="/posts/1ceb0a50-2380-4a83-a87f-d24d2d16b78b" className="text-lg font-medium underline-offset-4 hover:underline">
                here is the example: the first post
            </Link>

            <Link href="/community_guidelines" className="text-lg font-medium underline-offset-4 hover:underline">
                here are some guidelines for posting
            </Link>
            </div>
        </section>

        <section className="space-y-4">
            <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">
                recent stories
            </h2>
            <Link href="/posts" className="moriah-link text-sm">
                View all →
            </Link>
            </div>

            <PostList posts={posts} />
        </section>
        </main>
    );
}