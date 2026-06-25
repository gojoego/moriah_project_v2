"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { signupUser } from "@/lib/api";
import { setToken } from "@/lib/auth";

import { ErrorMessage } from "@/components/ui/ErrorMessage";

export default function SignupForm() { 
	const router = useRouter();

	const [username, setUsername] = useState("");
  	const [email, setEmail] = useState("");
  	const [password, setPassword] = useState("");
  	const [confirmPassword, setConfirmPassword] = useState("");

  	const [error, setError] = useState<string | null>(null);
  	const [isSubmitting, setIsSubmitting] = useState(false);
  
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		setError(null);
		
		const trimmedUsername = username.trim();
		if (trimmedUsername.trim().length < 8) {
			setError("Username must be at least 8 characters.")
			return;
		}
		

		if (password !== confirmPassword){
			setError("Passwords do not match.")
			return;
		}

		setIsSubmitting(true);

		try {
			const data = await signupUser({
				displayName: trimmedUsername,
				email, 
				password,
			});
			
			setToken(data.token);

			router.push("/user_profile");
		} catch(err) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("Signup failed");
			}
		} finally {
			setIsSubmitting(false);
		} 	
	};

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-sm mx-auto mt-12"
      >
        <h1 className="text-2xl font-semibold text-center">
          Create an Account
        </h1>

        <input
          type="text"
          placeholder="Username"
          className="w-full border p-2 rounded"
          value={username}
          onChange={(e) => {
			setUsername(e.target.value);
			setError(null);
		  }}
          required
        />

        <input
			type="email"
			placeholder="Email"
			className="w-full border p-2 rounded"
			value={email}
			onChange={(e) => {
				setEmail(e.target.value);
				setError(null);
			}}
			required
        />

        <input
			type="password"
			placeholder="Password"
			className="w-full border p-2 rounded"
			value={password}
			onChange={(e) => {
				setPassword(e.target.value);
				setError(null);
			}}
			required
        />

        <input
			type="password"
			placeholder="Confirm Password"
			className="w-full border p-2 rounded"
			value={confirmPassword}
			onChange={(e) => {
				setConfirmPassword(e.target.value);
				setError(null);
			}}
			required
        />

		<ErrorMessage message={error} />

        <button
          type="submit"
		  disabled={isSubmitting}
          className="w-full bg-primary text-white py-2 rounded hover:opacity-90 disabled:opacity-50"
        >
          {
            isSubmitting
            ? "Creating account…"
            : "Create Account"
          }
        </button>
      </form>      
    </div>

  );
}