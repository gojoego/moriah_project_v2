// ✅ src/types/auth.ts

export interface AuthFormProps {
  type: "login" | "signup";
  onSubmit?: (email: string, password: string) => void;
}

export interface AuthResponse {
  token: string;
  userId: string;
}

export interface AuthError {
  message: string;
}
