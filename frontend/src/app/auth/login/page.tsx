"use client";

import { useState } from "react";
import Link from "next/link";
import type { LoginPayload } from "@/types/auth";

export default function LoginPage(){
  const [form, setForm] = useState<LoginPayload>({
    email: "", 
    password: ""
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("login payload: ", form);
  }

  return (
    <main className="max-w-md mx-auto py-16 space-y-6">
      <h1 className="text-3xl font-semibold">
        welcome back 
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="email"
          placeholder="email"
          className="moriah-input"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} 
        />

        <input 
          type="password"
          placeholder="password"
          className="moriah-input"
          value={form.password} 
          onChange={(e) => setForm({ ...form, password: e.target.value })} 
        />

        <div className="flex justify-end">
          <Link href="/forgot-password" className="moriah-link text-sm">
            forgot password?
          </Link>
        </div>

        <button type="submit" className="moriah-button w-full">
          log in 
        </button>
      </form>
    </main>
  );
}