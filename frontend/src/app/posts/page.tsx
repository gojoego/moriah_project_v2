"use client";

import { useEffect, useState } from "react";
import { PostList } from "@/components/posts/PostList";
import { Post } from "@/types/post";
import { fetchPosts } from "@/lib/api";

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
        return <div className="text-center py-12 text-red-500">Error: {error}</div>;
    }

    return (
        <main className="max-w-4xl mx-auto py-12 px-4">
            <header className="mb-6">
                <h1 className="text-3xl font-bold">
                    stories
                </h1> 
                <p className="mt-2 text-sm text-slate-400">
                    recent posts 
                </p>               
            </header>

            <PostList posts={posts} />
        </main>
    )
}