import { Suspense } from "react";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export default function ResetPasswordPage(){
    return (
        <Suspense 
            fallback={
                <main className="mx-auto max-w-md px-4 py-16 text-center">
                    Loading...
                </main>
            }
        >
            <ResetPasswordForm/>
        </Suspense>
    )
}