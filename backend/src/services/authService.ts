import bcrypt from "bcrypt";

import { createUser } from "../db/queries/users";
import { signToken } from "../utils/jwt";
import { SignupInput } from "../schemas/auth";

function isUniqueViolation(error: unknown): boolean {
    return (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "23505"
    );
}

export async function signupService({
    email, 
    password,
    displayName,
}: SignupInput) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await createUser({
            email: email, 
            password: hashedPassword, 
            displayName: displayName,
        });

        const token = signToken({
            id : newUser.id,
            email : newUser.email,
            role: newUser.role,        
        });
        
        return {
            user: {
                id: newUser.id,
                email: newUser.email,
                displayName: newUser.display_name, 
                role: newUser.role,
            },
            token,        
        };        
    } catch(error) {
        if (isUniqueViolation(error)) {
            return null;
        }

        throw error;        
    }

}
