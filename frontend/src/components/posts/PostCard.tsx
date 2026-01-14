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
    <Card className={cn("moriah-card", "transition hover:shadow-md")}>
      <CardHeader>
        <CardTitle className="text-xl">{post.deceasedName}</CardTitle>

 
        <CardDescription className="text-xs moriah-muted">
          {dateLabel}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm leading-relaxed text-foreground/90 line-clamp-3">
          {post.background}
        </p>

        <Link href={`/posts/${post.id}`} className="moriah-link text-sm">
          Read story →
        </Link>
      </CardContent>
    </Card>
  );
}
