import { getAllResourcesService } from "../services/resourceService";

import { Request, Response } from "express";

import { paginationSchema } from "../schemas/pagination";

export async function getAllResourcesController(
    req: Request, 
    res: Response
) {
    try {
        const parsed = paginationSchema.safeParse(req.query);
        
        if (!parsed.success) {
            return res.status(400).json({
                error: "Invalid pagination parameters",
            });
        }

        const { limit, offset } = parsed.data;

        const resources = await getAllResourcesService({
            limit, 
            offset
        });
        return res.status(200).json(resources);
    } catch (error) {
        console.error("Resource error: ", {
            message: 
                error instanceof Error 
                    ? error.message 
                    : "Unknown error",
        });

        return res.status(500).json({ error: "Failed to get resources" });
    }
}