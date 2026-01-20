import Link from "next/link";
import { PostList } from "@/components/posts/PostList";
import { mockPosts } from "@/lib/mockPosts";

export default function HomePage() {
    const topPosts = [...mockPosts]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);

    return (
        <main className="space-y-8">
            <header className="space-y-2">
                <h1 className="text-3xl font-semibold">
                    welcome to the Moriah Project
                </h1>
                <p className="text-muted-foreground text-sm">
                    a space to honor those who have passed 
                </p>
            </header>
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