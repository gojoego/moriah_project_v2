"use client"

import { useState } from "react";

export default function NewPost(){
    const [deceasedName, setDeceasedName] = useState("");
    const [background, setBackground] = useState("");
    const [content, setContent] = useState("");

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError(null);
        setSuccess(false);

        if (!deceasedName.trim() || !content.trim()) {
            setError("please fill in all required fields");
            return; 
        }

        setIsSubmitting(true);
        await new Promise((res) => setTimeout(res, 800));
        setIsSubmitting(false);

        setSuccess(true);
    }

    return (
        <main>
            <form
                onSubmit={handleSubmit}
                className="space-y-8"
            >
                <header className="space-y-2 text-center">
                    <h1 className="text-3xl font-semibold">
                        create a post 
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
                        />                        
                    </div>

                    <div className="space-y-1">
                        <label>
                            background or context (optional but recommended)
                        </label>
                        <textarea 
                            value={background}
                            onChange={(e) => setBackground(e.target.value)}
                            rows={5}
                            className="w-full rounded border border-border bg-background px-3 py-2 resize-y"
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
                        />
                    </div>
                </section>

                { error && (
                    <p className="text-sm text-red-600 text-center">
                        {error}
                    </p>
                )}

                {success && (
                <p className="text-sm text-green-600 text-center">
                    Your post has been created.
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

