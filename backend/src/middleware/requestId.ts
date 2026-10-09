import { randomUUID } from "node:crypto";
import {
    NextFunction,
    Request,
    Response
} from "express";
import * as Sentry from "@sentry/node";

export function requestIdMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const incomingRequestId = req.header("x-request-id");
    const requestId = incomingRequestId || randomUUID();

    res.setHeader("x-request-id", requestId);
    res.locals.requestId = requestId;

    Sentry.withIsolationScope((scope) => {
        scope.setTag("requestId", requestId);
        next();
    });
}