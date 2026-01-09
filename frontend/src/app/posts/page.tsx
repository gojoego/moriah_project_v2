import { PostList } from "@/components/posts/PostList";
import type { Post } from "@/types/post";

const mockData: Post[] = [
    {
        id: "1",
        deceasedName: "Moriah",
        background: "how I knew Moriah", 
        content: "how we lost Moriah to suicide", 
        createdAt: "2026-01-04"
    },
    {
        id: "2", 
        deceasedName: "Thomas",
        background: "how I met Thomas",
        content: "how Thomas was taken from us", 
        createdAt: "2026-01-01"
    },
];

export default function PostsPage() {
    const posts = [...mockData].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return (
        <main className="max-w-4xl mx-auto py-12 px-4">
            <header className="mb-6">
                <h1 className="text-3xl font-bold">
                    stories
                </h1> 
                <p className="mt-2 text-sm text-slate-400">
                    recent posts 
                </p>               
            </header>

            <PostList posts={posts} />
        </main>
    )
}