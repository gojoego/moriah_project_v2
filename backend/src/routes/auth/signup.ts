import { Router } from "express";
import bcrypt from "bcrypt";
import { signToken } from "../../utils/jwt";
import {
    createUser,
    getUserByEmail
} from "../../db/queries/users"

const router = Router();

router.post("/signup", async (req, res) => {
    try {

        if (!req.body){
            return res.status(400).json({ error: "Missing request body"})
        }

        const {
            email, 
            password, 
            displayName
        } = req.body;

        if (
            typeof email !== "string" ||
            typeof password !== "string" ||
            typeof displayName !== "string" 
        ) {
            return res.status(400).json({ error: "Missing or invalid fields" });
        }

        const normalizedEmail = email.toLowerCase().trim();
        const trimmedDisplayName = displayName.trim();

        if (!normalizedEmail || !trimmedDisplayName) {
            return res.status(400).json({ error: "Missing or invalid fields"});
        }

        if (password.length < 8){
            return res.status(400).json({error: "Password must be 8 characters or more"})
        }

        const existingUser = await getUserByEmail(normalizedEmail);

        if (existingUser) {
            return res.status(400).json({ error: "Invalid signup credentials" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await createUser({
            email: normalizedEmail, 
            password: hashedPassword, 
            displayName: trimmedDisplayName,
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