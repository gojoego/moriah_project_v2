import { getAllResourcesService } from "../services/resourceService";

import { Request, Response, NextFunction } from "express";

import { resourceQuerySchema } from "../schemas/resource";

export async function getAllResourcesController(
    req: Request, 
    res: Response, 
    next: NextFunction
) {
    try {
        const parsed = resourceQuerySchema.safeParse(req.query);
        
        if (!parsed.success) {
            return res.status(400).json({
                error: "Invalid resource query parameters",
            });
        }

        const resources = await getAllResourcesService(parsed.data);

        return res.status(200).json(resources);
    } catch (error) {
        next(error);
    }
}