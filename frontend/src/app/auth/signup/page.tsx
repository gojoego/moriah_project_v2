import { AuthForm } from "@/components/auth/AuthForm";

export default function SignupPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <AuthForm type="signup" />
    </main>
  );
}
