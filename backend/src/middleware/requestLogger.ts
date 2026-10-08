import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../types/auth";

export function requestLogger(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const start = Date.now();

    res.on("finish", () => {
        const durationMs = Date.now() - start;
        const userId = (req as AuthRequest).user?.id;

        console.log(
            JSON.stringify({
                level: "info",
                message: "HTTP request completed",
                requestId: res.locals.requestId,
                method: req.method,
                path: req.originalUrl,
                statusCode: res.statusCode,
                durationMs,
                ...(userId && { userId }),
            })
        );
    });

    next();
}