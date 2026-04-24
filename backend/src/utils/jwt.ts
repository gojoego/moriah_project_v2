import jwt from "jsonwebtoken";

export interface JwtPayload {
    id: string;
    email: string;
}

class AuthError extends Error {
    cause?: unknown;

    constructor(message: string, cause?: unknown) {
        super(message);
        this.name = "AuthError";
        this.cause = cause;
    }
}

const SECRET = process.env.JWT_SECRET;

const isDev = process.env.NODE_ENV === "development";
const isTest = process.env.NODE_ENV === "test";

if (!SECRET && !isDev && !isTest) {
    throw new Error("JWT_SECRET is required in production");
}

const JWT_SECRET = SECRET ?? "dev-only-secret";

export function signToken(payload: JwtPayload): string {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: "7d",
    });
}

export function verifyToken(token: string): JwtPayload {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if (typeof decoded === "string") {
            throw new Error("Invalid token payload");
        }

        return decoded as JwtPayload;
    } catch (error) {
        console.error("JWT verification failed:", {
            message: error instanceof Error ? error.message : "Unknown error",
        });

        throw new AuthError("Invalid or expired token", error);
    }
}