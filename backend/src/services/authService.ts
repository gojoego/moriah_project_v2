import bcrypt from "bcrypt";
import crypto from "crypto";
import { 
    createUser, 
    getUserByEmail,
    getUserByPasswordResetToken, 
    setPasswordResetToken, 
    resetUserPassword    
} from "../db/queries/users";
import { signToken } from "../utils/jwt";
import { SignupInput } from "../schemas/auth";
import { sendPasswordResetEmail } from "../services/email";

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

export async function loginService(email: string, password: string){
    const user = await getUserByEmail(email);

    if (!user) {
        return {
            status: "invalid_credentials" as const,
        };
    }    

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        return {
            status: "invalid_credentials" as const,
        };
    }

    const token = signToken({
        id: user.id, 
        email: user.email,
        role: user.role,
    });

    return {
        token: token, 
        status: "success" as const 
    }
}

const GENERIC_RESET_MESSAGE = "If an account exists, a password reset email has been sent.";

export async function forgotPasswordService(email: string){
    const user = await getUserByEmail(email);    

    if (!user) {
        await new Promise((resolve) => setTimeout(resolve, 300));

        return {
            message: GENERIC_RESET_MESSAGE
        };
    }   

    const token = crypto.randomBytes(32).toString("hex"); 

    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    await setPasswordResetToken(user.id, token, expiresAt);

    const frontendUrl = process.env.FRONTEND_URL;

    if (!frontendUrl) {
        throw new Error("FRONTEND_URL is not configured");
    }

    const resetUrl = `${frontendUrl}/auth/reset-password?token=${token}`;

    await sendPasswordResetEmail(user.email, resetUrl);

    return {
        message: GENERIC_RESET_MESSAGE,
    };    
}

export async function resetPasswordService(token: string, password: string){
    const user = await getUserByPasswordResetToken(token);

    if (!user){
        return {
            message: "Invalid or expired reset token",
        }        
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await resetUserPassword(user.id, hashedPassword);

    if (!updatedUser){
        return {
            status: "invalid_token" as const,
            message: "Invalid or expired reset token",
        };
    }
    
    return {
        status: "success" as const,
        message: "Password reset successful",
    }
}