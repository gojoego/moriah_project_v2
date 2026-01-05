import { Post } from "@/src/types/post";
import { PostCard } from "./PostCard";

interface PostListProps {
    posts: Post[];
}

export function PostList({ posts }: PostListProps) {
    if (posts.length === 0){
        return (
            <p className="text-center text-muted-foreground">
                no posts yet 
            </p>
        );
    }

    return (
        <div>
            {posts.map((post) =>(
                <PostCard key={post.id} post={post}/>
            ))}
        </div>
    );
}