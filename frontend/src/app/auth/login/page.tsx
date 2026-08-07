"use client"

import { LoginForm } from "@/components/auth/LoginForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { checkAuth } from "@/lib/auth";
import { ROUTES } from "@/constants/routes";

export default function LoginPage(){
	const router = useRouter();
	
	useEffect (() => {
		async function redirectIfAuthenticated() {
			const authenticated = await checkAuth();

			if (authenticated) {
				router.replace(ROUTES.PROFILE)
			}
		}

		redirectIfAuthenticated();
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