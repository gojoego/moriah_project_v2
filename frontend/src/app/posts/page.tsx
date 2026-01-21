import { PostList } from "@/components/posts/PostList";
import { mockPosts } from "@/lib/mockPosts";

export default function PostsPage() {
    const posts = [...mockPosts].sort(
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