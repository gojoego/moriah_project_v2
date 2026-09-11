"use client";

import {
    useEffect,
    useState,
} from "react";

import { useRouter } from "next/navigation";

import {
    fetchMyPosts,
    deletePostById,
} from "@/lib/api/posts";

import {
    getCurrentUser,
} from "@/lib/api/users";

import { checkAuth } from "@/lib/auth";

import { Post } from "@/types/post";
import { User } from "@/types/user";

import { PostList } from "@/components/posts/PostList";
import { LogoutButton } from "@/components/auth/LogoutForm";
import { Button } from "@/components/ui/button";

import { ROUTES } from "@/constants/routes";


export default function ProfilePage() {
    const router = useRouter();

    const [user, setUser] = useState<User | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [postsError, setPostsError] = useState<string | null>(null);


    useEffect(() => {
        async function loadProfile() {
            const authenticated = await checkAuth();

            if (!authenticated) {
                router.replace(ROUTES.LOGIN);
                return;
            }

            try {
                const [userData, postsData] = await Promise.all([
                    getCurrentUser(),
                    fetchMyPosts(),
                ]);

                setUser(userData);
                setPosts(postsData);
            } catch (error) {
                if (error instanceof Error) {
                    setPostsError(error.message);
                } else {
                    setPostsError("Failed to load profile.");
                }
            }
        }

        loadProfile();
    }, [router]);


    const handleDeletePost = async (postId: string) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this remembrance?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await deletePostById(postId);

            setPosts((currentPosts) =>
                currentPosts.filter((post) => post.id !== postId)
            );
        } catch (error) {
            if (error instanceof Error) {
                setPostsError(error.message);
            } else {
                setPostsError("Failed to delete remembrance.");
            }
        }
    };


    if (!user) {
        return (
            <main className="flex min-h-screen items-center justify-center px-6">
                <p className="text-sm text-muted-foreground">
                    Loading profile...
                </p>
            </main>
        );
    }


    return (
        <main className="mx-auto w-full max-w-4xl px-6 py-16 md:px-8">
            <div className="space-y-12">
                <header>
                    <h1 className="font-display text-4xl md:text-5xl">
                        Welcome back, {user.displayName}
                    </h1>

                    <p className="mt-2 text-muted-foreground">
                        manage your stories
                    </p>
                </header>

                <section className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-border bg-muted">
                            <span className="text-lg text-muted-foreground">
                                👤
                            </span>
                        </div>

                        <div className="flex-1">
                            <h2 className="text-xl font-semibold">
                                {user.displayName}
                            </h2>

                            <p className="mt-1 text-sm text-muted-foreground">
                                {user.email}
                            </p>
                        </div>

                        <div className="sm:ml-auto">
                            <LogoutButton />
                        </div>

                    </div>
                </section>

                <section className="space-y-6">

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                        <div>
                            <h2 className="font-display text-3xl">
                                Your Story
                            </h2>

                            <p className="mt-1 text-sm text-muted-foreground">
                                remembrances you&apos;ve shared
                            </p>
                        </div>

                        <Button
                            onClick={() => router.push("/posts/new")}
                        >
                            New Post
                        </Button>

                    </div>


                    {postsError && (
                        <p className="text-sm text-destructive">
                            {postsError}
                        </p>
                    )}


                    {posts.length === 0 ? (
                        <div className="rounded-xl border border-border bg-card px-6 py-12 text-center text-card-foreground">

                            <h3 className="text-lg font-semibold">
                                No remembrances yet
                            </h3>

                            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                                When you share a remembrance, it will appear
                                here so you can return to it later.
                            </p>

                            <Button
                                className="mt-6"
                                onClick={() => router.push("/posts/new")}
                            >
                                Share a remembrance
                            </Button>

                        </div>
                    ) : (
                        <PostList
                            posts={posts}
                            currentUserId={user.id}
                            showOwnerActions
                            onDeletePost={handleDeletePost}
                        />
                    )}

                </section>

            </div>
        </main>
    );
}