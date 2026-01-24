"use client";

import type { AuthFormProps } from "@/types/auth";
import { useState } from "react";

export function AuthForm({ type, onSubmit }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(email, password);
    console.log(`${type} with`, { email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto mt-12">
      <h1 className="text-2xl font-bold capitalize text-center">
        {type === "login" ? "Log In" : "Sign Up"}
      </h1>

      <input
        type="email"
        placeholder="Email"
        className="w-full border p-2 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full border p-2 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button
        type="submit"
        className="w-full bg-primary text-white py-2 rounded hover:opacity-90"
      >
        {type === "login" ? "Log In" : "Create Account"}
      </button>
    </form>
  );
}
