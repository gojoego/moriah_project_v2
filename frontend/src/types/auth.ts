export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignUpPayload extends LoginPayload {
  displayName: string; 
}
