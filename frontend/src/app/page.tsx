"use client";

import Image from "next/image";
import Link from "next/link";

import {
    useEffect,
    useState,
} from "react";

import { PostList } from "@/components/posts/PostList";
import { ErrorState } from "@/components/ui/ErrorState";

import { Post } from "@/types/post";
import { CurrentUser } from "@/types/auth";

import { fetchPosts } from "@/lib/api/posts";
import { getCurrentUser } from "@/lib/api/users";

import { ROUTES } from "@/constants/routes";


export default function HomePage() {

    const [posts, setPosts] = useState<Post[]>([]);
    const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    async function loadRecentPosts() {
        setLoading(true);
        setError(null);

        try {
            const recentPosts = await fetchPosts(5);

            setPosts(recentPosts);

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


    async function loadCurrentUser() {
        try {
            const user = await getCurrentUser();

            setCurrentUser(user);

        } catch {
            setCurrentUser(null);
        }
    }


    useEffect(() => {

        async function loadHomePageData() {
            await Promise.allSettled([
                loadRecentPosts(),
                loadCurrentUser(),
            ]);
        }

        loadHomePageData();

    }, []);


    const hasPosts = posts.length > 0;


    function renderRecentStories() {

        if (loading) {
            return (
                <div className="py-8 text-center font-sans text-muted-foreground">
                    Loading stories...
                </div>
            );
        }


        if (error) {
            return (
                <ErrorState
                    onRetry={loadRecentPosts}
                />
            );
        }


        return (
            <PostList
                posts={posts}
                currentUserId={currentUser?.id}
            />
        );
    }


    return (
        <>
            <section className="bg-background text-foreground">

                <div
                    className="
                        mx-auto
                        flex
                        min-h-[500px]
                        w-full
                        max-w-5xl
                        flex-col
                        items-center
                        justify-center
                        px-6
                        text-center
                        md:min-h-[560px]
                        md:px-8
                    "
                >

                    <header className="space-y-6">
                        <h1
                            className="
                                font-display
                                text-4xl
                                leading-[1.05]
                                tracking-tight
                                sm:text-5xl
                                md:text-7xl
                            "
                        >
                            Welcome to the
                            <br />
                            Moriah Project
                        </h1>


                        <Image
                            src="/moriah-icon.svg"
                            alt=""
                            width={48}
                            height={48}
                            className="mx-auto"
                        />


                        <p
                            className="
                                mx-auto
                                max-w-xl
                                font-sans
                                text-lg
                                leading-relaxed
                                opacity-80
                                md:text-xl
                            "
                        >
                            a place to share what you wish you could say
                            to someone who has passed from suicide
                        </p>


                        <div className="flex flex-col items-center gap-3">

                            {!loading && (
                                hasPosts ? (

                                    <Link
                                        href={ROUTES.NEW_POST}
                                        className="
                                            rounded-md
                                            bg-primary
                                            px-8
                                            py-3
                                            font-sans
                                            text-sm
                                            font-medium
                                            text-primary-foreground
                                            transition-opacity
                                            hover:opacity-90
                                        "
                                    >
                                        Write a message →
                                    </Link>

                                ) : (

                                    <Link
                                        href={ROUTES.POSTS}
                                        className="
                                            rounded-md
                                            bg-primary
                                            px-8
                                            py-3
                                            font-sans
                                            text-sm
                                            font-medium
                                            text-primary-foreground
                                            transition-opacity
                                            hover:opacity-90
                                        "
                                    >
                                        Browse examples →
                                    </Link>
                                )
                            )}
                        </div>
                    </header>
                </div>
            </section>

            <section className="bg-secondary text-secondary-foreground">

                <div
                    className="
                        mx-auto
                        w-full
                        max-w-5xl
                        px-6
                        py-16
                        md:px-8
                    "
                >

                    <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

                        <h2
                            className="
                                font-display
                                text-4xl
                                leading-none
                                md:text-5xl
                            "
                        >
                            Recent stories
                        </h2>


                        <Link
                            href={ROUTES.POSTS}
                            className="
                                shrink-0
                                font-sans
                                text-sm
                                underline-offset-4
                                hover:underline
                            "
                        >
                            View all →
                        </Link>

                    </div>


                    {renderRecentStories()}

                </div>
            </section>

            <section className="bg-secondary text-secondary-foreground">
                <div className="mx-auto w-full max-w-5xl px-6 py-14 md:px-8 md:py-16">

                    <div className="mx-auto max-w-3xl space-y-8">

                        <h2
                            className="
                                text-center
                                font-display
                                text-3xl
                                leading-tight
                                sm:text-4xl
                            "
                        >
                            How This Works
                        </h2>

                        <ol
                            className="
                                space-y-5
                                font-sans
                                text-base
                                leading-relaxed
                                text-muted-foreground
                                sm:text-lg
                            "
                        >
                            <li className="flex gap-4">
                                <span className="font-medium text-secondary-foreground">
                                    1.
                                </span>

                                <span>
                                    provide some details about the individual —
                                    give as much context as you want
                                </span>
                            </li>

                            <li className="flex gap-4">
                                <span className="font-medium text-secondary-foreground">
                                    2.
                                </span>

                                <span>
                                    tell us what you wish you could say to this individual
                                </span>
                            </li>
                        </ol>

                        <div className="text-center">
                            <Link
                                href="/community_guidelines"
                                className="
                                    font-sans
                                    text-sm
                                    font-medium
                                    underline
                                    underline-offset-4
                                    transition-opacity
                                    hover:opacity-70
                                    sm:text-base
                                "
                            >
                                Read the community guidelines →
                            </Link>
                        </div>

                    </div>

                </div>
            </section>
        </>
    );
}