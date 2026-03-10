import Link from "next/link";
import { notFound } from "next/navigation";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { fetchPostById } from "@/lib/api";

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts/${id}`, {cache: "no-store"})

  let post;

  try {
    post = await fetchPostById(id)
  } catch {
    notFound();
  }
  if (!response.ok) notFound();

  const dateLabel = new Date(post.createdAt).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <main className="space-y-6">
      <Link href="/posts" className="moriah-link text-sm">
        ← Back to stories
      </Link>

      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          {post.deceasedName}
        </h1>
        <p className="moriah-muted text-sm">{dateLabel}</p>
      </header>

      <Card className="moriah-card">
        <CardHeader>
          <CardTitle className="text-lg">Background</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="leading-relaxed text-foreground/90">
            {post.background}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            What I wish I could say to {post.deceasedName}
          </CardTitle>
        </CardHeader>
        <CardContent className="leading-relaxed text-foreground/90 whitespace-pre-line">
          {post.content}
        </CardContent>
      </Card>
    </main>
  );
}
