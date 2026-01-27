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
    <main>
      <h1>
        welcome back 
      </h1>

      <form onSubmit={handleSubmit}>
        <input 
          type="email"
          placeholder="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} 
        />

        <input 
          type="password"
          placeholder="password"
          value={form.password} 
          onChange={(e) => setForm({ ...form, password: e.target.value })} 
        />

        <div>
          <Link href="/forgot-password">
          </Link>
        </div>

        <button type="submit">
          log in 
        </button>
      </form>
    </main>
  );
}