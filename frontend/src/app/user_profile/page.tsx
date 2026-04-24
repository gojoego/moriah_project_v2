"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Post } from "@/types/post";
import { User } from "@/types/user";
import { fetchMyPosts } from "@/lib/api";

export default function ProfilePage() {
    const router = useRouter();

    const [token] = useState<string | null>(() => {
        if (typeof window === "undefined") return null;
        return localStorage.getItem("token");
    });

    const isDemo = !token;

    const [user, setUser] = useState<User | null>(null);

    const [posts, setPosts] = useState<Post[]>([]);
    const [postsLoading, setPostsLoading] = useState(false);
    const [postsError, setPostsError] = useState<string | null>(null);

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (!token) return;

        const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

        fetch(`${apiBase}/api/users/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
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
    }, [token, router]);

useEffect(() => {
    if (!token) return;

    let isMounted = true;

    (async () => {
        try {
            if (isMounted) setPostsLoading(true);

            const data = await fetchMyPosts(token);

            if (isMounted) setPosts(data);
        } catch (err) {
            if (isMounted) setPostsError((err as Error).message);
        } finally {
            if (isMounted) setPostsLoading(false);
        }
    })();

    return () => {
        isMounted = false;
    };
}, [token]);

    const displayUser: User | null =
        user ??
        (isDemo
            ? {
                  displayName: "Demo User",
                  email: "demo@moriahproject.com",
                  birthday: "1990-01-01",
              }
            : null);

    const isLoadingUser = !!token && !user;

    if (typeof window === "undefined") return null;

    if (isLoadingUser) {
        return (
            <main className="flex min-h-screen items-center justify-center">
                <p className="text-sm text-muted-foreground">
                    Loading profile...
                </p>
            </main>
        );
    }

    if (!displayUser) return null;

    return (
        <main className="mx-auto max-w-2xl px-4 py-16">
            <div className="space-y-10">
                <div className="rounded-xl border border-border bg-muted/40 p-4 text-center text-sm text-muted-foreground">
                    The Moriah Project is currently in development mode.
                    {isDemo && " You are viewing a read-only demo profile."}
                </div>

                {/* PROFILE HEADER */}
                <header className="flex items-center gap-6">
                    <div className="flex h-28 w-28 items-center justify-center rounded-full bg-muted border border-border">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 text-muted-foreground"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm0 2c-3.33 0-6 1.67-6 3.75V20h12v-2.25C18 15.67 15.33 14 12 14z"
                            />
                        </svg>
                    </div>

                    <div className="space-y-1">
                        <h1 className="text-3xl font-semibold tracking-tight">
                            {displayUser.displayName}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {displayUser.email}
                        </p>
                    </div>
                </header>

                <section className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-xs uppercase tracking-wide text-muted-foreground">
                            Birthday
                        </label>

                        <input
                            type="date"
                            value={displayUser.birthday ?? ""}
                            onChange={(e) =>
                                setUser({
                                    ...displayUser,
                                    birthday: e.target.value,
                                })
                            }
                            className="w-full max-w-xs rounded-md border border-border bg-background px-3 py-2 text-sm disabled:opacity-70"
                            disabled={!isEditing || isDemo}
                        />
                    </div>

                    <div className="flex gap-6 text-sm">
                        <button
                            onClick={() =>
                                setIsEditing((prev) => !prev)
                            }
                            disabled={isDemo}
                            className="underline-offset-4 hover:underline disabled:opacity-50"
                        >
                            {isEditing ? "Cancel" : "Edit profile"}
                        </button>

                        <button
                            disabled={isDemo}
                            className="underline-offset-4 hover:underline disabled:opacity-50"
                        >
                            Reset password
                        </button>
                    </div>
                </section>

                <hr className="border-border" />

                <section className="space-y-3">
                    <h2 className="text-xl font-semibold">
                        Remembrances
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        Posts shared by {displayUser.displayName} will
                        appear here.
                    </p>

                    {postsLoading ? (
                        <div className="rounded-xl border border-border bg-muted/30 p-6 text-sm text-muted-foreground">
                            Loading posts...
                        </div>
                    ) : postsError ? (
                        <div className="rounded-xl border border-border bg-muted/30 p-6 text-sm text-red-600">
                            Failed to load posts.
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="rounded-xl border border-border bg-muted/30 p-6 text-sm text-muted-foreground">
                            No posts yet.

                            <button
                                onClick={() =>
                                    router.push("/posts/new")
                                }
                                className="mt-3 block text-sm underline"
                            >
                                Write your first remembrance
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {posts.map((post) => (
                                <article
                                    key={post.id}
                                    className="rounded-xl border border-border bg-background p-5"
                                >
                                    <h3 className="text-lg font-medium">
                                        {post.deceased_name}
                                    </h3>

                                    <p className="text-xs text-muted-foreground">
                                        {new Date(
                                            post.created_at
                                        ).toLocaleDateString()}
                                    </p>

                                    {post.background && (
                                        <p className="mt-3 text-sm text-muted-foreground">
                                            {post.background}
                                        </p>
                                    )}

                                    <p className="mt-3 text-sm">
                                        {post.content.length > 160
                                            ? `${post.content.slice(
                                                  0,
                                                  160
                                              )}...`
                                            : post.content}
                                    </p>
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}