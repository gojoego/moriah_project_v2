import Link from "next/link";
import { PostList } from "@/components/posts/PostList";
import { mockPosts } from "@/lib/mockPosts";

export default function HomePage() {
    const topPosts = [...mockPosts]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);

    return (
        <main className="mx-auto max-w-3xl space-y-8 px-4">
            <header className="space-y-2 text-center">
                <h1 className="text-5xl font-semibold">
                    Welcome to the Moriah Project 
                </h1>
                <p className="text-muted-foreground text-2xl">
                    here you can express what you wish you could say to someone who has passed away from suicide  
                </p>
            </header>
            <section>
                <h2 className="text-2xl font-medium text-center">How This Works...</h2>
                <ol className="mt-3 space-y-2 text-muted-foreground text-xl list-decimal list-inside">
                    <li>
                        provide some details about the individual - give a little context - provide as much info as you want  
                    </li>
                    <li>
                        tell us what you wish you could say to this individual 
                    </li>
                    <Link href="/posts/1" className="mt-3 inline-block text-lg font-medium underline-offset-4 hover:underline">
                        here is the example: the first post
                    </Link>
                </ol>
                <Link href="/community_guidelines" className="mt-3 inline-block text-lg font-medium underline-offset-4 hover:underline">
                        here are some guidelines for posting 
                </Link>
            </section>
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold tracking-tight">
                        recent stories
                    </h2>
                    <Link href="/posts" className="moriah-link text-sm">
                        View all →
                    </Link>
                </div>
                <PostList posts={topPosts}/>
            </section>
        </main>
    );
}