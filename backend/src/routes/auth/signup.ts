import { Router } from "express";

import bcrypt from "bcrypt";
import { signToken } from "../../utils/jwt";

import {
    createUser,
    getUserByEmail
} from "../../db/queries/users"

import { signupSchema } from "../../schemas/auth";
import { getZodErrorMessage } from "../../utils/zod";

const router = Router();

router.post("/signup", async (req, res) => {
    try {

        if (!req.body){
            return res.status(400).json({ error: "Missing request body"})
        }

        const parsed = signupSchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({
                error: getZodErrorMessage(parsed.error),
            });
        }

        const {
            email, 
            password, 
            displayName
        } = parsed.data;


        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({ error: "Invalid signup credentials" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await createUser({
            email: email, 
            password: hashedPassword, 
            displayName: displayName,
        });

        const token = signToken({
            id : newUser.id,
            email : newUser.email        
        });

        return res.status(201).json({
            user: {
                id: newUser.id,
                email: newUser.email,
                displayName: newUser.display_name, 
                role: newUser.role,
            },
            token,
        });
    } catch (error) {
        console.error("Signup error: ", {
            message: error instanceof Error ? error.message : "Unknown error",
        });

        return res.status(500).json({ error: "Signup failed"});
    }
});

export default router;