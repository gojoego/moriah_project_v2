import Link from "next/link";
import { Post } from "@/types/post";

interface Props {
  post: Post;
}

export function PostCard({ post }: Props) {
  return (
    <Link
      href={`/posts/${post.id}`}
      className="block p-6 border rounded-lg hover:bg-slate-50 transition"
    >
      <h2 className="text-xl font-semibold">
        {post.deceasedName}
      </h2>

      <p className="mt-2 text-sm text-slate-600">
        {post.content.slice(0, 120)}...
      </p>

      <p className="mt-2 text-xs text-slate-400">
        By {post.author_name}
      </p>
    </Link>
  );
}
