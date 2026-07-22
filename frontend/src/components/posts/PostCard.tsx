import Link from "next/link";
import { Post } from "@/types/post";

interface Props {
	post: Post;
	currentUserId?: string;
}

export function PostCard({ 
	post,
	currentUserId, 
}: Props) {
	const isOwner = Boolean(currentUserId) && currentUserId === post.author_id;
	return (
		<article>
			<Link
				href={`/posts/${post.id}`}
				className="block p-6 rounded-2xl border bg-muted/30 hover:bg-muted/50 transition"
			>
				<h2 className="text-lg font-semibold">
					{post.deceased_name}
				</h2>

				<p className="mt-3 text-sm text-foreground/80 leading-relaxed line-clamp-3">
					{post.content}
				</p>

				<p className="mt-4 text-xs text-muted-foreground">
					By {post.author_name}
				</p>
			</Link>
			{isOwner && (
				<div className="border-t px-6 py-3">
					<Link
						href={`/posts/${post.id}/edit`}
						className="text-sm font-medium underline"
					>
					Edit post
					</Link>
				</div>
			)}			
		</article>
	)
}