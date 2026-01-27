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
    <main>
      <h1>
        create an account
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

        <input 
          type="display name"
          placeholder="display name"
          value={form.password} 
          onChange={(e) => setForm({ ...form, displayName: e.target.value })} 
        />

        <button type="submit">
          sign up 
        </button>
      </form>
    </main>
  )
}