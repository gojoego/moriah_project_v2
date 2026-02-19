import { LoginForm } from "@/components/auth/LoginForm";
import Link from "next/link";

export default function LoginPage(){
	return (
		<div className="text-center flex flex-col gap-10">
			<h4 className="text-lg font-semibold">The Moriah Project is currently in development mode - logging into an account is disabled.</h4>
			<LoginForm/>
			<Link href="/user_profile" className="text-lg font-medium underline-offset-4 hover:underline">
				If you would like to see a demo version of the user profile, click here.
          	</Link>
		</div>
  	)
}