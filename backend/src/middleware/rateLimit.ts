import rateLimit from "express-rate-limit";

export const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100, 
    standardHeaders: true,
    legacyHeaders: false,
});

export const loginAccountRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10, 
    keyGenerator: (req) => {
        const email = 
            typeof req.body?.email === "string"
            ? req.body.email.trim().toLowerCase()
            : "unknown";
        
        return email;
    }, 
    standardHeaders: true, 
    legacyHeaders: false,
});

export const forgotPasswordAccountRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    keyGenerator: (req) => {
        const email =
            typeof req.body?.email === "string"
                ? req.body.email.trim().toLowerCase()
                : "unknown";

        return email;
    },
    standardHeaders: true,
    legacyHeaders: false,   
})