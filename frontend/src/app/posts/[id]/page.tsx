import Link from "next/link";
import { notFound } from "next/navigation";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await fetch(
    `http://localhost:4000/api/posts/${id}`,
    { cache: "no-store" }
  );

  if (!response.ok) notFound();

  const post = await response.json();

  const dateLabel = new Date(post.created_at).toLocaleDateString(
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
          {post.deceased_name}
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
            What I wish I could say to {post.deceased_name}
          </CardTitle>
        </CardHeader>
        <CardContent className="leading-relaxed text-foreground/90 whitespace-pre-line">
          {post.content}
        </CardContent>
      </Card>
    </main>
  );
}
