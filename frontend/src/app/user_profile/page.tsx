"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchMyPosts } from "@/lib/api";
import { Post } from "@/types/post";
import { User } from "@/types/user";

export default function ProfilePage() {
    const router = useRouter();

    const mounted = typeof window !== "undefined";

    const [user, setUser] = useState<User | null>(null);

    const [posts, setPosts] = useState<Post[]>([]);
    const [postsError, setPostsError] = useState<string | null>(null);

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (!mounted) return;

        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/auth/login");
            return;
        }

        const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

        fetch(`${apiBase}/api/users/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error("Unauthorized");
                return res.json();
            })
            .then((data: User) => {
                setUser(data);
            })
            .catch(() => {
                router.push("/auth/login");
            });
    }, [mounted, router]);

    useEffect(() => {
        if (!mounted) return;

        const token = localStorage.getItem("token");
        if (!token) return;

        fetchMyPosts(token)
            .then((data) => setPosts(data))
            .catch((err: Error) => setPostsError(err.message));
    }, [mounted]);

    if (!mounted) {
        return null;
    }

    if (!user) {
        return (
            <main className="flex min-h-screen items-center justify-center">
                <p className="text-sm text-muted-foreground">
                    Loading profile...
                </p>
            </main>
        );
    }

    return (
        <main className="mx-auto max-w-2xl px-4 py-16">
            <div className="space-y-10">

                {/* Header */}
                <header className="flex items-center gap-6">
                    <div className="flex h-28 w-28 items-center justify-center rounded-full bg-muted border border-border">
                        <span className="text-muted-foreground text-lg">
                            👤
                        </span>
                    </div>

                    <div>
                        <h1 className="text-3xl font-semibold">
                            {user.displayName}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {user.email}
                        </p>
                    </div>
                </header>

                {/* Profile Settings */}
                <section className="space-y-6">
                    <div>
                        <label className="text-xs uppercase text-muted-foreground">
                            Birthday
                        </label>

                        <input
                            type="date"
                            value={user.birthday ?? ""}
                            onChange={(e) =>
                                setUser({
                                    ...user,
                                    birthday: e.target.value,
                                })
                            }
                            className="block mt-1 border p-2 rounded"
                            disabled={!isEditing}
                        />
                    </div>

                    <button
                        onClick={() => setIsEditing((prev) => !prev)}
                        className="underline"
                    >
                        {isEditing ? "Cancel" : "Edit profile"}
                    </button>
                </section>

                <hr />

                {/* Posts */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">
                        Remembrances
                    </h2>

                    {postsError && (
                        <p className="text-red-600">
                            Failed to load posts
                        </p>
                    )}

                    {posts.length === 0 ? (
                        <p className="text-muted-foreground">
                            No posts yet.
                        </p>
                    ) : (
                        posts.map((post) => (
                            <div
                                key={post.id}
                                className="border p-4 rounded"
                            >
                                <h3 className="font-medium">
                                    {post.deceased_name}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {post.content}
                                </p>
                            </div>
                        ))
                    )}
                </section>
            </div>
        </main>
    );
}