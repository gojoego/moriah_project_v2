import {
    Request,
    Response,
    NextFunction,
} from "express";

import { chatResourceRequestSchema } from "../schemas/chat";
import { getChatResources } from "../services/chatService";
import { getZodErrorMessage } from "../utils/zod";

export async function getChatResourcesController(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const parsedBody = chatResourceRequestSchema.safeParse(req.body);
        
        if (!parsedBody.success) {
            return res.status(400).json({
                error: getZodErrorMessage(
                    parsedBody.error
                ),
            });
        }

        const { message } = parsedBody.data;

        const resources = await getChatResources(
            message
        );

        return res.status(200).json(resources);

    } catch (error) {
        next(error);
    }
}