"use client";

import Link from "next/link";
import { PostList } from "@/components/posts/PostList";
import { useEffect, useState } from "react";
import { Post } from "@/types/post";
import { fetchPosts } from "@/lib/api";
import { ErrorState } from "@/components/ui/ErrorState";

export default function HomePage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function loadTopPosts() {
        setLoading(true);
        setError(null);

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

    useEffect(() => {
        loadTopPosts();
    }, []);

    const hasPosts = posts.length > 0;

    function renderContent() {
        if (loading) {
            return (
                <div className="text-center py-8 text-muted-foreground">
                    Loading stories... 
                </div>
            );
        } 
        
        if (error) {
            return <ErrorState onRetry={loadTopPosts} />
        }

        return <PostList posts={posts} />;      
    }


    return (
        <main className="mx-auto max-w-3xl space-y-8 px-4">
        <header className="space-y-4 text-center">
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
            Welcome to the Moriah Project 
            </h1>
            <p className="text-muted-foreground text-2xl">
            a place to share what you wish you could say to someone who has passed from suicide 
            </p>
            <div className="flex flex-col items-center gap-3">

            {!loading && (
                hasPosts ? (
                    <Link
                        href={`/posts/new`}
                        className="px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800"
                    >
                        Write a message
                    </Link>
                ) : (
                    <Link
                        href="/posts"
                        className="px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800"
                    >
                        Browse examples
                    </Link>               
                )                
            )}
            </div>
        </header>

        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold tracking-tight">
                    recent stories
                </h2>
                <Link href="/posts" className="moriah-link text-sm">
                    View all →
                </Link>
            </div>
            {renderContent()}
        </section>

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

            <Link href="/community_guidelines" className="text-lg font-medium underline-offset-4 hover:underline">
                here are some guidelines for posting
            </Link>
            </div>
        </section>
        </main>
    );
}