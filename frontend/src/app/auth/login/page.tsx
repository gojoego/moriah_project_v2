"use client"

import { LoginForm } from "@/components/auth/LoginForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage(){
	const router = useRouter();
	
	useEffect (() => {
		const token = localStorage.getItem("token");

		if (token) {
			router.push("/user_profile");
		}
	}, [router]);

	return (
		<main className="min-h-screen flex items-center justify-center px-4">
			<div className="w-full max-w-md space-y-8 text-center">
				<h1 className="text-2xl font-semibold">
					Login to your account
				</h1>
				<LoginForm />
			</div>
		</main>
  	)
}