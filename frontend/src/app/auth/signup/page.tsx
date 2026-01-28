"use client";

import { useState } from "react";
import type { SignUpPayload } from "@/types/auth";

export default function SignupPage(){
  const [form, setForm] = useState<SignUpPayload>({
    displayName: "",
    email: "",
    password: "", 
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("signup payload: ", form);
  }

  return (
    <main className="max-w-md mx-auto py-16 space-y-6">

      <h1 className="text-3xl font-semibold">
          create an account
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

        <input 
          type="display name"
          placeholder="display name"
          className="moriah-input"
          value={form.password} 
          onChange={(e) => setForm({ ...form, displayName: e.target.value })} 
        />

        <button type="submit" className="moriah-button w-full">
          sign up 
        </button>
      </form>
    </main>
  )
}