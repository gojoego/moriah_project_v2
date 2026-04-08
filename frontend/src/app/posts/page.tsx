"use client";

import { useEffect, useState } from "react";
import { PostList } from "@/components/posts/PostList";
import { Post } from "@/types/post";
import { fetchPosts } from "@/lib/api";
import { ErrorState } from "@/components/ui/ErrorState";
import Link from "next/link";

export default function PostsPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadPosts() {
            try {

                const posts = await fetchPosts();

                setPosts(posts);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Something went wrong");
                }
            } finally {
                setLoading(false);
            }
        }
        loadPosts();
    }, []);

    if (loading) {
        return <div className="text-center py-12">Loading posts...</div>;
    }

    if (error) {
        function loadPosts(): void {
            throw new Error("Function not implemented.");
        }

        return (
            <ErrorState
                message="cannot load stories right now"
                onRetry={loadPosts}
            />
        )
    }

    return (
        <main className="max-w-4xl mx-auto py-12 px-4">
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">
                        stories
                    </h1> 
                    <p className="mt-2 text-sm text-slate-400">
                        recent posts 
                    </p>                      
                </div>
                <Link
                    href={`/posts/new`}
                    className="px-5 py-2.5 bg-primary text-white rounded-md hover:opacity-90"
                >
                    Write a message
                </Link>                
            </header>

            <PostList posts={posts} />
        </main>
    )
}