"use client"

import { LoginForm } from "@/components/auth/LoginForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getToken } from "@/lib/auth"

export default function LoginPage(){
	const router = useRouter();
	
	useEffect (() => {
		const token = getToken();

		if (token) {
			router.replace(ROUTES.PROFILE);
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