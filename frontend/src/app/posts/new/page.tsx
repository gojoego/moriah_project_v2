"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createPost } from "@/lib/api";

export default function NewPost(){
    const [deceasedName, setDeceasedName] = useState("");
    const [background, setBackground] = useState("");
    const [content, setContent] = useState("");

    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError(null);

        if (isSubmitting) return; 

        if (!deceasedName.trim() || !content.trim()) {
            setError("Please fill in all required fields.");
            return; 
        }

        setIsSubmitting(true);
        
        try {
            const result = await createPost({
                deceased_name: deceasedName.trim(),
                content: content.trim(),
                ...(background?.trim() ? { background: background.trim() } : {}),
            });

            router.push(`/posts/${result.post.id}`);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Something went wrong");
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <main className="mx-auto max-w-2xl px-4 py-8">
            <form
                onSubmit={handleSubmit}
                className="space-y-8"
            >
                <header className="space-y-2 text-center">
                    <h1 className="text-3xl font-semibold">
                        Write a message
                    </h1>               
                    <p>
                        share what you wish you could say
                    </p>     
                </header>

                <section className="form-section">
                    <div className="space-y-1">
                        <label className="form-label" htmlFor="name">
                            name of the loved one you are writing to
                        </label>
                        <input
                            type="text"
                            className="form-input"
                            id="name"
                            value={deceasedName}
                            onChange={(e) => setDeceasedName(e.target.value)}
                            required
                            disabled={isSubmitting}
                            placeholder="e.g. my friend, Moriah"
                        />                        
                    </div>

                    <div className="space-y-1">
                        <label className="form-label" htmlFor="background">
                            Background or context (optional)
                        </label>
                        <textarea 
                            value={background}
                            onChange={(e) => setBackground(e.target.value)}
                            rows={5}
                            className="form-textarea"
                            id="background"
                            disabled={isSubmitting} 
                            placeholder="who they were, your relationship with them"
                        />
                    </div>
                              
                    <div className="space-y-1">
                        <label className="form-label" htmlFor="content">
                        What I wish I could say
                        </label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={10}
                            className="form-textarea"
                            required
                            id="content"
                            disabled={isSubmitting}
                            placeholder="What do you wish you could've said to them before their passing?"
                        />
                    </div>
                </section>

                { error && (
                    <p className="text-sm text-red-600 text-center">
                        {error}
                    </p>
                )}
                    
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="form-button"
                >
                    {isSubmitting ? "creating post…" : "create post"}
                </button>
            </form>            
        </main>

    )
};

