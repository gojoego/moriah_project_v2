import { PostList } from "@/src/components/posts/PostList";
import { Post } from "@/src/types/post";

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
        createdAt: "2026-01-04"
    },
];

export default function PostsPage() {
    return (
        <main className="max-w-4xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-6">
                stories
            </h1>
            <PostList posts={mockData}/>
        </main>
    )
}