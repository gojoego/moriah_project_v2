import type { Post } from "@/types/post";
import { PostCard } from "./PostCard";
import Link from "next/link";
interface PostListProps {
  	posts: Post[];
}

export function PostList({ posts }: PostListProps) {
	if (posts.length === 0) {
    	return (
			<div className="text-center py-12 space-y-4">
				<p className="text-muted-foreground text-lg">
					no stories yet 
				</p>
				<p className="text-sm text-muted-foreground">
					start by reading an example or check back soon 
				</p>
				<div className="flex justify-center gap-4">
					<Link
						href="/posts"
          				className="px-4 py-2 border rounded-lg hover:bg-slate-100 transition"
					>
						browse stories 
					</Link>

					<Link
						href={`/posts/${posts[0]?.id}`}
          				className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
					>
						read an example
					</Link>
				</div>
			</div>
		)
  	}

  	return (
		<div className="grid grid-cols-1 gap-6">
			{posts.map((post) => (
				<PostCard key={post.id} post={post} />
			))}
		</div>
  );
}
