"use client"

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchPostById, updatePostById } from "@/lib/api";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { Button } from "@/components/ui/button";

export default function EditPostPage() {
    const router = useRouter();
    const params = useParams();
    
    const postId = params.id as string;

    const [deceased_name, setDeceasedName] = useState("");
    const [background, setBackground] = useState("");
    const [content, setContent] = useState("");

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    useEffect (() => {
        let isCurrent = true;

        async function loadPost(){
            setIsLoading(true);
            setError(null);

            try {
                const post = await fetchPostById(postId);

                if (!isCurrent) return;

                setDeceasedName(post.deceased_name);
                setBackground(post.background ?? "");
                setContent(post.content);
            } catch (error) {
                if (!isCurrent) return;

                if (error instanceof Error){
                    setError(error.message);
                } else {
                    setError("Failed to load post.");
                }
            } finally {
                if (isCurrent) {
                    setIsLoading(false);
                }
            }
        }

        if (postId) {
            loadPost();
        } else {
            setError("Invalid post is.");
            setIsLoading(false);
        }

        return () => {
            isCurrent = false;
        };
    }, [postId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError(null);

        if (isSubmitting) return;

        if (!deceased_name.trim() || !content.trim()) {
            setError("Please fill in all required fields.");
            return;
        }

        setIsSubmitting(true);

        try {
            const updatedPost = await updatePostById(postId, {
                deceased_name: deceased_name.trim(),
                content: content.trim(), 
                background: background.trim(),
            });

            router.push(`/posts/${updatedPost.id}`);
        } catch (error) {
            if (error instanceof Error) {
                if (
                    error.message === "Missing or invalid auth header" ||
                    error.message === "No token provided" ||
                    error.message === "Invalid token" ||
                    error.message === "Unauthorized"
                ) {
                    setError("Please log in to edit this post.");
                    return;
                }

                if (error.message === "Forbidden") {
                    setError("You can only edit posts that you created.");
                    return;
                }

                setError(error.message);
            } else {
                setError("Failed to update post.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <main className="mx-auto max-w-2xl px-4 py-8">
                <p className="text-sm text-muted-foreground">
                    Loading post...
                </p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="mx-auto max-w-2xl px-4 py-8 space-y-4">
                <p className="text-sm text-red-600 text-center">
                    {error}
                </p>
                <button
                    type="button"
                    onClick={() => router.push("/user_profile")}
                    className="px-4 py-2 rounded border"
                >
                    Back to profile
                </button>
            </main>
        )
    }

    return (
        <main className="mx-auto max-w-2xl px-4 py-8">
            <form 
                onSubmit={handleSubmit}
                className="space-y-8"
            >
                <header className="space-y-2 text-center">
                    <h1 className="text-3xl font-semibold">
                        Edit post 
                    </h1>
                    <p className="text-muted-foreground">
                        Update the message you shared with us.
                    </p>
                </header>
                <section className="form-section">
                    <div className="space-y-1">
                        <label

                            htmlFor="name"
                        >
                            name of the loved one you are writing to
                        </label>
                        <input 
                            type="text" 
                            className="form-input"
                            id="name"
                            value={deceased_name}
                            onChange={(e) => setDeceasedName(e.target.value)}
                            required
                            disabled= {isSubmitting}
                            
                        />
                    </div>
                    <div className="space-y-1">
                        <label
                            className="form-label" 
                            htmlFor="background"
                        >
                            Background or context
                        </label>
                        <textarea
                            value={background}
                            onChange={(e) => setBackground(e.target.value)}
                            rows={5}
                            className="form-textarea"
                            id="background"
                            disabled={isSubmitting}
                        />                            
                    </div>
                    <div>
                        <label 
                            htmlFor="content"
                            className="form-label"
                        >
                            What I wish I could say 
                        </label>

                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={5}
                            className="form-textarea"
                            required
                            id="content"
                            disabled={isSubmitting}
                        />                      
                    </div>
                </section>

                <ErrorMessage message={error} />

                <div className="flex gap-3">
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Saving..." : "Save changes"}
                    </Button>
                    
                    <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => router.push(`/posts/${postId}`)}
                        className="px-4 py-2 rounded border"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </main>
    );
}