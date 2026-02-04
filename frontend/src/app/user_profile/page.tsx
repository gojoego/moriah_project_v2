"use client";

import { useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: "Joe",
    email: "joe@moriahproject.com",
    birthday: "1996-08-22",
    photoUrl: null as string | null,
  });

  const [isEditing, setIsEditing] = useState(false);

  return (
    <main className="mx-auto max-w-xl px-4 py-20">
      <div className="space-y-10">
        <header className="flex items-center gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted text-xl font-medium">
            {user.name.charAt(0)}
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-semibold">
              {user.name}
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