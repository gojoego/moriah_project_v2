"use client";

import { useState } from "react";

export default function SignupForm() {  

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const SIGNUP_DISABLED = true;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (SIGNUP_DISABLED) {
      setError(
        "Signup is currently disabled while The Moriah Project is operating in read-only mode."
      );
      return;
    }
    
    setSuccess(false);

    if (username.trim().length < 3) {
      setError("Username must be at least 3 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    await new Promise((res) => setTimeout(res, 800));
    setIsSubmitting(false);

    setSuccess(true);


  };

  return (
    <div>
      <h4 className="text-lg font-semibold text-center">The Moriah Project is currently in development mode - signing up for an account is disabled.</h4>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-sm mx-auto mt-12"
      >
        <h1 className="text-2xl font-semibold text-center">
          Create an Account
        </h1>

        <input
          disabled={SIGNUP_DISABLED}
          type="text"
          placeholder="Username"
          className="w-full border p-2 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          disabled={SIGNUP_DISABLED}
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          disabled={SIGNUP_DISABLED}
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          disabled={SIGNUP_DISABLED}
          type="password"
          placeholder="Confirm Password"
          className="w-full border p-2 rounded"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {error && (
          <p className="text-sm text-red-600 text-center">
            {error}
          </p>
        )}

        {!SIGNUP_DISABLED && success && (
          <p className="text-sm text-green-600 text-center">
            Account created successfully.
          </p>
        )}

        <button
          type="submit"
          disabled={SIGNUP_DISABLED || isSubmitting}
          className="w-full bg-primary text-white py-2 rounded hover:opacity-90 disabled:opacity-50"
        >
          {
            SIGNUP_DISABLED
            ? "Signup Disabled"
            : isSubmitting
            ? "Creating account…"
            : "Create Account"
          }
        </button>
      </form>      
    </div>

  );
}