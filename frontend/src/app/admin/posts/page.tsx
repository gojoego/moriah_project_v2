"use client";

import { useEffect, useState } from "react";
import { fetchAdminPosts } from "@/lib/api/admin";
import { AdminPost } from "@/types/admin";

export default function AdminPostsPage() {

    const [posts, setPosts] = useState<AdminPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        async function loadPosts() {

            try {

                const data = await fetchAdminPosts();

                setPosts(data);

            } catch (err) {

                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Failed to load posts");
                }

            } finally {

                setLoading(false);

            }
        }


        loadPosts();

    }, []);



    if (loading) {
        return (
            <div>
                Loading posts...
            </div>
        );
    }



    if (error) {
        return (
            <div>
                Error: {error}
            </div>
        );
    }



    return (

        <main className="p-8">

            <h1 className="text-3xl font-bold mb-6">
                Posts
            </h1>


            <div className="space-y-4">

                {posts.map((post) => (

                    <div
                        key={post.id}
                        className="border rounded-lg p-4"
                    >

                        <div className="flex justify-between mb-2">

                            <h2 className="font-semibold">
                                {post.deceased_name}
                            </h2>


                            <span>
                                {post.status}
                            </span>

                        </div>


                        <p className="text-sm text-gray-600">
                            By: {post.author_name}
                        </p>


                        <p className="mt-3">
                            {post.content}
                        </p>


                        <p className="text-xs text-gray-500 mt-3">
                            {new Date(post.created_at).toLocaleDateString()}
                        </p>

                    </div>

                ))}

            </div>

        </main>

    );
}