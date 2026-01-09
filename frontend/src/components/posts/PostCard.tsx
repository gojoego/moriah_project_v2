"use client";

import { Post } from "@/types/post";
import { 
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent
 } from "@/components/ui/card";

interface PostCardProps {
    post: Post;
}

export function PostCard({ post }: PostCardProps){
    return (
        <Card className="hover:shadow-md transition">
            <CardHeader>
                <CardTitle>
                    {post.deceasedName}
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                    { new Date(post.createdAt).toLocaleDateString()}
                </CardDescription>
            </CardHeader>

            <CardContent>
                <p className="line-clamp-3 text-sm text-slate-800 dark:text-slate-300">
                    {post.background}
                </p>

                <p>
                    {post.content}
                </p>
            </CardContent>
        </Card>
    )
}