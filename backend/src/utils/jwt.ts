import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

if (!SECRET && process.env.NODE_ENV !== "development" && process.env.NODE_ENV !== "test"){
    throw new Error("JWT_SECRET is required");
}

const JWT_SECRET = SECRET as string;

export function signToken(payload: JwtPayload) {
    return jwt.sign(payload, JWT_SECRET, {expiresIn: "7d"});
}

export function verifyToken(token: string): JwtPayload {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded === "string") {
        throw new Error("Invalid token payload");
    }
    return decoded as JwtPayload;
}