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
	const isOwner =
		Boolean(currentUserId) &&
		currentUserId === post.author_id;

	return (
		<article
			className="
				rounded-xl
				bg-card
				px-6
				py-7
				text-card-foreground
				md:px-8
				md:py-8
			"	
		>
			<div className="flex items-start justify-between gap-6">
				<h2
					className="
						font-display
						text-2xl
						leading-tight
						md:text-3xl
					"		
				>
					{post.deceased_name}
				</h2>
				<Link
					href={`/posts/${post.id}`}
					aria-label={`Read story about ${post.deceased_name}`}
					className="
						flex
						h-10
						w-10
						shrink-0
						items-center
						justify-center
						rounded-full
						bg-background
						text-foreground
						transition-opacity
						hover:opacity-80
					"
				>
					→
				</Link>					
			</div>

			<p 
				className="
					mt-5
					line-clamp-3
					font-sans
					leading-relaxed
					text-muted-foreground
				"
			>
				{post.content}
			</p>

			<p
				className="
					mt-6
					font-sans
					text-sm
					text-muted-foreground
				"
			>
				By {post.author_name}
			</p>

			{isOwner && (
				<div className="mt-5 border-t border-border pt-4">
					<Link
						href={`/posts/${post.id}/edit`}
						className="
							font-sans
							text-sm
							underline-offset-4
							hover:underline
						"
					>
						Edit post
					</Link>
				</div>
			)}
		</article>
	)
}