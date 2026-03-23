import Link from "next/link";
import { Post } from "@/types/post";

interface Props {
  post: Post;
}

export function PostCard({ post }: Props) {
  return (
    <Link
      href={`/posts/${post.id}`}
      className="group block p-6 border border-slate-200 rounded-2xl bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
    >
      <h2 className="text-xl font-semibold text-slate-900 group-hover:text-slate-700 transition">
        {post.deceased_name}
      </h2>

      <p className="mt-3 text-sm text-slate-600 line-clamp-3">
        {post.content}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs text-slate-400">
          By {post.author_name}
        </p>

        <span className="text-xs text-slate-300 group-hover:text-slate-500 transition">
          Read →
        </span>
      </div>
    </Link>
  );
}