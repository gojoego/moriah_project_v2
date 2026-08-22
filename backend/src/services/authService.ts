import bcrypt from "bcrypt";

import {
    createUser,
    getUserByEmail
} from "../db/queries/users";

import { signToken } from "../utils/jwt";
import { SignupInput } from "../schemas/auth";

export async function signupService({
    email, 
    password,
    displayName,
}: SignupInput) {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return null;
    }

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
}
