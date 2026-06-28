import type { Post } from "@/types/post";
import { PostCard } from "./PostCard";
import Link from "next/link";
import { PostOwnerActions } from "./PostOwnerActions";
interface PostListProps {
  	posts: Post[];
	showOwnerActions?: boolean;
	onDeletePost?:(postId: string) => void;
}
import { ROUTES } from "@/constants/routes";

export function PostList({ 
	posts, 
	showOwnerActions = false, 
	onDeletePost, 
}: PostListProps) {
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
						href={ROUTES.POSTS}
          				className="px-4 py-2 border rounded-lg hover:bg-slate-100 transition"
					>
						browse stories 
					</Link>

					<Link
						href={ROUTES.NEW_POST}
						className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
					>
						Write a post 
					</Link>
				</div>
			</div>
		);
  	}

  	return (
		<div className="grid gap-6">
			{posts.map((post) => (
				<div key={post.id} className="space-y-3">
					<PostCard key={post.id} post={post} />

					{showOwnerActions && (
						<PostOwnerActions
							postId={post.id}
							onDeletePost={onDeletePost}
						/>
					)}	
				</div>
			))}
		</div>
  );
}
