"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";

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

        // hitting create post endpoint 
        setIsSubmitting(true);
        
        try {
            const response = await fetch("http://localhost:4000/api/posts", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    deceased_name: deceasedName.trim(),
                    background: background ? background.trim() || undefined : undefined,
                    content: content.trim()
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Failed to create post")
            }

            const newPost = await response.json();
            
            
            router.push(`/posts/${newPost.id}`);
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

                <section className="space-y-4">
                    <div className="space-y-1">
                        <label className="block text-sm text-muted-foreground">
                            name of the loved one you are writing to
                        </label>
                        <input
                            type="text"
                            className="w-full rounded border border-border bg-background px-3 py-2"
                            value={deceasedName}
                            onChange={(e) => setDeceasedName(e.target.value)}
                            required
                            disabled={isSubmitting}
                        />                        
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm text-muted-foreground">
                            Background or context (optional)
                        </label>
                        <textarea 
                            value={background}
                            onChange={(e) => setBackground(e.target.value)}
                            rows={5}
                            className="w-full rounded border border-border bg-background px-3 py-2 resize-y"
                            disabled={isSubmitting} 
                        />
                    </div>
                              
                    <div className="space-y-1">
                        <label className="block text-sm text-muted-foreground">
                        What I wish I could say
                        </label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={10}
                            className="w-full rounded border border-border bg-background px-3 py-2 resize-y"
                            required
                            disabled={isSubmitting}
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
                    className="w-full rounded bg-primary py-3 text-white hover:opacity-90 disabled:opacity-50"
                >
                    {isSubmitting ? "creating post…" : "create post"}
                </button>
            </form>            
        </main>

    )
};

