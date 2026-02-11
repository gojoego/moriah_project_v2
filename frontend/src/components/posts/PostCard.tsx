"use client";

import type { Post } from "@/types/post";
import Link from "next/link";
import { cn } from "@/lib/utils";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const dateLabel = new Date(post.createdAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Card 
      className={cn(
        "shadow-sm hover:shadow-md transition-all duration-200 hover:border-primary/40"
      )}
    >
      <CardHeader>
        <CardTitle className="text-xl tracking-tight">{post.deceasedName}</CardTitle>

 
        <CardDescription className="text-xs text-muted-foreground">
          {dateLabel}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm leading-relaxed text-foreground/80 line-clamp-3">
          {post.background}
        </p>

        <Link href={`/posts/${post.id}`} className="text-sm text-primary hover:underline">
          Read story →
        </Link>
      </CardContent>
    </Card>
  );
}
