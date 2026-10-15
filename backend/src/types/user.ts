import { UserRole } from "./roles";

export interface CreateUserInput {
    email: string;
    password: string;
    displayName: string;
    termsAcceptedAt: Date;
    termsVersion: string;
    ageAttestedAt: Date;
}

export interface User {
    id: string;
    display_name: string;
    email: string;
    password: string;
    role: UserRole;

    reset_token_hash: string | null;
    reset_token_expiry: string | null;

    terms_accepted_at: string | null;
    terms_version: string | null;
    age_attested_at: string | null;

    created_at: string;
    updated_at: string;
}