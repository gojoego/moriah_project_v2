"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
interface User {
  displayName: string;
  email: string;
  birthday?: string;
}

export default function ProfilePage() {
	const router = useRouter();

  	const [user, setUser] = useState<User | null>(null);
	const [isEditing, setIsEditing] = useState(false);

  	useEffect(() => {
    	const token = localStorage.getItem("token");

		if (!token) {
			router.push("/login");
			return;
		}

		fetch("http://localhost:4000/api/users/me", {
			headers: {
				Authorization: `Bearer ${token}`, 
			},
		})
			.then((res) => res.json())
			.then(setUser)
			.catch(() => {
				router.push("/login")
			});
  	}, [router]);

	if (!user) return <p>loading...</p>;

  return (
    <main className="mx-auto max-w-xl px-4 py-20">
      <div className="space-y-10">
        <header className="flex items-center gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted text-xl font-medium">
            {user.displayName.charAt(0)}
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-semibold">
              {user.displayName}
            </h1>
            <p className="text-sm text-muted-foreground">
              {user.email}
            </p>
          </div>
        </header>

        <section className="space-y-6">
          <div className="space-y-1">
            <label className="block text-xs uppercase tracking-wide text-muted-foreground">
              Birthday
            </label>
            <input
              type="date"
              value={user.birthday}
              onChange={(e) =>
                setUser({ ...user, birthday: e.target.value })
              }
              className="w-full max-w-xs rounded border border-border bg-background px-3 py-2 text-sm disabled:opacity-70"
              disabled={!isEditing}
            />
          </div>

          <div className="flex gap-6 text-sm">
            <button
              onClick={() => setIsEditing((prev) => !prev)}
              className="underline-offset-4 hover:underline"
            >
              {isEditing ? "Cancel" : "Edit profile"}
            </button>

            <button className="underline-offset-4 hover:underline">
              Reset password
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}