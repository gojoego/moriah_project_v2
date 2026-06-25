"use client";

import { 
    useEffect, 
    useState 
} from "react";

import { useRouter } from "next/navigation";

import { 
    fetchMyPosts, 
    deletePostById
} from "@/lib/api";

import { Post } from "@/types/post";
import { User } from "@/types/user";
import { PostList } from "@/components/posts/PostList"; 

import { getToken } from "@/lib/auth";
import { LogoutButton } from "@/components/auth/LogoutForm"
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
    const router = useRouter();

    const mounted = typeof window !== "undefined";

    const [user, setUser] = useState<User | null>(null);

    const [posts, setPosts] = useState<Post[]>([]);
    const [postsError, setPostsError] = useState<string | null>(null);

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (!mounted) return;

        const token = getToken();

        if (!token) {
            router.push("/auth/login");
            return;
        }

        const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

        fetch(`${apiBase}/api/users/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error("Unauthorized");
                return res.json();
            })
            .then((data: User) => {
                setUser(data);
            })
            .catch(() => {
                router.push("/auth/login");
            });
    }, [mounted, router]);

    useEffect(() => {
        if (!mounted) return;

        const token = getToken();
        if (!token) return;

        fetchMyPosts(token)
            .then((data) => setPosts(data))
            .catch((err: Error) => setPostsError(err.message));
    }, [mounted]);

    const handleDeletePost = async (postId: string) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this post?"
        );

        if (!confirmed) return;

        try {
            await deletePostById(postId);

            setPosts((currentPosts) => 
                currentPosts.filter((post) => post.id !== postId)    
            );
        } catch (error) {
            if (error instanceof Error) {
                setPostsError(error.message);
            } else {
                setPostsError("Failed to delete post");
            }
        }
    };

    if (!mounted) {
        return null;
    }

    if (!user) {
        return (
            <main className="flex min-h-screen items-center justify-center">
                <p className="text-sm text-muted-foreground">
                    Loading profile...
                </p>
            </main>
        );
    }

    return (
        <main className="mx-auto max-w-2xl px-4 py-16">
            <div className="space-y-10">
                <header className="flex items-center gap-6">
                    <div className="flex h-28 w-28 items-center justify-center rounded-full bg-muted border border-border">
                        <span className="text-muted-foreground text-lg">
                            👤
                        </span>
                    </div>

                    <div>
                        <h1 className="text-3xl font-semibold">
                            {user.displayName}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {user.email}
                        </p>
                    </div>
                </header>

                <section className="space-y-6">
                    <div>
                        <label className="text-xs uppercase text-muted-foreground">
                            Birthday
                        </label>

                        <input
                            type="date"
                            value={user.birthday ?? ""}
                            onChange={(e) =>
                                setUser({
                                    ...user,
                                    birthday: e.target.value,
                                })
                            }
                            className="block mt-1 border p-2 rounded"
                            disabled={!isEditing}
                        />
                    </div>

                    <Button
                        variant="ghost"
                        onClick={() => setIsEditing((prev) => !prev)}
                    >
                        {isEditing ? "Cancel" : "Edit profile"}
                    </Button>
                    
                    <LogoutButton/>
                </section>

                <hr />

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">
                        Remembrances
                    </h2>

                    {postsError && (
                        <p className="text-red-600">
                            Failed to load posts
                        </p>
                    )}
                    
                    <PostList
                        posts={posts}
                        showOwnerActions
                        onDeletePost={handleDeletePost}
                    />
                </section>
            </div>
        </main>
    );
}