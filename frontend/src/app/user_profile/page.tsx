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

import { useAuth } from "@/hooks/useAuth";

import { Post } from "@/types/post";

import { PostList } from "@/components/posts/PostList";
import { LogoutButton } from "@/components/auth/LogoutForm";
import { Button } from "@/components/ui/button";
import { DisplayNameEditor } from "@/components/profile/DisplayNameEditor";

import { ROUTES } from "@/constants/routes";

export default function ProfilePage() {
    const router = useRouter();

    const {
        user,
        isLoading,
        isAuthenticated,
        refreshUser,
    } = useAuth();

    const [posts, setPosts] = useState<Post[]>([]);
    const [postsError, setPostsError] =
        useState<string | null>(null);

    useEffect(() => {
        if (isLoading) {
            return;
        }

        if (!isAuthenticated) {
            router.replace(ROUTES.LOGIN);
            return;
        }

        async function loadPosts() {
            try {
                setPostsError(null);

                const result = await fetchMyPosts();

                setPosts(result);
            } catch (error) {
                if (error instanceof Error) {
                    setPostsError(error.message);
                } else {
                    setPostsError(
                        "Failed to load remembrances."
                    );
                }
            }
        }

        void loadPosts();
    }, [
        isLoading,
        isAuthenticated,
        router,
    ]);

    const handleDeletePost = async (
        postId: string
    ) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this remembrance?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await deletePostById(postId);

            setPosts((currentPosts) =>
                currentPosts.filter(
                    (post) => post.id !== postId
                )
            );
        } catch (error) {
            if (error instanceof Error) {
                setPostsError(error.message);
            } else {
                setPostsError(
                    "Failed to delete remembrance."
                );
            }
        }
    };

    if (isLoading || !user) {
        return (
            <div className="flex min-h-screen items-center justify-center px-6">
                <p className="text-sm text-muted-foreground">
                    Loading profile...
                </p>
            </div>
        );
    }

    return (
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:px-8">
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
                            <DisplayNameEditor
                                user={user}
                                onUserUpdated={() => {
                                    void refreshUser();
                                }}
                            />
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
                            onClick={() =>
                                router.push(ROUTES.NEW_POST)
                            }
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
                                When you share a remembrance,
                                it will appear here so you can
                                return to it later.
                            </p>

                            <Button
                                className="mt-6"
                                onClick={() =>
                                    router.push(
                                        ROUTES.NEW_POST
                                    )
                                }
                            >
                                Share a remembrance
                            </Button>
                        </div>
                    ) : (
                        <PostList
                            posts={posts}
                            currentUserId={user.id}
                            showOwnerActions
                            onDeletePost={
                                handleDeletePost
                            }
                        />
                    )}
                </section>
            </div>
        </div>
    );
}